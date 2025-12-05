<script lang="ts">
	interface Locale {
		id: number;
		name: string;
		address: string;
		phone: string;
		hours: string;
		services: string[];
		mapLink: string;
		image: string;
	}

	const locales: Locale[] = [
		{
			id: 1,
			name: 'Chinawok Jockey Plaza',
			address: 'Av. Javier Prado Este 4200, Surco',
			phone: '(01) 612-8000',
			hours: 'Lun-Dom: 11:00 am - 10:00 pm',
			services: ['Delivery', 'Recojo en Tienda', 'Comedor'],
			mapLink: 'https://www.google.com/maps/search/?api=1&query=Chinawok+Jockey+Plaza',
			image:
				'https://lh5.googleusercontent.com/p/AF1QipN_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J/w408-h306-k-no' // Placeholder or generic
		},
		{
			id: 2,
			name: 'Chinawok Real Plaza Salaverry',
			address: 'Av. Gral. Salaverry 2370, Jesús María',
			phone: '(01) 612-8000',
			hours: 'Lun-Dom: 11:00 am - 10:00 pm',
			services: ['Delivery', 'Recojo en Tienda', 'Comedor'],
			mapLink: 'https://www.google.com/maps/search/?api=1&query=Chinawok+Real+Plaza+Salaverry',
			image:
				'https://lh5.googleusercontent.com/p/AF1QipN_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J/w408-h306-k-no'
		},
		{
			id: 3,
			name: 'Chinawok Plaza San Miguel',
			address: 'Av. La Marina 2000, San Miguel',
			phone: '(01) 612-8000',
			hours: 'Lun-Dom: 11:00 am - 10:30 pm',
			services: ['Delivery', 'Recojo en Tienda', 'Comedor'],
			mapLink: 'https://www.google.com/maps/search/?api=1&query=Chinawok+Plaza+San+Miguel',
			image:
				'https://lh5.googleusercontent.com/p/AF1QipN_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J/w408-h306-k-no'
		},
		{
			id: 4,
			name: 'Chinawok Megaplaza',
			address: 'Av. Alfredo Mendiola 3698, Independencia',
			phone: '(01) 612-8000',
			hours: 'Lun-Dom: 11:00 am - 10:00 pm',
			services: ['Delivery', 'Recojo en Tienda', 'Comedor'],
			mapLink: 'https://www.google.com/maps/search/?api=1&query=Chinawok+Megaplaza',
			image:
				'https://lh5.googleusercontent.com/p/AF1QipN_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J/w408-h306-k-no'
		},
		{
			id: 5,
			name: 'Chinawok Larcomar',
			address: 'Malecón de la Reserva 610, Miraflores',
			phone: '(01) 612-8000',
			hours: 'Lun-Dom: 11:00 am - 11:00 pm',
			services: ['Recojo en Tienda', 'Comedor'],
			mapLink: 'https://www.google.com/maps/search/?api=1&query=Chinawok+Larcomar',
			image:
				'https://lh5.googleusercontent.com/p/AF1QipN_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J/w408-h306-k-no'
		},
		{
			id: 6,
			name: 'Chinawok Mall del Sur',
			address: 'Av. Los Lirios 310, San Juan de Miraflores',
			phone: '(01) 612-8000',
			hours: 'Lun-Dom: 11:00 am - 10:00 pm',
			services: ['Delivery', 'Recojo en Tienda', 'Comedor'],
			mapLink: 'https://www.google.com/maps/search/?api=1&query=Chinawok+Mall+del+Sur',
			image:
				'https://lh5.googleusercontent.com/p/AF1QipN_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J_J/w408-h306-k-no'
		}
	];
</script>

<div class="min-h-screen bg-gray-50 py-8">
	<div class="container mx-auto px-4">
		<h1 class="mb-2 text-3xl font-bold text-gray-900">Nuestros Locales</h1>
		<p class="mb-8 text-gray-600">Encuentra tu Chinawok más cercano y disfruta del mejor sabor.</p>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each locales as locale}
				<div
					class="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
				>
					<!-- Map Placeholder / Image -->
					<div class="group relative h-48 bg-gray-200">
						<div
							class="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-12 w-12"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
								/>
							</svg>
						</div>
						<!-- Overlay with "Ver Mapa" button -->
						<a
							href={locale.mapLink}
							target="_blank"
							rel="noopener noreferrer"
							class="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors group-hover:bg-black/10 group-hover:opacity-100"
						>
							<span
								class="translate-y-2 transform rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-900 shadow-lg transition-all group-hover:translate-y-0"
							>
								Ver en Mapa
							</span>
						</a>
					</div>

					<div class="p-5">
						<h3 class="mb-3 text-xl font-bold text-gray-900">{locale.name}</h3>

						<div class="space-y-3 text-sm text-gray-600">
							<div class="flex items-start gap-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="mt-0.5 h-5 w-5 shrink-0 text-red-600"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
									/>
								</svg>
								<span>{locale.address}</span>
							</div>

							<div class="flex items-center gap-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-5 w-5 shrink-0 text-red-600"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
									/>
								</svg>
								<span>{locale.phone}</span>
							</div>

							<div class="flex items-center gap-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-5 w-5 shrink-0 text-red-600"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
								<span>{locale.hours}</span>
							</div>
						</div>

						<div class="mt-4 flex flex-wrap gap-2">
							{#each locale.services as service}
								<span
									class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset"
								>
									{service}
								</span>
							{/each}
						</div>

						<div class="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
							<span class="text-xs font-medium text-gray-500">Abierto ahora</span>
							<a
								href={locale.mapLink}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-1 text-sm font-bold text-red-600 hover:text-red-700"
							>
								Cómo llegar
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									class="h-4 w-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
									/>
								</svg>
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
