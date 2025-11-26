import { writable } from 'svelte/store';

// Define the types for your data if possible, for now using any
export const productsStore = writable<any[]>([]);
export const ordersStore = writable<any[]>([]);
export const userProfileStore = writable<any>(null);

// Toast store for notifications
export const toastStore = writable<{ message: string; type: 'info' | 'success' | 'warning' | 'error' } | null>(null);
