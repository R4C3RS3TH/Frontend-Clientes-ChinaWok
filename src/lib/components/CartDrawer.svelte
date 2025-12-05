<script lang="ts">
	import { isCartOpen } from '$lib/stores';
	import { fade, fly } from 'svelte/transition';

	function closeCart() {
		isCartOpen.set(false);
	}
</script>

{#if $isCartOpen}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
		transition:fade={{ duration: 200 }}
		on:click={closeCart}
		on:keydown={(e) => e.key === 'Escape' && closeCart()}
		role="button"
		tabindex="0"
		aria-label="Cerrar carrito"
	></div>

	<!-- Drawer -->
	<div
		class="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl"
		transition:fly={{ x: 400, duration: 300, opacity: 1 }}
	>
		<!-- Header -->
		<div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
			<h2 class="text-lg font-bold text-gray-900">CARRITO DE COMPRAS</h2>
			<button
				on:click={closeCart}
				class="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="h-6 w-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<!-- Content -->
		<div class="flex flex-1 flex-col items-center justify-center p-8 text-center">
			<div class="mb-4 rounded-full bg-gray-50 p-6">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-12 w-12 text-gray-400"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
					/>
				</svg>
			</div>
			<h3 class="mb-2 text-lg font-medium text-gray-900">Tu carrito está vacío</h3>
			<p class="mb-6 text-sm text-gray-500">
				Tu producto ha sido eliminado del carrito y es necesario que realicemos tu compra
				nuevamente.
			</p>
			<button
				on:click={closeCart}
				class="w-full rounded-full bg-red-600 px-6 py-3 font-bold text-white transition-colors hover:bg-red-700"
			>
				VOLVER AL MENÚ
			</button>
		</div>
	</div>
{/if}
