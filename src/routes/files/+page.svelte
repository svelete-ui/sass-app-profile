<script>
	import Folder from '$lib/components/filesystem/Folder.svelte';


	let root = [
		{
			name: 'Important work stuff',
			files: [
				{ name: 'quarterly-results.xlsx' }
			]
		},
		{
			name: 'Animal GIFs',
			files: [
				{
					name: 'Dogs',
					files: [
						{ name: 'treadmill.gif' },
						{ name: 'rope-jumping.gif' }
					]
				},
				{
					name: 'Goats',
					files: [
						{ name: 'parkour.gif' },
						{ name: 'rampage.gif' }
					]
				},
				{ name: 'cat-roomba.gif' },
				{ name: 'duck-shuffle.gif' },
				{ name: 'monkey-on-a-pig.gif' }
			]
		},
		{ name: 'TODO.md' }
	];
</script>

<Folder name="Home" files={root} expanded/>

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
