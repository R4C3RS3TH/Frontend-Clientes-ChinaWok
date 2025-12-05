<script lang="ts">
	import MenuCard from '$lib/components/MenuCard.svelte';
	import { inventoryStore } from '$lib/stores';
	import { InventoryService } from '$lib/services/inventory';
	import { onMount } from 'svelte';

	let promoProducts: any[] = [];

	onMount(() => {
		const inventoryService = InventoryService.getInstance();
		inventoryService.initialize();
		// Request different types of products to have variety
		inventoryService.requestInventory('PLATO', 20);
		inventoryService.requestInventory('BEBIDA', 10);
		inventoryService.requestInventory('COMPLEMENTO', 10);
	});

	// Helper to safely get value from DynamoDB style or plain object
	function getValue(field: any): any {
		if (field === undefined || field === null) return undefined;
		if (typeof field === 'object' && 'S' in field) return field.S;
		if (typeof field === 'object' && 'N' in field) return field.N;
		return field;
	}

	// Transform inventory store data to promo products with FAKE discounts
	$: {
		const items = Object.values($inventoryStore);
		const products = items.map((item: any) => {
			const sk =
				getValue(item.sk) || getValue(item.sku) || getValue(item.SK) || getValue(item.producto_id);
			const pk =
				getValue(item.pk) ||
				getValue(item.tenantId) ||
				getValue(item.PK) ||
				getValue(item.tenant_id);
			const name = getValue(item.name) || getValue(item.nombre);
			const description = getValue(item.description) || getValue(item.descripcion);
			const price = getValue(item.price) || getValue(item.precio);
			const img = getValue(item.img) || getValue(item.imagenUrl);
			const stockVal = getValue(item.stock);

			const realPrice = price ? parseFloat(price) : 0;
			// SIMULATE DISCOUNT: Original price is 20% higher
			const fakeOriginalPrice = realPrice * 1.2;
			const discountPercent = 20;

			return {
				id: sk || Math.random().toString(),
				nombre: name || 'Producto sin nombre',
				descripcion: description || '',
				precio: realPrice,
				precioAnterior: fakeOriginalPrice, // Simulated
				descuento: discountPercent, // Simulated
				imagenUrl: img || '/placeholder_food.png',
				stock: stockVal ? parseInt(stockVal) : 0
			};
		});

		// Shuffle or just take the first 8 items for the promo page
		promoProducts = products.slice(0, 8);
	}
</script>

<svelte:head>
	<title>Promociones Exclusivas - Chinawok</title>
	<meta name="description" content="Aprovecha nuestras promociones exclusivas en chifa." />
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
	<div class="container mx-auto px-4">
		<!-- Header -->
		<div class="mb-8 text-center">
			<h1 class="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">Promociones Exclusivas</h1>
			<p class="text-gray-600">¡Disfruta de tus platos favoritos a precios increíbles!</p>
		</div>

		<!-- Grid -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each promoProducts as product (product.id)}
				<MenuCard
					id={product.id}
					nombre={product.nombre}
					descripcion={product.descripcion}
					precio={product.precio}
					precioAnterior={product.precioAnterior}
					descuento={product.descuento}
					imagenUrl={product.imagenUrl}
					stock={product.stock}
				/>
			{/each}
		</div>

		{#if promoProducts.length === 0}
			<div class="flex flex-col items-center justify-center py-12 text-center">
				<div class="mb-4 h-16 w-16 animate-pulse rounded-full bg-gray-200"></div>
				<h3 class="text-lg font-medium text-gray-900">Cargando promociones...</h3>
			</div>
		{/if}
	</div>
</div>
