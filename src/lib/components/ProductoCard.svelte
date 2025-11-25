<script lang="ts">
	// 1. Las 'props' que este componente espera
	export let nombre: string = 'Nombre del Plato';
	export let precio: number = 0.0;
	export let imagenUrl: string = 'https://via.placeholder.com/300';
	export let descripcion: string = 'Descripción corta del plato...';
</script>

<div
	class="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
>
	<!-- Imagen del producto -->
	<div class="relative h-48 w-full overflow-hidden bg-gray-200">
		<img
			class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
			src={imagenUrl}
			alt="Imagen de {nombre}"
		/>
		<!-- Overlay al hover -->
		<div
			class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		></div>
	</div>

	<!-- Contenido -->
	<div class="p-4">
		<h3 class="mb-2 text-lg font-bold text-gray-800 line-clamp-1">{nombre}</h3>
		<p class="mb-4 line-clamp-2 text-sm text-gray-600">{descripcion}</p>

		<!-- Precio y botón -->
		<div class="flex items-center justify-between">
			<div class="flex flex-col">
				<span class="text-2xl font-bold text-red-600">S/ {precio.toFixed(2)}</span>
			</div>
			<button
				class="rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white transition-all hover:bg-green-700 hover:shadow-md active:scale-95"
			>
				Agregar
			</button>
		</div>
	</div>
</div>