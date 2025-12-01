<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import '../app.css';
	import { onMount } from 'svelte';
	import { WebSocketService } from '$lib/services/websocket';
	import { InventoryService } from '$lib/services/inventory';
	import { handleNotification } from '$lib/stores/socket';
	import { PUBLIC_WEBSOCKET_URL } from '$env/static/public';

	onMount(() => {
		const wsService = WebSocketService.getInstance();
		wsService.setMessageHandler(handleNotification);

		wsService.connect(PUBLIC_WEBSOCKET_URL);

		// Initialize inventory service and request initial data
		const inventoryService = InventoryService.getInstance();
		inventoryService.initialize();

		// Request inventory for different product types
		setTimeout(() => {
			inventoryService.requestInventory('PLATO_FONDO', 50);
		}, 1000); // Wait for WebSocket connection to establish

		return () => {
			wsService.close();
		};
	});
</script>

<Navbar />

<Toast />

<main>
	<slot />
</main>

<Footer />
