<script lang="ts">
	import { onMount } from 'svelte';

	const categorias = [
		{
			id: 1,
			nombre: 'ChinaWeek',
			imagen: '/ChinaWeek.webp',
			link: '/categoria/chinaweek',
			color: 'bg-gray-50'
		},
		{
			id: 2,
			nombre: 'Chijaukay A lo Pobre',
			imagen: '/ChijaukayPobre.webp',
			link: '/categoria/chijaukay',
			color: 'bg-gray-50'
		},
		{
			id: 3,
			nombre: 'Promociones',
			imagen: '/Promociones.webp',
			link: '/categoria/promociones',
			color: 'bg-gray-50'
		},
		{
			id: 4,
			nombre: 'Banquetazos',
			imagen: '/Banquetasos.webp',
			link: '/categoria/banquetazos',
			color: 'bg-gray-50'
		},
		{
			id: 5,
			nombre: 'Combos Personales',
			imagen: '/CombosPersonales.webp',
			link: '/categoria/combos-personales',
			color: 'bg-gray-50'
		},
		{
			id: 6,
			nombre: 'Clásicos',
			imagen: '/Clasicos.webp',
			link: '/categoria/clasicos',
			color: 'bg-gray-50'
		},
		{
			id: 7,
			nombre: 'Sabor Al Wok',
			imagen: '/SaborWok.webp',
			link: '/categoria/sabor-al-wok',
			color: 'bg-gray-50'
		},
		{
			id: 8,
			nombre: 'Aeropuerto',
			imagen: '/Aeropuerto.webp',
			link: '/categoria/aeropuerto',
			color: 'bg-gray-50'
		},
		{
			id: 9,
			nombre: 'Mostrazo Chinawok',
			imagen: '/MostrazoChinawok.webp',
			link: '/categoria/mostrazo',
			color: 'bg-gray-50'
		},
		{
			id: 10,
			nombre: 'Familiar',
			imagen: '/Familiar.webp',
			link: '/categoria/familiar',
			color: 'bg-gray-50'
		},
		{
			id: 11,
			nombre: 'Complementos',
			imagen: '/Complementos.webp',
			link: '/categoria/complementos',
			color: 'bg-gray-50'
		},
		{
			id: 12,
			nombre: 'Bebidas',
			imagen: '/Bebidas.webp',
			link: '/categoria/bebidas',
			color: 'bg-gray-50'
		}
	];

	const itemsPerPage = 6;
	const totalPages = Math.ceil(categorias.length / itemsPerPage);
	let currentPage = 0; // 0 = primera página, 1 = segunda página

	const getScrollAmount = () => {
		const container = document.getElementById('categorias-container');
		if (!container) return 0;

		// Obtener el primer elemento hijo para calcular el ancho
		const firstChild = container.firstElementChild as HTMLElement;
		if (!firstChild) return 0;

		// Obtener el ancho del elemento (offsetWidth incluye padding y border)
		const itemWidth = firstChild.offsetWidth;

		// Obtener el gap del contenedor (gap-4 = 16px)
		const containerStyle = window.getComputedStyle(container);
		const gap = parseFloat(containerStyle.gap) || 16;

		// Calcular el ancho de una página completa (6 items + 5 gaps)
		return itemWidth * itemsPerPage + gap * (itemsPerPage - 1);
	};

	const updateCurrentPage = () => {
		const container = document.getElementById('categorias-container');
		if (container) {
			const scrollLeft = container.scrollLeft;
			const scrollAmount = getScrollAmount();
			if (scrollAmount > 0) {
				const newPage = Math.round(scrollLeft / scrollAmount);
				currentPage = Math.min(Math.max(0, newPage), totalPages - 1);
			}
		}
	};

	const scrollLeft = () => {
		const container = document.getElementById('categorias-container');
		if (container) {
			const scrollAmount = getScrollAmount();
			if (currentPage === 0) {
				// Si está en la primera página, ir a la última
				currentPage = totalPages - 1;
				const targetScroll = currentPage * scrollAmount;
				container.scrollTo({ left: targetScroll, behavior: 'smooth' });
			} else {
				// Ir a la página anterior
				currentPage -= 1;
				const targetScroll = currentPage * scrollAmount;
				container.scrollTo({ left: targetScroll, behavior: 'smooth' });
			}
		}
	};

	const scrollRight = () => {
		const container = document.getElementById('categorias-container');
		if (container) {
			const scrollAmount = getScrollAmount();
			if (currentPage === totalPages - 1) {
				// Si está en la última página, ir a la primera
				currentPage = 0;
				container.scrollTo({ left: 0, behavior: 'smooth' });
			} else {
				// Ir a la página siguiente
				currentPage += 1;
				const targetScroll = currentPage * scrollAmount;
				container.scrollTo({ left: targetScroll, behavior: 'smooth' });
			}
		}
	};

	const goToPage = (page: number) => {
		const container = document.getElementById('categorias-container');
		if (container) {
			currentPage = page;
			const scrollAmount = getScrollAmount();
			const targetScroll = page * scrollAmount;
			container.scrollTo({ left: targetScroll, behavior: 'smooth' });
		}
	};

	onMount(() => {
		const container = document.getElementById('categorias-container');
		if (container) {
			container.addEventListener('scroll', updateCurrentPage);
			// Actualizar página inicial
			updateCurrentPage();
		}
		return () => {
			if (container) {
				container.removeEventListener('scroll', updateCurrentPage);
			}
		};
	});
</script>

<div class="mx-auto max-w-7xl px-6 py-8">
	<div class="relative">
		<!-- Botón izquierdo -->
		<button
			on:click={scrollLeft}
			class="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-green-600 p-3 text-white shadow-lg transition-all hover:scale-110 hover:bg-green-700"
			aria-label="Anterior"
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>

		<!-- Contenedor de categorías con scroll horizontal -->
		<div
			id="categorias-container"
			class="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth px-16 py-4"
		>
			{#each categorias as categoria}
				<a
					href={categoria.link}
					class="group flex w-[175px] flex-shrink-0 flex-col items-center gap-3 transition-all hover:scale-105"
				>
					<!-- Botón con nombre de categoría -->
					<div
						class="flex min-h-[2.5rem] w-full items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-center text-xs font-semibold text-gray-800 transition-all group-hover:border-green-600 group-hover:bg-green-50"
					>
						<span class="truncate">{categoria.nombre}</span>
					</div>

					<!-- Contenedor de imagen -->
					<div
						class="relative h-32 w-full overflow-hidden rounded-lg bg-gray-100 shadow-md transition-all group-hover:shadow-xl"
					>
						<img
							src={categoria.imagen}
							alt={categoria.nombre}
							class="h-full w-full object-cover transition-transform group-hover:scale-110"
						/>
						<!-- Overlay sutil al hover -->
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
						></div>
					</div>
				</a>
			{/each}
		</div>

		<!-- Botón derecho -->
		<button
			on:click={scrollRight}
			class="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-green-600 p-3 text-white shadow-lg transition-all hover:scale-110 hover:bg-green-700"
			aria-label="Siguiente"
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	</div>

	<!-- Indicadores de carrusel - Solo 2 puntos -->
	<div class="mt-6 flex justify-center gap-2">
		{#each Array(totalPages) as _, i}
			<button
				on:click={() => goToPage(i)}
				class="h-2 rounded-full transition-all {i === currentPage
					? 'w-6 bg-green-600'
					: 'w-2 bg-gray-300 hover:bg-gray-400'}"
				aria-label="Ir a página {i + 1}"
			></button>
		{/each}
	</div>
</div>

<style>
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
