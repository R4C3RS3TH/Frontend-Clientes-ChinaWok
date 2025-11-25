<script lang="ts">
	export let categories: string[] = [];
	export let activeCategory: string = '';
	export let onSelect: (category: string) => void;
</script>

<div class="flex flex-wrap gap-2 py-4">
	{#each categories as category}
		<button
			class="rounded-full border px-4 py-1.5 text-sm font-medium transition-colors
            {activeCategory === category
				? 'border-green-600 bg-green-600 text-white'
				: 'border-green-600 text-green-600 hover:bg-green-50'}"
			on:click={() => onSelect(category)}
		>
			{category}
		</button>
	{/each}
</div>
