<script lang="ts">
	import MenuCard from '$lib/components/MenuCard.svelte';
	import PromoCarousel from '$lib/components/PromoCarrusel.svelte';
	import CategoriasCarousel from '$lib/components/CategoriasCarousel.svelte';
	import type { PageData } from './$types';
	import { inventoryStore } from '$lib/stores';
	import { InventoryService } from '$lib/services/inventory';
	import { onMount } from 'svelte';

	export let data: PageData;

	let recommendedProducts: any[] = [];

	onMount(() => {
		const inventoryService = InventoryService.getInstance();
		inventoryService.initialize();
		// Request products for the home page
		inventoryService.requestInventory('PLATO', 20);
	});

	// Helper to safely get value from DynamoDB style or plain object
	function getValue(field: any): any {
		if (field === undefined || field === null) return undefined;
		if (typeof field === 'object' && 'S' in field) return field.S;
		if (typeof field === 'object' && 'N' in field) return field.N;
		return field;
	}

	// Transform inventory store data to recommended products (limit 4)
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

			return {
				id: `${pk}_${sk}` || Math.random().toString(),
				nombre: name || 'Producto sin nombre',
				descripcion: description || '',
				precio: price ? parseFloat(price) : 0,
				precioAnterior: undefined,
				descuento: undefined,
				imagenUrl: img || '/placeholder_food.png',
				stock: stockVal ? parseInt(stockVal) : 0
			};
		});

		// Take only the first 4 items
		recommendedProducts = products.slice(0, 4);
	}
</script>

<svelte:head>
	<title>Chinawok - Chifa a un clic</title>
	<meta
		name="description"
		content="Disfruta de los mejores platos chifa peruanos. Pedidos online y delivery."
	/>
</svelte:head>

<!-- Carrusel de Promociones -->
<section class="bg-gray-50">
	<PromoCarousel />
</section>

<!-- Categorías de Productos -->
<section class="bg-white">
	<CategoriasCarousel />
</section>

<!-- Productos Recomendados -->
<section class="bg-gray-50 py-12">
	<div class="mx-auto max-w-7xl px-6">
		<h2 class="mb-8 text-center text-3xl font-bold text-gray-800 md:text-4xl">
			RECOMENDADOS PARA TI
		</h2>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each recommendedProducts as plato (plato.id)}
				<MenuCard
					nombre={plato.nombre}
					descripcion={plato.descripcion}
					precio={plato.precio}
					precioAnterior={plato.precioAnterior}
					descuento={plato.descuento}
					imagenUrl={plato.imagenUrl}
					stock={plato.stock}
				/>
			{/each}
		</div>
	</div>
</section>
