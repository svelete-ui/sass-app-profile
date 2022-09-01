<script lang="ts">
	import CContainer from '../lib/components/cccc/Ccontainer.svelte';
	var cellSize = 50;
	var objectSize = 150;
	var rows = 12;
	var cols = 18;
	var snap = 50;

	let objects = [
		{ el: null, id: 1, title: "Ele1",description: "i am a sample *description*"},
		{ el: null, id: 2, title: "Ele2" },
		{ el: null, id: 3, title: "Ele3" }
	];

	let dropped = [];
	let status = '';
	let dropped_in = '';
	let activeEvent = '';
	let originalX = '';
	let originalY = '';

	type cellObjectType = {
		x: number;
		y: number;
	};

	let cellArray: cellObjectType[] = [];

	for (let index = 0; index < rows * cols; index++) {
		let y = Math.floor(index / cols) * cellSize;
		let x = (index * cellSize) % (cols * cellSize);
		cellArray.push({ x, y });
	}

	function handleDragStart(e) {
		status = 'Dragging the element ' + e.target.getAttribute('id');
		e.dataTransfer.dropEffect = 'move';
		e.dataTransfer.setData('text', e.target.getAttribute('id'));
	}

	function handleDragEnd(e) {
		status = 'Dragging the element ' + e.target.getAttribute('id');
		// e.dataTransfer.dropEffect = 'move';
		// e.dataTransfer.setData('text', e.target.getAttribute('id'));
	}

	function handleTouchStart(e) {
		status = 'Touch start with element ' + e.target.getAttribute('id');
		originalX = e.target.offsetLeft - 10 + 'px';
		originalY = e.target.offsetTop - 10 + 'px';
		activeEvent = 'start';
	}

	function handleTouchMove(e) {
		let touchLocation = e.targetTouches[0];
		let pageX = Math.floor(touchLocation.pageX - 50) + 'px';
		let pageY = Math.floor(touchLocation.pageY - 50) + 'px';
		status = 'Touch x ' + pageX + ' Touch y ' + pageY;
		e.target.style.position = 'absolute';
		e.target.style.left = pageX;
		e.target.style.top = pageY;
		activeEvent = 'move';
	}

	function handleTouchEnd(e) {
		e.preventDefault();
		if (activeEvent === 'move') {
			let pageX = parseInt(e.target.style.left) - 50;
			let pageY = parseInt(e.target.style.top) - 50;

			e.target.style.left = originalX;
			e.target.style.top = originalY;
			status = 'You let the ' + e.target.getAttribute('id') + ' go.';
		}
	}
	// function onDrag() {
	// 	TweenLite.to(box, 0.5, {
	// 		x: Math.round(this.x / snap) * snap,
	// 		y: Math.round(this.y / snap) * snap,
	// 		ease: Back.easeOut.config(2)
	// 	});
	// }
	let color = '#ff3e00';
</script>

<h1><a href="https://github.com/svelete-ui/sass-grid-app-profile">github.com/svelete-ui/sass-grid-app-profile</a></h1>
<!-- <h1><a href="https://github.com/robenkleene/artboard">github.com/robenkleene/artboard</a></h1> -->
<!-- <div  style="position:relative;height:{height+1}px;width:{width+2}px;" class="artboard-overlay" /> -->

<!-- <div id="container" style="--cell-size-px: {cellSize}"> -->
<div id="container" style="--cell-size-px: {cellSize};">
	<!-- !dropped.includes(`${v.id}`) -->
	<!-- 
		
		draggable="true"
		on:dragstart={handleDragStart}
		on:touchstart={handleTouchStart}
		on:touchmove={handleTouchMove}
		on:touchend={handleTouchEnd}
		on:dragend={handleDragEnd}

			description="test"
 -->
	{#each objects.filter((v) => v) as { id }, i}
		<CContainer 
		bind:element={objects[i].el} 
		id={id.toString()} 
		title="{objects[i].title}" 
	 />
	{/each}

	{#each cellArray as cell}
		<div
			class="grid-cell"
			id="{cell.x}-{cell.y}"
			style="--cell-size-px: {[cellSize, 'px'].join('')}; top: {cell.y}px; left: {cell.x}px;"
		/>
	{/each}
</div>
<!-- style="top: {cell.y}px; left: {cell.x}px;width:{cellSize}px;height:{cellSize}px;" -->

<!-- for (var i = 0; i < rows * cols; i++) {
	var y = Math.floor(i / cols) * height;
	var x = (i * width) % (cols * width);
	$('<div grid-cell></div>').css({ top: y, left: x }).prependTo(container);
} -->

<h1>Status:{status}</h1>

<a href="https://svelte.dev/tutorial/svelte-window-bindings">svelte-window-bindings</a>
<a href="https://stackoverflow.com/questions/4191260/drawing-a-grid-using-css"
	>drawing-a-grid-using-css</a
>
<a href="https://greensock.com/forums/topic/11581-draggable-snap-to-grid-based-on-another-object/"
	>draggable-snap-to-grid-based-on-another-object</a
>

<style type="scss">

	$artboard-grid-px: 15px !default;
	$artboard-grid-color: rgba(0, 0, 0, 0.25) !default;
	$artboard-divider-interval: 15 !default;
	$artboard-divider-color: rgba(0, 0, 0, 0.5) !default;
	$artboard-overlay-opacity: 0.5 !default;
	body {
		margin: 0;
		padding: 100px;
		position: relative;
	}

	#container {
		height: 600px;
		width: 600px;
		position: relative;
	}

	.grid-cell {
		position: absolute;
		border: 1px solid rgb(190, 190, 190);
		z-index: -100;
		width: var(--cell-size-px);
		height: var(--cell-size-px);
	}
</style>
