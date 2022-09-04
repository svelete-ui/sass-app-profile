<script lang="ts">
	import UiContainer from '$lib/components/UI/UiContainer.svelte';
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400&display=swap" rel="stylesheet">
</svelte:head>

<h1 class="neonText">c4 model UI</h1>



<UiContainer/>

<style type="scss">
	@import '../../styles/global-vars.scss';
	@import '../../styles/common.scss';
	@import '../../styles/mixins.scss';

	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	:global(body) {

		padding-left: 100px;
		overflow: hidden;
		background: linear-gradient(
			-45deg,
			$highlight-bright,
			$highlight-dark,
			$second-bright,
			$second-dark
		);
		background-size: 400% 400%;
		height: 100vh;
		animation: gradient 15s ease infinite;
		// font-family: "Vibur", sans-serif;
		font-family: 'Noto Sans', sans-serif;

		// font-size: 18px;
	}
	h1{
		font-size: 72px;
	}
</style>
