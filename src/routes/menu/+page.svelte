<script lang="ts">
	import MenuCard from '$lib/components/MenuCard.svelte';
	import MenuFilter from '$lib/components/MenuFilter.svelte';
	import { inventoryStore } from '$lib/stores';
	import { InventoryService } from '$lib/services/inventory';
	import { onMount } from 'svelte';

	let activeCategory = 'Todos';
	let products: any[] = [];
	let categories: string[] = ['Todos'];

	onMount(() => {
		const inventoryService = InventoryService.getInstance();
		inventoryService.initialize();
		// Request different types of products if needed, or just default
		// Request different types of products
		inventoryService.requestInventory('PLATO', 50);
		inventoryService.requestInventory('BEBIDA', 20);
		inventoryService.requestInventory('COMPLEMENTO', 20);
		inventoryService.requestInventory('PROMOCION', 20);
	});

	// Helper to safely get value from DynamoDB style or plain object
	function getValue(field: any): any {
		if (field === undefined || field === null) return undefined;
		if (typeof field === 'object' && 'S' in field) return field.S;
		if (typeof field === 'object' && 'N' in field) return field.N;
		return field;
	}

	// Transform inventory store data to products array
	$: {
		const items = Object.values($inventoryStore);
		products = items.map((item: any) => {
			const sk =
				getValue(item.sk) || getValue(item.sku) || getValue(item.SK) || getValue(item.producto_id);
			const pk =
				getValue(item.pk) ||
				getValue(item.tenantId) ||
				getValue(item.PK) ||
				getValue(item.tenant_id);
			const name = getValue(item.name) || getValue(item.nombre);
			const description = getValue(item.description) || getValue(item.descripcion);
			const price = getValue(item.price) || getValue(item.precio);
			const img = getValue(item.img) || getValue(item.imagenUrl);
			const type = getValue(item.productType) || getValue(item.category) || getValue(item.tipo_id);
			const stockVal = getValue(item.stock);

			return {
				id: `${pk}_${sk}` || Math.random().toString(),
				nombre: name || 'Producto sin nombre',
				descripcion: description || '',
				precio: price ? parseFloat(price) : 0,
				precioAnterior: undefined,
				descuento: undefined,
				imagenUrl: img || '/placeholder_food.png',
				category: mapCategory(type),
				sku: sk,
				tenantId: pk,
				stock: stockVal ? parseInt(stockVal) : 0
			};
		});

		// Extract unique categories from products
		const uniqueCategories = new Set(products.map((p) => p.category));
		categories = ['Todos', ...Array.from(uniqueCategories)];
	}

	function mapCategory(type: string | undefined): string {
		if (!type) return 'Otros';
		switch (type) {
			case 'PLATO': // Handle the new type from backend
			case 'PLATO_FONDO':
				return 'Clásicos';
			case 'BEBIDA':
				return 'Bebidas';
			case 'COMPLEMENTO':
				return 'Complementos';
			case 'PROMOCION':
				return 'Promociones';
			default:
				return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase().replace('_', ' ');
		}
	}

	function handleCategorySelect(category: string) {
		activeCategory = category;
	}

	$: filteredProducts =
		activeCategory === 'Todos' ? products : products.filter((p) => p.category === activeCategory);
</script>

<div class="container mx-auto px-4 py-8">
	<!-- Secondary Navigation -->
	<!-- Secondary Navigation -->
	<div class="mb-8 border-b-2 border-gray-200">
		<nav class="-mb-0.5 flex space-x-6 overflow-x-auto pb-4" aria-label="Tabs">
			{#each categories as tab}
				<button
					on:click={() => handleCategorySelect(tab)}
					class="rounded-full border px-4 py-1.5 text-base font-bold whitespace-nowrap transition-all"
					class:bg-green-50={activeCategory === tab}
					class:text-green-700={activeCategory === tab}
					class:border-green-600={activeCategory === tab}
					class:text-gray-800={activeCategory !== tab}
					class:hover:text-green-600={activeCategory !== tab}
					class:border-transparent={activeCategory !== tab}
				>
					{tab}
				</button>
			{/each}
		</nav>
	</div>

	<!-- Section Title -->
	<div class="mb-6 flex items-baseline gap-4">
		<h1 class="text-3xl font-bold text-gray-900">Promociones</h1>
		<button class="text-sm font-medium text-green-600 hover:text-green-500">Ver todo</button>
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
				stock={product.stock}
			/>
		{/each}
	</div>
</div>
