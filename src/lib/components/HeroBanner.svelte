<script lang="ts">
	// Puedes poner la URL de la imagen aquí para hacerla dinámica
	const bannerImageUrl =
		'https://www.chinawok.com.pe/media/M2-Home-N-Banner-D-CHI-JAU-KAY-A-LO-POBRE.jpg';
</script>

<div
	class="relative mx-auto max-w-7xl overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-red-700 shadow-xl"
>
	<!-- Fondo con patrón de ondas -->
	<div
		class="absolute inset-0 bg-cover bg-center opacity-90"
		style="background-image: url({bannerImageUrl})"
	>
		<div class="absolute inset-0 bg-gradient-to-r from-red-900/60 to-transparent"></div>
	</div>

	<div class="relative z-10 flex items-center gap-8 p-8 md:p-12 lg:p-16">
		<!-- Contenido izquierdo -->
		<div class="flex-1">
			<!-- Logo de marca (ejemplo: Inca Kola) -->
			<div class="mb-4">
				<span class="rounded bg-white/20 px-4 py-1 text-sm font-bold text-white backdrop-blur-sm">
					INCA KOLA sin azúcar
				</span>
			</div>

			<!-- Título principal -->
			<h2 class="mb-3 text-4xl font-extrabold leading-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl">
				CHI JAU KAY<br />A LO POBRE
			</h2>
			<p class="mb-6 text-xl font-semibold text-yellow-300 drop-shadow-md md:text-2xl">
				• LA FUSIÓN DE SABOR •
			</p>

			<!-- Botón de compra -->
			<button
				class="rounded-full bg-black px-8 py-3 text-lg font-bold text-white transition-all hover:scale-105 hover:bg-gray-900 md:px-10"
			>
				Comprar
			</button>
		</div>

		<!-- Imagen del producto (derecha) - visible en pantallas grandes -->
		<div class="hidden flex-1 lg:block">
			<div class="relative">
				<img
					src={bannerImageUrl}
					alt="Chi Jau Kay a lo Pobre"
					class="h-auto w-full rounded-lg object-contain"
				/>
			</div>
		</div>
	</div>

	<!-- Información de validez y disclaimer -->
	<div class="relative z-10 border-t border-white/20 bg-black/30 px-8 py-3 backdrop-blur-sm">
		<div class="flex flex-col items-start justify-between gap-2 text-xs text-white md:flex-row md:items-center">
			<div>
				<span class="font-semibold">VÁLIDO EN:</span>
				<span class="ml-2">SALÓN | CHINAWOK.COM.PE | (01)612-8000</span>
			</div>
			<div class="text-white/80">Aplican T&C. Imágenes referenciales.</div>
		</div>
	</div>
</div>
