import { writable } from 'svelte/store';

export interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    precioAnterior?: number;
    descuento?: number;
    imagenUrl: string;
    // Inventory fields from backend
    stock?: number;
    productType?: string;
    sku?: string;
    tenantId?: string;
}

export interface InventoryItem {
    pk: { S: string };
    sk: { S: string };
    stock: { N: string };
    productType?: { S: string };
    name?: { S: string };
    description?: { S: string };
    price?: { N: string };
    img?: { S: string };
}

export const productsStore = writable<Product[]>([]);
export const ordersStore = writable<any[]>([]);
export const inventoryStore = writable<Record<string, InventoryItem>>({});
export const userProfileStore = writable<any>(null);

// Toast store for notifications
export const toastStore = writable<{ message: string; type: 'info' | 'success' | 'warning' | 'error' } | null>(null);

// Global loading state for async requests
export const isRequestLoading = writable<boolean>(false);

// Cart drawer state
export const isCartOpen = writable<boolean>(false);

export interface CartItem extends Product {
    quantity: number;
}

export const cartStore = writable<CartItem[]>([]);
