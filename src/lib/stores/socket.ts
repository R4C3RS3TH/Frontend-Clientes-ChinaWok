import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { productsStore, ordersStore, userProfileStore, toastStore, inventoryStore, isRequestLoading } from './index';
import { jwtDecode } from 'jwt-decode';

export const socketStore = writable<{ connected: boolean; error: any }>({
    connected: false,
    error: null
});

// Map target strings to actual Svelte stores
const storeMap: Record<string, any> = {
    'products_store': productsStore,
    'orders_store': ordersStore,
    'user_profile': userProfileStore,
    'session_store': userProfileStore, // Map backend target to local store
    'inventory_store': inventoryStore
};

export const handleNotification = (payload: any) => {
    console.log('Received notification:', payload);

    // Stop loading spinner when any notification arrives
    isRequestLoading.set(false);

    // Validate payload structure
    // Handle both wrapped (Detail.ui) and unwrapped (ui) formats
    const ui = payload.ui || (payload.Detail && payload.Detail.ui);
    const data = payload.data || (payload.Detail && payload.Detail.data);

    if (!ui) {
        console.warn('Invalid notification payload (missing ui):', payload);
        return;
    }

    const { action, variant, message, target } = ui;

    switch (action) {
        case 'SHOW_TOAST':
            toastStore.set({
                message: message || 'Notification received',
                type: variant ? variant.toLowerCase() : 'info'
            });
            // Auto-dismiss toast after 3 seconds (optional, can be handled in UI component)
            setTimeout(() => toastStore.set(null), 3000);
            break;

        case 'REDIRECT':
            if (data && data.redirectUrl) {
                goto(data.redirectUrl);
            } else {
                console.warn('REDIRECT action received but no redirectUrl found in data.');
            }
            break;

        case 'HYDRATE':
            if (target && storeMap[target]) {
                let dataToStore = data.items || data;

                // Special handling for session_store: Decode JWT if present
                if ((target === 'session_store' || target === 'user_profile') && dataToStore.idToken) {
                    try {
                        const decoded: any = jwtDecode(dataToStore.idToken);
                        console.log('Decoded JWT:', decoded);
                        // Merge decoded claims (name, email, etc.) with the original data
                        dataToStore = { ...dataToStore, ...decoded };
                    } catch (error) {
                        console.error('Failed to decode JWT:', error);
                    }
                }

                storeMap[target].set(dataToStore);
                console.log(`Hydrated store: ${target}`);

                // Special handling for login success (session_store hydration)
                if (target === 'session_store' || target === 'user_profile') {
                    toastStore.set({
                        message: '¡Inicio de sesión exitoso!',
                        type: 'success'
                    });
                    setTimeout(() => toastStore.set(null), 3000);
                    goto('/');
                }
            } else {
                console.warn(`HYDRATE action received for unknown target: ${target}`);
            }
            break;

        case 'REFRESH_DATA':
            // Implement data invalidation or re-fetching logic here
            // For now, we can just log it or maybe trigger a custom event
            console.log('REFRESH_DATA requested. Invalidate relevant data.');
            break;

        case 'SILENT':
            console.log('Heartbeat/Silent message received:', message);
            break;

        default:
            console.warn(`Unknown action: ${action}`);
    }
};
