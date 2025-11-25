<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	const promotions = [
		{
			id: 1,
			imageUrl: '/Chijaukay.webp',
			altText: 'Promoción Chijaukay',
			linkUrl: '/promociones/chijaukay'
		},
		{
			id: 2,
			imageUrl: '/DiasEncajate.webp',
			altText: 'Promoción Días Encájate',
			linkUrl: '/promociones/dias-encajate'
		},
		{
			id: 3,
			imageUrl: '/DuoEncajate.webp',
			altText: 'Promoción Dúo Encájate',
			linkUrl: '/promociones/duo-encajate'
		},
		{
			id: 4,
			imageUrl: '/GolazoDeSabor.webp',
			altText: 'Promoción Golazo de Sabor',
			linkUrl: '/promociones/golazo-de-sabor'
		}
	];

	let currentPromotionIndex = 0;
	let interval: ReturnType<typeof setInterval>;

	const goToNextPromotion = () => {
		currentPromotionIndex = (currentPromotionIndex + 1) % promotions.length;
	};

	const goToPreviousPromotion = () => {
		currentPromotionIndex = (currentPromotionIndex - 1 + promotions.length) % promotions.length;
	};

	const startAutoSlide = () => {
		interval = setInterval(goToNextPromotion, 5000);
	};

	const stopAutoSlide = () => {
		clearInterval(interval);
	};

	onMount(() => {
		startAutoSlide();
		return () => stopAutoSlide();
	});

	onDestroy(() => {
		stopAutoSlide();
	});
</script>

<div
	class="relative w-full overflow-hidden"
	on:mouseenter={stopAutoSlide}
	on:mouseleave={startAutoSlide}
>
	<div
		class="flex"
		style="
      transform: translateX(-{currentPromotionIndex * 100}%);
      transition: transform 0.5s ease-in-out;
    "
	>
		{#each promotions as promo}
			<a href={promo.linkUrl} class="block w-full flex-shrink-0">
				<img src={promo.imageUrl} alt={promo.altText} class="h-[450px] w-full object-cover" />
			</a>
		{/each}
	</div>

	<button
		on:click={goToPreviousPromotion}
		class="bg-opacity-50 hover:bg-opacity-75 absolute top-1/2 left-0 z-20 ml-4 -translate-y-1/2 rounded-full bg-black p-3 text-white transition-colors"
	>
		&#x276E;
	</button>

	<button
		on:click={goToNextPromotion}
		class="bg-opacity-50 hover:bg-opacity-75 absolute top-1/2 right-0 z-20 mr-4 -translate-y-1/2 rounded-full bg-black p-3 text-white transition-colors"
	>
		&#x276F;
	</button>

	<div class="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
		{#each promotions as _, i}
			<button
				on:click={() => (currentPromotionIndex = i)}
				class="h-3 w-3 rounded-full {currentPromotionIndex === i
					? 'bg-white'
					: 'bg-gray-400'} transition-colors"
			>
				<span class="sr-only">Go to slide {i + 1}</span>
			</button>
		{/each}
	</div>
</div>
