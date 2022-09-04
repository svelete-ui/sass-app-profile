<script lang="ts">
	import cross_icon from '../../../assets/icons/cross-icon.svg';
	import expand_container_icon from '../../../assets/icons/expand-container-icon.svg';
	import collapse_container_icon from '../../../assets/icons/collapse-container-icon.svg';
	import edit_pen_icon from '../../../assets/icons/edit-pen-icon.svg';
	import { dndzone, SOURCES, TRIGGERS	 } from 'svelte-dnd-action';

	let dragDisabled = true;
	let ui_document_container;

	export let left = 0;
	export let top = 0;
	
	let moving = false;
	
	function onMouseDown(e) {
		moving = true;
		console.log("moving",{e});
		
	}

</script>

<div class="ui-container" />
<div
	class="ui-document-container"
	on:mousedown={onMouseDown}
	bind:this="{ui_document_container}"
>
	<div class="interface-header" style="--logo-color: blue">
		<!-- close icon start -->
		<div class="" />
		<!-- close icon end -->

		<div class="push flex">
			<img style="fill: var(--logo-color)" src={edit_pen_icon} class="square_icon" alt="edit" />
		</div>
		<div class="">
			<img
				style="fill: var(--logo-color)"
				src={collapse_container_icon}
				class="square_icon"
				alt="collapse"
			/>
		</div>
		<div class="">
			<img
				style="fill: var(--logo-color)"
				src={expand_container_icon}
				class="square_icon"
				alt="expand"
			/>
		</div>
	</div>
	<div class="interface-content">
		<span>
			<h1>Web-Frontend</h1>
			<h2>Sveltekit App</h2>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam doloribus harum consectetur fuga
			fugit veniam aperiam rem veritatis, assumenda voluptatem reiciendis libero, inventore beatae? Distinctio
			tempore repudiandae quibusdam sapiente illum.</span
		>
	</div>
</div>

<style type="scss">
	@import '../../../styles/global-vars.scss';
	@import '../../../styles/common.scss';
	@import '../../../styles/mixins.scss';

	.square_icon {
		@include icon-mixin($icon-background, $background-dark, $icon-size, 50);
	}

	.ui-container {
		position: absolute;
		@include flex-mixin(flex-start);
	}
	.ui-document-container {
		@include flex-mixin(flex-start);

		width: 500px; //TODO: var(--document-width) --> make it resizeable
		height: 250px;

		padding: 5px;
		border: solid 1px $background-dark;
		box-shadow: 2px 2px 2px $background-dark;
		@include border-radius(2px);

		background-color: rgba($background-dark, 0.4);
		// Dots:
	}
	.interface-header {
		@include flex-mixin(flex-start, row);
		gap: 5px;
		width: 100%;
	}
	.interface-content {
		@include border-radius(2px);
		color: $background-dark;
		padding: 20px;
		background-color: rgba(white, 0.95);
		border: solid 1px $background-dark;
		width: auto;
		overflow: auto;
		overflow-x: hidden;

		& h1 {
			border-bottom: #212121 solid;
			margin-block-start: 0em;
			margin-block-end: 0em;
		}
		& h2 {
			margin-block-start: 0em;
			margin-block-end: 0.5em;
		}
	}
</style>
