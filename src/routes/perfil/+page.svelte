<script lang="ts">
	import { userProfileStore, toastStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let user: any = null;

	onMount(() => {
		userProfileStore.subscribe((value) => {
			user = value;
		});
	});

	const handleLogout = () => {
		userProfileStore.set(null);
		toastStore.set({ message: 'Has cerrado sesión correctamente.', type: 'success' });
		setTimeout(() => toastStore.set(null), 3000);
		goto('/');
	};
</script>

<div class="mx-auto max-w-4xl px-6 py-12">
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-3xl font-bold text-gray-900">Mi Perfil</h1>
		{#if user}
			<button
				on:click={handleLogout}
				class="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
			>
				Cerrar Sesión
			</button>
		{/if}
	</div>

	{#if user}
		<div class="flex flex-col items-center gap-8 md:flex-row md:items-start">
			<!-- Profile Image (Outside Card) -->
			<div class="flex flex-col items-center">
				<img
					src="/Stich.webp"
					alt="Stich"
					class="h-48 w-48 rounded-full object-cover shadow-lg ring-4 ring-white"
				/>
				<p class="mt-4 text-lg font-bold text-gray-700">
					¡Hola, {user.name?.split(' ')[0] || 'Amigo'}!
				</p>
			</div>

			<!-- User Data Card -->
			<div class="w-full flex-1 overflow-hidden rounded-lg bg-white shadow">
				<div class="px-4 py-5 sm:px-6">
					<h3 class="text-lg leading-6 font-medium text-gray-900">Información del Usuario</h3>
					<p class="mt-1 max-w-2xl text-sm text-gray-500">Detalles personales y de contacto.</p>
				</div>
				<div class="border-t border-gray-200">
					<dl>
						<div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt class="text-sm font-medium text-gray-500">Nombre completo</dt>
							<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.name || '-'}</dd>
						</div>
						<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt class="text-sm font-medium text-gray-500">Correo electrónico</dt>
							<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.email || '-'}</dd>
						</div>
						<!-- Add more fields as available in the user object -->
						<div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt class="text-sm font-medium text-gray-500">ID de Usuario</dt>
							<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
								{user.sub || user.id || '-'}
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	{:else}
		<div class="rounded-md bg-yellow-50 p-4">
			<div class="flex">
				<div class="flex-shrink-0">
					<svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<div class="ml-3">
					<h3 class="text-sm font-medium text-yellow-800">No has iniciado sesión</h3>
					<div class="mt-2 text-sm text-yellow-700">
						<p>Por favor inicia sesión para ver tu perfil.</p>
					</div>
					<div class="mt-4">
						<a href="/login" class="font-medium text-yellow-700 underline hover:text-yellow-600"
							>Ir al Login</a
						>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
