<script lang="ts">
	import MenuCard from '$lib/components/MenuCard.svelte';
	import MenuFilter from '$lib/components/MenuFilter.svelte';

	let activeCategory = 'Todos';

	const categories = [
		'Todos',
		'Para compartir',
		'Personales',
		'Familiares',
		'Días Encájate',
		'Chijaukay A lo Pobre'
	];

	const products = [
		{
			id: 1,
			nombre: 'ChinaWeek para Dos',
			descripcion: '2 Encájate a Elección + 2 Gaseosas de 500ml',
			precio: 22.9,
			precioAnterior: 38.8,
			descuento: 40,
			imagenUrl:
				'https://www.chinawok.com.pe/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/c/h/chinaweek-para-dos-web_1.jpg',
			category: 'Para compartir'
		},
		{
			id: 2,
			nombre: 'ChinaWeek Sabor al Wok',
			descripcion: '2 Sabor al Wok a Elección',
			precio: 29.9,
			precioAnterior: 49.9,
			descuento: 40,
			imagenUrl:
				'https://www.chinawok.com.pe/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/c/h/chinaweek-sabor-al-wok-web_1.jpg',
			category: 'Para compartir'
		},
		{
			id: 3,
			nombre: 'ChinaWeek Trio Encájate',
			descripcion: '3 Encájate a Elección + 1 Gaseosa de 1Lt',
			precio: 32.9,
			precioAnterior: 54.9,
			descuento: 40,
			imagenUrl:
				'https://www.chinawok.com.pe/media/catalog/product/cache/1/small_image/295x/040ec	09b1e35df139433887a97daa66f/c/h/chinaweek-trio-encajate-web_1.jpg',
			category: 'Familiares'
		},
		{
			id: 4,
			nombre: 'ChinaWeek Banquetazo',
			descripcion:
				'2 Arroz Chaufa de Pollo + 1 Tallarín Taypa + 1 Medio Potaje a Elección + 1 Gaseosa de 1Lt',
			precio: 44.9,
			precioAnterior: 89.9,
			descuento: 50,
			imagenUrl:
				'https://www.chinawok.com.pe/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/c/h/chinaweek-banquetazo-web_1.jpg',
			category: 'Familiares'
		},
		{
			id: 5,
			nombre: 'Banquete para 4',
			descripcion:
				'2 Arroz Chaufa de Pollo + 2 Medio Potaje a Elección (Tipakay, Chijaukay, Pollo con Verduras, Pollo con Tamarindo) + 1 Gaseosa de 1.5Lt',
			precio: 49.9,
			imagenUrl:
				'https://www.chinawok.com.pe/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/b/a/banquete-para-4-web_1.jpg',
			category: 'Familiares'
		},
		{
			id: 6,
			nombre: 'Dúo Clásico al Wok',
			descripcion: '2 Aeropuertos de Pollo + 2 Wantanes Fritos',
			precio: 21.9,
			imagenUrl:
				'https://www.chinawok.com.pe/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/d/u/duo-clasico-al-wok-web_1.jpg',
			category: 'Para compartir'
		},
		{
			id: 7,
			nombre: 'Banquete para 5',
			descripcion: '3 Arroz Chaufa de Pollo + 2 Tallarin Saltado de Pollo + 1 Gaseosa 1.5L',
			precio: 59.9,
			imagenUrl:
				'https://www.chinawok.com.pe/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/b/a/banquete-para-5-web_1.jpg',
			category: 'Familiares'
		},
		{
			id: 8,
			nombre: 'Promo Dúo Sopa al Wok',
			descripcion: '2 Sopas Wontan + 2 Bebidas',
			precio: 19.9,
			imagenUrl:
				'https://www.chinawok.com.pe/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/p/r/promo-duo-sopa-al-wok-web_1.jpg',
			category: 'Para compartir'
		}
	];

	function handleCategorySelect(category: string) {
		activeCategory = category;
	}

	$: filteredProducts =
		activeCategory === 'Todos' ? products : products.filter((p) => p.category === activeCategory);
</script>

<div class="container mx-auto px-4 py-8">
	<!-- Secondary Navigation -->
	<div class="mb-8 border-b-2 border-gray-200">
		<nav class="-mb-0.5 flex space-x-6 overflow-x-auto pb-4" aria-label="Tabs">
			{#each ['Promociones', 'Combos Personales', 'Clásicos', 'Sabor Al Wok', 'A lo Pobre', 'Mostrazo Chinawok', 'Familiar', 'Complementos', 'Bebidas'] as tab}
				<a
					href="#"
					class="px-4 py-1.5 text-base font-bold whitespace-nowrap transition-all"
					class:bg-green-50={tab === 'Promociones'}
					class:text-green-700={tab === 'Promociones'}
					class:border={tab === 'Promociones'}
					class:border-green-600={tab === 'Promociones'}
					class:rounded-full={tab === 'Promociones'}
					class:text-gray-800={tab !== 'Promociones'}
					class:hover:text-green-600={tab !== 'Promociones'}
				>
					{tab}
				</a>
			{/each}
		</nav>
	</div>

	<!-- Section Title -->
	<div class="mb-6 flex items-baseline gap-4">
		<h1 class="text-3xl font-bold text-gray-900">Promociones</h1>
		<a href="#" class="text-sm font-medium text-green-600 hover:text-green-500">Ver todo</a>
	</div>

	<!-- Filters -->
	<MenuFilter {categories} {activeCategory} onSelect={handleCategorySelect} />

	<!-- Grid -->
	<div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each filteredProducts as product (product.id)}
			<MenuCard
				nombre={product.nombre}
				descripcion={product.descripcion}
				precio={product.precio}
				precioAnterior={product.precioAnterior}
				descuento={product.descuento}
				imagenUrl={product.imagenUrl}
			/>
		{/each}
	</div>
</div>
