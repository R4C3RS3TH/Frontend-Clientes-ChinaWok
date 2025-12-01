import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { productsStore, ordersStore, userProfileStore, toastStore, inventoryStore } from './index';

export const socketStore = writable<{ connected: boolean; error: any }>({
    connected: false,
    error: null
});

// Map target strings to actual Svelte stores
const storeMap: Record<string, any> = {
    'products_store': productsStore,
    'orders_store': ordersStore,
    'user_profile': userProfileStore,
    'inventory_store': inventoryStore
};

export const handleNotification = (payload: any) => {
    console.log('Received notification:', payload);

    // Validate payload structure based on the contract
    if (!payload.Detail || !payload.Detail.ui) {
        console.warn('Invalid notification payload:', payload);
        return;
    }

    const { ui, data } = payload.Detail;
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
                storeMap[target].set(data.items || data);
                console.log(`Hydrated store: ${target}`);
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
