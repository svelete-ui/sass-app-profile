<!-- 
TODOS:
- sanitize: https://svelte.dev/repl/29769379eb7144fba879a9737c5f96f5?version=3.49.0
-   import SvelteMarkdown from 'svelte-markdown';

- https://magidoc.js.org/svelte-plugins/marked
-->
<script lang="ts">
	import Markdown from '@magidoc/plugin-svelte-marked';
	import MarkdownHeading from '../Markdown/MarkdownHeading.svelte';
	import MarkdownCode from '../Markdown/Code/MarkdownCode.svelte';

	const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

	export let debug: boolean = false;
	export let id: string;
	export let title: string;
	export let context: string = '';
	export let description = ``;
	export let cellSize: number = 10;

	description = description ?? '';

	export let element;
	export let initX = '';
	export let initY = '';

	const tolerance = 7;

	let viewMarkdown = false;

	let width = '250';
	let height = '150';

	let left: number = isNaN(parseInt(initX)) ? 0 : parseInt(initX);
	let top: number = isNaN(parseInt(initY)) ? 0 : parseInt(initY);

	let moving = false;

	$: display_preview = moving ? 'flex' : 'none';

	$: left_suggest = moving
		? clamp(
				left % cellSize,
				Math.floor(left / cellSize) * cellSize,
				Math.ceil(left / cellSize) * cellSize + cellSize
		  )
		: left;
	$: top_suggest = moving
		? clamp(
				top % cellSize,
				Math.floor(top / cellSize) * cellSize,
				Math.ceil(top / cellSize) * cellSize + cellSize
		  )
		: top;

	export function dragMe(node) {
		// node.style.position = 'absolute';
		node.style.top = `${top}px`;
		node.style.left = `${left}px`;
		node.style.cursor = 'move';
		node.style.userSelect = 'none';

		node.addEventListener('mousedown', (e) => {
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
			if (moving) {
				// let restTop = top % cellSize;
				// let restLeft = left % cellSize;
				// let divCountTop = Math.floor(top / cellSize);
				// let divCountLeft = Math.floor(left / cellSize);

				left = left_suggest;
				top = top_suggest;
				node.style.top = `${top}px`;
				node.style.left = `${left}px`;
				moving = false;
			}
		});
	}
</script>

<div
	class="suggestion"
	style="left: {left_suggest}px;top:{top_suggest}px;position: absolute;background-color: gray;width: {width}px;display:{display_preview};height: {parseInt(
		height
	) + parseInt(cellSize)}px;"
>
	test-descriptions
</div>

<!-- {@html marked(title)} -->
<!-- <h1 id="header-context-path">{context}/{title}</h1> -->
<div class="wrapper" use:dragMe style="--width-px: {width}px;--height-px: {height}px">
	<div {id} class="objects" bind:this={element} data-init-x="0" data-init-y="0">
		{#if viewMarkdown}
			<div class="markdown-div">
				<Markdown
					source={description}
					renderers={{
						heading: MarkdownHeading,
						code: MarkdownCode
					}}
				/>
			</div>
		{:else}
			<textarea bind:value={description} />
		{/if}
	</div>
	<div class="{debug ? "debug" :"hide"}">
		<p>Object {id}</p>
		<p><span>left: </span><input bind:value={left} readonly /></p>
		<p><span>top: </span><input bind:value={top} readonly /></p>
		<p><span>width: </span><span contenteditable="true" bind:innerHTML={width} /></p>
		<p><span>height: </span><span contenteditable="true" bind:innerHTML={height} /></p>
		<label class="switch">
			<input type="checkbox" bind:checked={viewMarkdown} />
			<span class="slider" />
		</label><br /><br />
	</div>
</div>

<!-- width/height: {width}/{height} -->
<style type="scss">
	@import "../../../styles/mixins.scss";
	.markdown-div {
		@include flex-mixin(flex-start);
		margin-block-start: 0em;
		margin-block-end: 0em;
		background-color: rgb(234, 234, 234);
		padding: 5px;
		width: 100%;
		@include border-radius(2px);
	}

	#header-context-path {
		position: relative;
		width: auto;
		margin-block-start: 0em;
		margin-block-end: 0em;
	}

	.suggestion{
		@include border-radius(5px);
		opacity: 0.5;
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
		display: flex;
	}
	.hide {
		display: none;
	}
	p {
		margin-block-start: 0em;
		margin-block-end: 0em;
	}
	.wrapper {
		z-index: 100;
		position: absolute;
	}
</style>
