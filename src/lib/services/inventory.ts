import { WebSocketService } from './websocket';
import { inventoryStore } from '$lib/stores';
import type { InventoryItem } from '$lib/stores';

/**
 * Inventory WebSocket Service
 * Connects to the shared WebSocket and requests product inventory data
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
    public requestInventory(productType: string = 'PLATO', limit: number = 20): void {
        const message = {
            action: 'Productos.Listar',
            data: {
                productType: productType,
                limit: limit
            }
        };

        if (!this.wsService['socket'] || this.wsService['socket'].readyState !== WebSocket.OPEN) {
            console.log('WebSocket not ready, retrying inventory request in 1s...');
            setTimeout(() => this.requestInventory(productType, limit), 1000);
            return;
        }

        console.log('Requesting inventory:', message);
        this.wsService.send(message);
    }

    /**
     * Handle inventory-related messages from WebSocket
     */
    private handleInventoryMessage(data: any): void {
        console.log('Inventory message received:', data);

        // Check if this is an inventory update
        // Handle both wrapped (Detail.data) and unwrapped (data) formats
        const payloadData = data.data || (data.Detail && data.Detail.data);

        if (payloadData && payloadData.products) {
            const products = payloadData.products;

            // Convert array to keyed object for easy lookup
            const inventoryMap: Record<string, InventoryItem> = {};

            // Debug: Log the first item to understand the structure
            if (products.length > 0) {
                console.log('First product structure:', JSON.stringify(products[0], null, 2));
            }

            products.forEach((item: any) => {
                // Try to determine PK and SK safely
                // Backend seems to use snake_case: tenant_id, producto_id
                const pk = item.pk?.S || item.pk || item.tenant_id?.S || item.tenant_id || item.tenantId || item.PK?.S || item.PK || 'unknown_pk';
                const sk = item.sk?.S || item.sk || item.producto_id?.S || item.producto_id || item.sku || item.SK?.S || item.SK || 'unknown_sk';

                const key = `${pk}_${sk}`;
                inventoryMap[key] = item;
            });

            // Update the inventory store by merging new items with existing ones
            inventoryStore.update(currentInventory => {
                return {
                    ...currentInventory,
                    ...inventoryMap
                };
            });

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
