<script lang="ts">
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
</script>

<footer class="border-t border-gray-200 bg-white">
	<div class="mx-auto max-w-7xl px-6 py-12">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			<!-- Logo y Redes Sociales -->
			<div>
				<a href="/" class="mb-6 inline-block">
					<img
						src="https://www.chinawok.com.pe/static/version1732223445/frontend/Inquba/chinawok/es_PE/images/logo.svg"
						alt="Chinawok Logo"
						class="h-8 w-auto"
					/>
				</a>
				<p class="mb-4 text-sm text-gray-600">Síguenos en</p>
				<div class="flex gap-4">
					<a
						href="https://facebook.com"
						target="_blank"
						rel="noopener noreferrer"
						class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-green-600"
						aria-label="Facebook"
					>
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
							/>
						</svg>
					</a>
					<a
						href="https://instagram.com"
						target="_blank"
						rel="noopener noreferrer"
						class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-green-600"
						aria-label="Instagram"
					>
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
							/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Nuestros Productos -->
			<div>
				<h3 class="mb-4 text-sm font-bold text-gray-800">Nuestros Productos</h3>
				<ul class="space-y-2 text-sm text-gray-500">
					<li><a href="/categoria/promociones" class="hover:text-green-600">Promociones</a></li>
					<li>
						<a href="/categoria/combos-personales" class="hover:text-green-600">Combos Personales</a
						>
					</li>
					<li><a href="/categoria/clasicos" class="hover:text-green-600">Clásicos</a></li>
					<li><a href="/categoria/sabor-al-wok" class="hover:text-green-600">Sabor Al Wok</a></li>
					<li><a href="/categoria/aeropuerto" class="hover:text-green-600">Aeropuerto</a></li>
					<li><a href="/categoria/mostrazo" class="hover:text-green-600">Mostrazo Chinawok</a></li>
					<li><a href="/categoria/familiar" class="hover:text-green-600">Familiar</a></li>
					<li><a href="/categoria/complementos" class="hover:text-green-600">Complementos</a></li>
					<li><a href="/categoria/bebidas" class="hover:text-green-600">Bebidas</a></li>
				</ul>
			</div>

			<!-- Ayuda -->
			<div>
				<h3 class="mb-4 text-sm font-bold text-gray-800">Ayuda</h3>
				<ul class="space-y-2 text-sm text-gray-500">
					<li><a href="/comprobante" class="hover:text-green-600">Comprobante electrónico</a></li>
					<li><a href="/terminos" class="hover:text-green-600">Términos y condiciones</a></li>
					<li>
						<a href="/terminos-promociones" class="hover:text-green-600"
							>Términos y condiciones de promociones</a
						>
					</li>
					<li>
						<a href="/politicas-datos" class="hover:text-green-600">Políticas de datos personales</a
						>
					</li>
					<li><a href="/derechos-arco" class="hover:text-green-600">Derechos Arco</a></li>
					<li><a href="/zonas-reparto" class="hover:text-green-600">Zonas de Reparto</a></li>
					<li><a href="/politica-cookies" class="hover:text-green-600">Política de cookies</a></li>
				</ul>
			</div>

			<!-- Libro de Reclamaciones y Métodos de Pago -->
			<div>
				<div class="mb-8">
					<h3 class="mb-4 text-sm font-bold text-gray-800">Libro de reclamaciones</h3>
					<a href="/libro-reclamaciones" class="inline-block">
						<img
							src="https://www.chinawok.com.pe/static/version1732223445/frontend/Inquba/chinawok/es_PE/images/libro_reclamaciones.svg"
							alt="Libro de Reclamaciones"
							class="h-12 w-auto"
						/>
					</a>
				</div>

				<div>
					<h3 class="mb-4 text-sm font-bold text-gray-800">Métodos de Pago</h3>
					<div class="flex gap-2">
						<img
							src="https://www.chinawok.com.pe/static/version1732223445/frontend/Inquba/chinawok/es_PE/images/visa.svg"
							alt="Visa"
							class="h-8"
						/>
						<img
							src="https://www.chinawok.com.pe/static/version1732223445/frontend/Inquba/chinawok/es_PE/images/mastercard.svg"
							alt="Mastercard"
							class="h-8"
						/>
						<img
							src="https://www.chinawok.com.pe/static/version1732223445/frontend/Inquba/chinawok/es_PE/images/amex.svg"
							alt="Amex"
							class="h-8"
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- Copyright -->
		<div class="mt-12 text-left text-xs text-gray-400">
			<p>© 2025 Chinawok. Todos los derechos reservados.</p>
		</div>
	</div>

	<!-- Botón scroll to top -->
	<button
		on:click={scrollToTop}
		class="fixed right-8 bottom-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-all hover:scale-110 hover:bg-green-700"
		aria-label="Volver arriba"
	>
		<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M5 10l7-7m0 0l7 7m-7-7v18"
			/>
		</svg>
	</button>
</footer>
