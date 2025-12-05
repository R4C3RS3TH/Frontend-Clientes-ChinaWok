<script lang="ts">
	import { page } from '$app/stores';
	import { inventoryStore, cartStore, isCartOpen, type CartItem } from '$lib/stores';
	import { InventoryService } from '$lib/services/inventory';
	import { onMount } from 'svelte';

	let product: any = null;
	let loading = true;
	let quantity = 1;

	$: id = $page.params.id;

	// Helper to safely get value
	function getValue(field: any): any {
		if (field === undefined || field === null) return undefined;
		if (typeof field === 'object' && 'S' in field) return field.S;
		if (typeof field === 'object' && 'N' in field) return field.N;
		return field;
	}

	onMount(() => {
		const inventoryService = InventoryService.getInstance();
		inventoryService.initialize();

		// If store is empty, we might need to fetch data.
		// For now, we assume data might be there or will arrive via websocket.
		// In a real app, we might want to fetch specific product details.
		// Here we just wait a bit or check store.
	});

	$: {
		if (id && $inventoryStore) {
			const items = Object.values($inventoryStore);
			const found = items.find((item: any) => {
				const sk =
					getValue(item.sk) ||
					getValue(item.sku) ||
					getValue(item.SK) ||
					getValue(item.producto_id);
				return sk === id;
			});

			if (found) {
				const sk = getValue(found.sk) || getValue(found.sku);
				const pk = getValue(found.pk) || getValue(found.tenantId);
				const name = getValue(found.name) || getValue(found.nombre);
				const description = getValue(found.description) || getValue(found.descripcion);
				const price = getValue(found.price) || getValue(found.precio);
				const img = getValue(found.img) || getValue(found.imagenUrl);
				const stockVal = getValue(found.stock);

				product = {
					id: sk,
					nombre: name || 'Producto sin nombre',
					descripcion: description || '',
					precio: price ? parseFloat(price) : 0,
					imagenUrl: img || '/placeholder_food.png',
					stock: stockVal ? parseInt(stockVal) : 0,
					sku: sk,
					tenantId: pk
				};
				loading = false;
			} else {
				// If not found immediately, keep loading or show not found after timeout
				// For now, let's just say if we have items but not this one, it might be missing
				if (items.length > 0) {
					// loading = false; // Don't stop loading immediately, maybe it's coming
				}
			}
		}
	}

	function addToCart() {
		if (!product) return;

		cartStore.update((items) => {
			const existing = items.find((i) => i.id === product.id);
			if (existing) {
				return items.map((i) =>
					i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
				);
			}
			return [...items, { ...product, quantity }];
		});

		isCartOpen.set(true);
	}

	function increment() {
		if (product && quantity < (product.stock || 10)) {
			quantity++;
		}
	}

	function decrement() {
		if (quantity > 1) {
			quantity--;
		}
	}
</script>

<svelte:head>
	<title>{product ? product.nombre : 'Cargando...'} - Chinawok</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12">
	<div class="container mx-auto px-4">
		{#if product}
			<div class="overflow-hidden rounded-2xl bg-white shadow-lg md:flex">
				<!-- Image -->
				<div class="md:w-1/2">
					<div class="relative h-64 w-full md:h-full">
						<img
							src={product.imagenUrl}
							alt={product.nombre}
							class="absolute inset-0 h-full w-full object-cover"
						/>
					</div>
				</div>

				<!-- Details -->
				<div class="flex flex-col p-8 md:w-1/2">
					<div class="mb-auto">
						<h1 class="mb-4 text-3xl font-bold text-gray-900">{product.nombre}</h1>
						<p class="mb-6 text-lg text-gray-600">{product.descripcion}</p>

						<div class="mb-6 flex items-center gap-4">
							<span class="text-3xl font-bold text-gray-900">S/ {product.precio.toFixed(2)}</span>
							{#if product.stock <= 5}
								<span
									class="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800"
								>
									¡Solo quedan {product.stock}!
								</span>
							{/if}
						</div>
					</div>

					<div class="border-t border-gray-100 pt-6">
						<div class="mb-6 flex items-center gap-4">
							<span class="font-medium text-gray-700">Cantidad:</span>
							<div class="flex items-center rounded-lg border border-gray-300">
								<button
									on:click={decrement}
									class="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
									disabled={quantity <= 1}
								>
									-
								</button>
								<span class="w-12 text-center font-medium text-gray-900">{quantity}</span>
								<button
									on:click={increment}
									class="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
									disabled={quantity >= (product.stock || 10)}
								>
									+
								</button>
							</div>
						</div>

						<button
							on:click={addToCart}
							class="w-full rounded-full bg-red-600 py-4 text-lg font-bold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
							disabled={product.stock === 0}
						>
							{product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
						</button>
					</div>
				</div>
			</div>
		{:else}
			<div class="flex flex-col items-center justify-center py-20">
				<div
					class="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-red-200 border-t-red-600"
				></div>
				<p class="text-gray-500">Cargando producto...</p>
			</div>
		{/if}
	</div>
</div>
