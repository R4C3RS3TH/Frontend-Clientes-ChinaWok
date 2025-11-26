<script lang="ts">
	import TopNavbar from './TopNavbar.svelte';
	import BottomNavbar from './BottomNavbar.svelte';

	let carritoTotal = 0.0;
</script>

<TopNavbar {carritoTotal} />
<BottomNavbar />
