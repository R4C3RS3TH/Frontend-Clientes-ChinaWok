<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import '../app.css';
	import { onMount } from 'svelte';
	import { WebSocketService } from '$lib/services/websocket';
	import { handleNotification } from '$lib/stores/socket';
	import { PUBLIC_WEBSOCKET_URL } from '$env/static/public';

	onMount(() => {
		const wsService = WebSocketService.getInstance();
		wsService.setMessageHandler(handleNotification);

		wsService.connect(PUBLIC_WEBSOCKET_URL);

		return () => {
			wsService.close();
		};
	});
</script>

<Navbar />

<Toast />

<main>
	<slot />
</main>

<Footer />
