<script lang="ts">
	import { isCartOpen, cartStore, type CartItem } from '$lib/stores';
	import { fade, fly } from 'svelte/transition';

	function closeCart() {
		isCartOpen.set(false);
	}

	function removeFromCart(id: number | string) {
		cartStore.update((items) => items.filter((item) => item.id !== id));
	}

	$: total = $cartStore.reduce((sum, item) => sum + item.precio * item.quantity, 0);
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
		<div class="flex flex-1 flex-col overflow-y-auto p-6">
			{#if $cartStore.length === 0}
				<div class="flex flex-1 flex-col items-center justify-center text-center">
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
						Agrega tus platos favoritos para comenzar tu pedido.
					</p>
					<button
						on:click={closeCart}
						class="rounded-full bg-red-600 px-6 py-3 font-bold text-white transition-colors hover:bg-red-700"
					>
						VOLVER AL MENÚ
					</button>
				</div>
			{:else}
				<div class="space-y-6">
					{#each $cartStore as item (item.id)}
						<div class="flex items-start gap-4">
							<div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
								<img src={item.imagenUrl} alt={item.nombre} class="h-full w-full object-cover" />
							</div>
							<div class="flex flex-1 flex-col">
								<div class="flex justify-between">
									<h3 class="font-medium text-gray-900">{item.nombre}</h3>
									<button
										on:click={() => removeFromCart(item.id)}
										class="text-gray-400 hover:text-red-600"
										aria-label="Eliminar"
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
												d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
											/>
										</svg>
									</button>
								</div>
								<p class="text-sm text-gray-500">{item.descripcion}</p>
								<div class="mt-2 flex items-center justify-between">
									<span class="text-sm font-medium text-gray-600">Cant: {item.quantity}</span>
									<span class="font-bold text-gray-900"
										>S/ {(item.precio * item.quantity).toFixed(2)}</span
									>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Footer -->
		{#if $cartStore.length > 0}
			<div class="border-t border-gray-100 p-6">
				<div class="mb-4 flex items-center justify-between text-lg font-bold text-gray-900">
					<span>Total</span>
					<span>S/ {total.toFixed(2)}</span>
				</div>
				<button
					class="w-full rounded-full bg-red-600 py-3 font-bold text-white transition-colors hover:bg-red-700"
				>
					FINALIZAR COMPRA
				</button>
			</div>
		{/if}
	</div>
{/if}
