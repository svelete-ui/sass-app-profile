<script>
	// todo points array --> if from side to top/bottom of other container box
	// TODO: types folder with point and ccontainer type --> inputs/outputs/ layer etc
	let points = [];
</script>

<div class="myarrow">
	<span class="arrow left" />
	<span class="line" />
	<span class="arrow right" />
</div>



<style type="scss">
	.myarrow {
		position: absolute;
		top: 0;
		bottom: 0;
		transform: rotate(90deg);
	}
	.line {
		border-right: 0.05rem dashed red;
		display: inline-block;
		height: 5rem; // actual length
	}
	.arrow {
		position: absolute;
		top: -0.3rem;
		bottom: 0;
		height: 1rem;
		border-right: 0.2rem solid red;
		display: inline-block;
	}
	.right {
		left: 0.05rem;
		transform: rotate(-45deg);
	}
	.left {
		right: 0.05rem;
		transform: rotate(45deg);
	}
</style>
