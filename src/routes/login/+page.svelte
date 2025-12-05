<script lang="ts">
	import { AuthService } from '$lib/services/auth';
	import { onMount } from 'svelte';
	import { toastStore, isRequestLoading } from '$lib/stores';

	let showPassword = false;
	let isLogin = true; // true = login, false = registro

	let loginEmail = '';
	let loginPassword = '';
	let registerEmail = '';
	let registerPassword = '';
	let registerConfirmPassword = '';
	let registerName = '';

	let authService: AuthService;

	onMount(() => {
		authService = AuthService.getInstance();
		authService.initialize();
	});

	const togglePassword = () => {
		showPassword = !showPassword;
	};

	const validatePassword = (password: string): boolean => {
		const minLength = 8;
		const hasUpperCase = /[A-Z]/.test(password);
		const hasNumber = /[0-9]/.test(password);
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

		if (password.length < minLength) {
			toastStore.set({ message: 'La contraseña debe tener al menos 8 caracteres.', type: 'error' });
			return false;
		}
		if (!hasUpperCase) {
			toastStore.set({
				message: 'La contraseña debe tener al menos una letra mayúscula.',
				type: 'error'
			});
			return false;
		}
		if (!hasNumber) {
			toastStore.set({ message: 'La contraseña debe tener al menos un número.', type: 'error' });
			return false;
		}
		if (!hasSpecialChar) {
			toastStore.set({
				message: 'La contraseña debe tener al menos un carácter especial (!@#$%^&*).',
				type: 'error'
			});
			return false;
		}
		return true;
	};

	const handleLogin = () => {
		if (!loginEmail || !loginPassword) return;

		isRequestLoading.set(true);
		authService.login(loginEmail, loginPassword);
	};

	const handleRegister = () => {
		if (!validatePassword(registerPassword)) {
			return;
		}

		authService.register({
			name: registerName,
			email: registerEmail,
			password: registerPassword
		});
	};
</script>

<svelte:head>
	<title>Inicia sesión o crea tu cuenta - Chinawok</title>
</svelte:head>

<!-- Línea divisoria superior -->
<div class="border-b border-gray-200"></div>

<div class="mx-auto max-w-6xl bg-gray-50 px-6 py-12">
	<div
		class="grid gap-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg md:grid-cols-2"
	>
		<!-- Sección de Login -->
		<div class="border-r-0 border-gray-200 bg-white p-8 md:border-r">
			<h1 class="mb-6 text-3xl font-bold text-gray-900">Iniciar sesión</h1>

			<form on:submit|preventDefault={handleLogin} class="space-y-6">
				<!-- Email -->
				<div>
					<label for="login-email" class="mb-2 block text-sm font-medium text-gray-700">
						Correo electrónico <span class="text-red-500">*</span>
					</label>
					<input
						id="login-email"
						type="email"
						bind:value={loginEmail}
						placeholder="Ej. nombre@mail.com"
						required
						class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 focus:outline-none"
					/>
				</div>

				<!-- Password -->
				<div>
					<label for="login-password" class="mb-2 block text-sm font-medium text-gray-700">
						Contraseña <span class="text-red-500">*</span>
					</label>
					<div class="relative">
						<input
							id="login-password"
							type={showPassword ? 'text' : 'password'}
							bind:value={loginPassword}
							placeholder="Aa12345"
							required
							class="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 focus:outline-none"
						/>
						<button
							type="button"
							on:click={togglePassword}
							class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
							aria-label="Mostrar contraseña"
						>
							{#if showPassword}
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
									/>
								</svg>
							{:else}
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							{/if}
						</button>
					</div>
				</div>

				<!-- Forgot Password -->
				<div>
					<a href="/recuperar-password" class="text-sm text-green-600 hover:text-green-700"
						>Olvidé mi contraseña</a
					>
				</div>

				<!-- Submit Button -->
				<button
					type="submit"
					disabled={$isRequestLoading}
					class="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{#if $isRequestLoading}
						<span class="flex items-center justify-center gap-2">
							<svg
								class="h-5 w-5 animate-spin text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Iniciando sesión...
						</span>
					{:else}
						Iniciar sesión
					{/if}
				</button>
			</form>
		</div>

		<!-- Sección de Registro -->
		<div class="border-l-0 border-gray-200 bg-white p-8 md:border-l">
			<h1 class="mb-6 text-3xl font-bold text-gray-900">Crear cuenta</h1>

			<p class="mb-6 text-gray-600">Crea una y aprovecha los beneficios:</p>

			<ul class="mb-8 space-y-3 text-gray-700">
				<li class="flex items-start gap-3">
					<svg
						class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>Realiza tus compras de manera más ágil.</span>
				</li>
				<li class="flex items-start gap-3">
					<svg
						class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>Guarda múltiples direcciones de envío y facturación.</span>
				</li>
				<li class="flex items-start gap-3">
					<svg
						class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>Realiza el seguimiento a tus compras y revisa tus pedidos realizados.</span>
				</li>
				<li class="flex items-start gap-3">
					<svg
						class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>Haz una lista de productos favoritos.</span>
				</li>
			</ul>

			<form on:submit|preventDefault={handleRegister} class="space-y-6">
				<!-- Nombre -->
				<div>
					<label for="register-name" class="mb-2 block text-sm font-medium text-gray-700">
						Nombre completo <span class="text-red-500">*</span>
					</label>
					<input
						id="register-name"
						type="text"
						bind:value={registerName}
						placeholder="Ej. Juan Pérez"
						required
						class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 focus:outline-none"
					/>
				</div>

				<!-- Email -->
				<div>
					<label for="register-email" class="mb-2 block text-sm font-medium text-gray-700">
						Correo electrónico <span class="text-red-500">*</span>
					</label>
					<input
						id="register-email"
						type="email"
						bind:value={registerEmail}
						placeholder="Ej. nombre@mail.com"
						required
						class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 focus:outline-none"
					/>
				</div>

				<!-- Password -->
				<div>
					<label for="register-password" class="mb-2 block text-sm font-medium text-gray-700">
						Contraseña <span class="text-red-500">*</span>
					</label>
					<input
						id="register-password"
						type="password"
						bind:value={registerPassword}
						placeholder="Mínimo 8 caracteres"
						required
						minlength="8"
						class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 focus:outline-none"
					/>
				</div>

				<!-- Submit Button -->
				<button
					type="submit"
					class="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
				>
					Crear cuenta
				</button>
			</form>
		</div>
	</div>
</div>
