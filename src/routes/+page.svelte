<script lang="ts">
	import MenuCard from '$lib/components/MenuCard.svelte';
	import PromoCarousel from '$lib/components/PromoCarrusel.svelte';
	import CategoriasCarousel from '$lib/components/CategoriasCarousel.svelte';
	import type { PageData } from './$types';
	import { productsStore, inventoryStore } from '$lib/stores';

	export let data: PageData;

	// Initialize store with server data
	$: if (data.productos) {
		productsStore.set(data.productos);
	}

	// Helper to get stock from inventory store
	function getStock(plato: any) {
		if (!plato.sku || !plato.tenantId) return undefined;
		const key = `${plato.tenantId}_${plato.sku}`;
		const item = $inventoryStore[key];
		return item?.stock?.N ? parseInt(item.stock.N) : undefined;
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
			{#each $productsStore as plato}
				<MenuCard
					nombre={plato.nombre}
					descripcion={plato.descripcion}
					precio={plato.precio}
					precioAnterior={plato.precioAnterior}
					descuento={plato.descuento}
					imagenUrl={plato.imagenUrl}
					stock={getStock(plato)}
				/>
			{/each}
		</div>
	</div>
</section>
