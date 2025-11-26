<script lang="ts">
	import { handleNotification } from '$lib/stores/socket';
	import { productsStore, ordersStore } from '$lib/stores/index';

	function simulateToast() {
		handleNotification({
			Detail: {
				ui: {
					action: 'SHOW_TOAST',
					variant: 'SUCCESS',
					message: 'This is a test toast from the socket handler!'
				},
				data: {}
			}
		});
	}

	function simulateHydrateProducts() {
		handleNotification({
			Detail: {
				ui: {
					action: 'HYDRATE',
					target: 'products_store'
				},
				data: {
					items: [
						{ id: 1, name: 'Test Product A', price: 100 },
						{ id: 2, name: 'Test Product B', price: 200 }
					]
				}
			}
		});
	}

	function simulateHydrateOrders() {
		handleNotification({
			Detail: {
				ui: {
					action: 'HYDRATE',
					target: 'orders_store'
				},
				data: [
					{ id: 101, status: 'pending', total: 50 },
					{ id: 102, status: 'shipped', total: 150 }
				]
			}
		});
	}
</script>

<div class="container mx-auto space-y-8 p-8">
	<h1 class="text-3xl font-bold">WebSocket Logic Test</h1>

	<div class="space-x-4">
		<button class="btn variant-filled-primary" on:click={simulateToast}> Test Toast </button>
		<button class="btn variant-filled-secondary" on:click={simulateHydrateProducts}>
			Hydrate Products
		</button>
		<button class="btn variant-filled-tertiary" on:click={simulateHydrateOrders}>
			Hydrate Orders
		</button>
	</div>

	<div class="grid grid-cols-2 gap-8">
		<div class="card p-4">
			<h2 class="mb-4 text-xl font-bold">Products Store</h2>
			<pre class="h-64 overflow-auto rounded bg-gray-800 p-4 text-white">
                {JSON.stringify($productsStore, null, 2)}
            </pre>
		</div>

		<div class="card p-4">
			<h2 class="mb-4 text-xl font-bold">Orders Store</h2>
			<pre class="h-64 overflow-auto rounded bg-gray-800 p-4 text-white">
                {JSON.stringify($ordersStore, null, 2)}
            </pre>
		</div>
	</div>
</div>
