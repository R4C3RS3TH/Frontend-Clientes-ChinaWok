<script lang="ts">
	import ProductoCard from '$lib/components/ProductoCard.svelte';
	import PromoCarousel from '$lib/components/PromoCarrusel.svelte';
	import CategoriasCarousel from '$lib/components/CategoriasCarousel.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Chinawok - Chifa a un clic</title>
	<meta name="description" content="Disfruta de los mejores platos chifa peruanos. Pedidos online y delivery." />
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
			{#each data.productos as plato}
				<ProductoCard
					nombre={plato.nombre}
					descripcion={plato.descripcion}
					precio={plato.precio}
					imagenUrl={plato.imagenUrl}
				/>
			{/each}
		</div>
	</div>
</section>
