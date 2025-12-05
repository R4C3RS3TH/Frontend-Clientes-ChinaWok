<script lang="ts">
	import { userProfileStore, isCartOpen, cartStore } from '$lib/stores';

	$: carritoTotal = $cartStore.reduce((sum, item) => sum + item.precio * item.quantity, 0);

	let user: any = null;

	userProfileStore.subscribe((value) => {
		console.log('TopNavbar user update:', value);
		user = value;
	});
</script>

<div class="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
	<div class="mx-auto w-full max-w-7xl px-6 py-4">
		<div class="flex items-center justify-between gap-4">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<a href="/">
					<img src="/logo.svg" alt="Logo" class="h-10 w-auto" />
				</a>
			</div>

			<!-- Navegación central - Espaciado reducido para que quepan todos -->
			<div class="hidden flex-1 items-center justify-center gap-4 lg:flex xl:gap-8">
				<a
					href="/menu"
					class="flex items-center gap-2 font-bold whitespace-nowrap text-gray-700 hover:text-red-600"
				>
					<svg class="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
						/>
					</svg>
					Menú
				</a>
				<a
					href="/promociones"
					class="flex items-center gap-2 font-bold whitespace-nowrap text-gray-700 hover:text-red-600"
				>
					<svg class="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
						/>
					</svg>
					Promos exclusivas
				</a>
				<a
					href="/locales"
					class="flex items-center gap-2 font-bold whitespace-nowrap text-gray-700 hover:text-red-600"
				>
					<svg class="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
						/>
					</svg>
					Locales
				</a>
				<button class="text-gray-600 hover:text-red-600" aria-label="Buscar productos">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>

			<!-- Elementos de la derecha: Teléfono, Login y Carrito -->
			<div class="flex items-center gap-4 lg:gap-8">
				<!-- Llámanos -->
				<a
					href="tel:01-612-8000"
					class="hidden items-center gap-2 text-gray-700 hover:text-red-600 lg:flex"
				>
					<svg
						class="h-5 w-5 flex-shrink-0 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
						/>
					</svg>
					<div class="flex flex-col leading-tight">
						<span class="text-xs font-medium text-gray-500">Llámanos</span>
						<span class="text-sm font-bold text-green-600">01-612-8000</span>
					</div>
				</a>

				<!-- Iniciar Sesión -->
				<div class="hidden items-center gap-2 text-gray-700 hover:text-red-600 lg:flex">
					<!-- Login / User -->
					<div class="flex items-center gap-2">
						<svg
							class="h-6 w-6 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
						<div class="flex flex-col">
							<span class="text-xs text-gray-500">Hola,</span>
							{#if user}
								<a href="/perfil" class="text-sm font-bold text-green-600 hover:text-green-500">
									{user.name || user.email || 'Usuario'}
								</a>
							{:else}
								<a href="/login" class="text-sm font-bold text-green-600 hover:text-green-500"
									>INICIAR SESIÓN</a
								>
							{/if}
						</div>
					</div>
				</div>

				<!-- Carrito -->
				<button
					on:click={() => isCartOpen.set(true)}
					class="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 font-semibold whitespace-nowrap text-white transition-colors hover:bg-green-700"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
						/>
					</svg>
					<span>S/ {carritoTotal.toFixed(2)}</span>
				</button>
			</div>
		</div>
	</div>
</div>
