<script lang="ts">
    import { toastStore } from '$lib/stores/index';
    import { fade, fly } from 'svelte/transition';

    let toast: { message: string; type: 'info' | 'success' | 'warning' | 'error' } | null = null;

    toastStore.subscribe(value => {
        toast = value;
    });

    function getBackgroundColor(type: string) {
        switch (type) {
            case 'success': return 'bg-green-500';
            case 'error': return 'bg-red-500';
            case 'warning': return 'bg-yellow-500';
            default: return 'bg-blue-500';
        }
    }
</script>

{#if toast}
    <div 
        class="fixed top-4 right-4 z-50 px-6 py-3 rounded shadow-lg text-white {getBackgroundColor(toast.type)}"
        in:fly="{{ y: -20, duration: 300 }}"
        out:fade
    >
        {toast.message}
    </div>
{/if}
