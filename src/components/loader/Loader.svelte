<script lang="ts">
	import { loader } from '$lib/stores/loadStateStore';

	$: if ($loader.status === 'NAVIGATING') {
		setTimeout(() => {
			if ($loader.status === 'NAVIGATING') {
				$loader.status = 'LOADING';
			}
		}, 200);
	}
</script>

{#if $loader.status === 'LOADING'}
	<div />
	{#if $loader.message}
		<p>{$loader.message}</p>
	{/if}
{/if}

<style>
	div {
		--size: 100px;
		position: fixed;
		top: 0;
		left: 0;
		inset: calc(50% - calc(var(--size) / 2));
		background: purple;
		border-radius: var(--size);
		height: var(--size);
		width: var(--size);
		animation: moveLoader 1s infinite alternate;
	}

	@keyframes moveLoader {
		from {
			transform: translate3d(100px, 0, 0);
		}
		to {
			transform: translate3d(-100px, 0, 0);
		}
	}
</style>
