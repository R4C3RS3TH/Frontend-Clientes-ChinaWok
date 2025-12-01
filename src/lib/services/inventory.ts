import { WebSocketService } from './websocket';
import { inventoryStore } from '$lib/stores';
import type { InventoryItem } from '$lib/stores';

/**
 * Inventory WebSocket Service
 * Connects to the MS_INVENTORY_URL and requests product inventory data
 */
export class InventoryService {
    private static instance: InventoryService;
    private wsService: WebSocketService;
    private isInitialized: boolean = false;

    private constructor() {
        this.wsService = WebSocketService.getInstance();
    }

    public static getInstance(): InventoryService {
        if (!InventoryService.instance) {
            InventoryService.instance = new InventoryService();
        }
        return InventoryService.instance;
    }

    /**
     * Initialize inventory service by setting up message handler
     */
    public initialize(): void {
        if (this.isInitialized) {
            console.log('Inventory service already initialized');
            return;
        }

        // Set up message handler for inventory updates
        this.wsService.setMessageHandler((data: any) => {
            this.handleInventoryMessage(data);
        });

        this.isInitialized = true;
        console.log('Inventory service initialized');
    }

    /**
     * Request inventory list from backend
     * Sends a "Productos.Listar" event to the WebSocket
     */
    public requestInventory(productType: string = 'PLATO_FONDO', limit: number = 20): void {
        const message = {
            action: 'Productos.Listar',
            data: {
                productType: productType,
                limit: limit
            }
        };

        console.log('Requesting inventory:', message);
        this.wsService.send(message);
    }

    /**
     * Handle inventory-related messages from WebSocket
     */
    private handleInventoryMessage(data: any): void {
        console.log('Inventory message received:', data);

        // Check if this is an inventory update
        if (data.Detail && data.Detail.data && data.Detail.data.products) {
            const products = data.Detail.data.products;

            // Convert array to keyed object for easy lookup
            const inventoryMap: Record<string, InventoryItem> = {};

            products.forEach((item: InventoryItem) => {
                const key = `${item.pk.S}_${item.sk.S}`;
                inventoryMap[key] = item;
            });

            // Update the inventory store
            inventoryStore.set(inventoryMap);

            console.log(`Inventory updated with ${products.length} items`);
        }
    }

    /**
     * Get stock info for a specific product
     */
    public getStock(tenantId: string, productSku: string): number | null {
        const key = `${tenantId}_${productSku}`;
        let stock: number | null = null;

        inventoryStore.subscribe(inventory => {
            if (inventory[key] && inventory[key].stock) {
                stock = parseInt(inventory[key].stock.N);
            }
        })();

        return stock;
    }
}
