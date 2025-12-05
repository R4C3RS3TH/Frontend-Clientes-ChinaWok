<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { cartStore, isCartOpen } from '$lib/stores';

	export let id: string | number = '';
	export let nombre: string;
	export let descripcion: string;
	export let precio: number;
	export let precioAnterior: number | undefined = undefined;
	export let descuento: number | undefined = undefined;
	export let imagenUrl: string;
	export let stock: number | undefined = undefined;

	const dispatch = createEventDispatcher();

	// Determine stock status
	$: isOutOfStock = stock !== undefined && stock <= 0;
	$: isLowStock = stock !== undefined && stock > 0 && stock <= 5;

	function handleAddToCart(e: Event) {
		e.preventDefault();
		e.stopPropagation();

		cartStore.update((items) => {
			const existing = items.find((i) => i.id === id);
			if (existing) {
				return items.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
			}
			return [
				...items,
				{
					id,
					nombre,
					descripcion,
					precio,
					imagenUrl,
					stock,
					quantity: 1
				}
			];
		});

		isCartOpen.set(true);
		dispatch('add', { id, nombre, precio, imagenUrl });
	}
</script>

<div
	class="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
>
	<a href="/producto/{encodeURIComponent(id.toString())}" class="contents">
		<!-- Image Container -->
		<div class="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
			<img
				src={imagenUrl}
				alt={nombre}
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
			<!-- Heart Icon -->
			<button
				class="absolute top-2 right-2 z-10 rounded-full bg-white p-1.5 text-gray-400 shadow-sm transition-colors hover:text-red-500"
				aria-label="Agregar a favoritos"
				on:click|preventDefault|stopPropagation
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
					/>
				</svg>
			</button>

			<!-- Stock Badge -->
			{#if isOutOfStock}
				<span
					class="absolute top-2 left-2 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm"
				>
					Agotado
				</span>
			{:else if isLowStock}
				<span
					class="absolute top-2 left-2 rounded-full bg-orange-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm"
				>
					Últimas {stock} unidades
				</span>
			{/if}
		</div>

		<!-- Content -->
		<div class="flex flex-1 flex-col p-4">
			<h3 class="mb-1 line-clamp-2 text-sm font-bold text-gray-900">{nombre}</h3>
			<p class="mb-3 line-clamp-2 text-xs text-gray-500">{descripcion}</p>

			<div class="mt-auto flex items-end justify-between">
				<div class="flex flex-col">
					{#if precioAnterior}
						<div class="flex items-center gap-2 text-xs">
							<span class="text-gray-400 line-through">S/ {precioAnterior.toFixed(2)}</span>
							{#if descuento}
								<span class="rounded bg-red-600 px-1 py-0.5 text-[10px] font-bold text-white"
									>-{descuento}%</span
								>
							{/if}
						</div>
					{/if}
					<span class="text-lg font-bold text-gray-900">S/ {precio.toFixed(2)}</span>
				</div>

				<button
					class="z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors {isOutOfStock
						? 'cursor-not-allowed bg-gray-300 text-gray-500'
						: 'bg-green-600 text-white hover:bg-green-700'}"
					aria-label="Agregar al carrito"
					disabled={isOutOfStock}
					on:click={handleAddToCart}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						class="h-5 w-5"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
				</button>
			</div>
		</div>
	</a>
</div>
