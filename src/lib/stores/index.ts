import { writable } from 'svelte/store';

export interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    precioAnterior?: number;
    descuento?: number;
    imagenUrl: string;
}

export const productsStore = writable<Product[]>([]);
export const ordersStore = writable<any[]>([]);
export const userProfileStore = writable<any>(null);

// Toast store for notifications
export const toastStore = writable<{ message: string; type: 'info' | 'success' | 'warning' | 'error' } | null>(null);
