<script lang="ts">
	import { marked } from 'marked';
	import SvelteMarkdown from 'svelte-markdown';

	export let id: string;
	export let title: string;
	export let context: string = '';
	let description = `### This is a header

This is a paragraph.

| And this is | A table |
|-------------|---------|
| With two    | columns |
| With two    | columns |

`;

	export let element;
	export let initX = '';
	export let initY = '';

	let viewMarkdown = false;

	let width = '250';
	let height = '150';

	let left: number = isNaN(parseInt(initX)) ? 0 : parseInt(initX);
	let top: number = isNaN(parseInt(initY)) ? 0 : parseInt(initY);


	export function dragMe(node) {
		let moving = false;

		// node.style.position = 'absolute';
		node.style.top = `${top}px`;
		node.style.left = `${left}px`;
		node.style.cursor = 'move';
		node.style.userSelect = 'none';

		node.addEventListener('mousedown', () => {
			moving = true;
		});

		window.addEventListener('mousemove', (e) => {
			if (moving) {
				// node.style.position = 'absolute';
				top += e.movementY;
				left += e.movementX;
				node.style.top = `${top}px`;
				node.style.left = `${left}px`;
			}
		});

		window.addEventListener('mouseup', () => {
			moving = false;
		});
	}
</script>

<!-- {@html marked(title)} -->
<div class="wrapper" use:dragMe style="--width-px: {width}px;--height-px: {height}px">
	<h1 id="header-context-path">{context}/{title}</h1>
	<div {id} class="objects" bind:this={element} data-init-x="0" data-init-y="0">
		{#if viewMarkdown}
			<SvelteMarkdown source={description} />

			<!-- {@html marked(description)} -->
		{:else}
			<textarea bind:value={description} />
		{/if}
	</div>
	<div class="debug">
		<p>Object {id}</p>
		<p><span>left: </span><input bind:value={left} readonly /></p>
		<p><span>top: </span><input bind:value={top} readonly /></p>
		<p><span>width: </span><span contenteditable="true" bind:innerHTML={width} /></p>
		<p><span>height: </span><span contenteditable="true" bind:innerHTML={height} /></p>
		<label class="switch">
			<input type="checkbox" checked>
			<span class="slider"></span>
		  </label><br><br>
	</div>
</div>

<!-- width/height: {width}/{height} -->
<style type="scss">
	#header-context-path {
		position: relative;
		width: auto;
		margin-block-start: 0em;
		margin-block-end: 0em;
	}

	@mixin flex-mixin($align: center) {
		align-items: $align;
		display: flex;
		flex-direction: column;
	}

	.objects {
		@include flex-mixin(center);
		background-color: #a7a7a780;
		border: solid 1px grey;
		z-index: 1000;
		width: var(--width-px);
		height: var(--height-px);
		padding: 8px;
		font-size: 18px;
		text-align: center;
		box-shadow: 2px 2px 2px #999;
		cursor: move;
		position: relative;
		padding: 10px;
		overflow: auto;
		overflow-x: hidden;

		textarea {
			height: max-content;
			width: 100%;
			height: 100%;
		}
	}
	.debug {
		position: relative;
	}
	p {
		margin-block-start: 0em;
		margin-block-end: 0em;
	}
	.wrapper {
		position: absolute;
	}
</style>
