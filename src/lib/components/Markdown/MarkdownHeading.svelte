<script lang="ts">
	import { generatePathSegment } from '$lib/markdown/url';

	import type { marked } from 'marked';
	import type { MarkdownOptions, Renderers } from '$lib/markdown/markedConfiguration';

	const walkTokens = (token) => {
		if (token.type === 'heading') {
			token.depth += 1;
		}
	};

	export let token: marked.Tokens.Heading;
	export let options: MarkdownOptions;
	export const renderers: Renderers = undefined;

	let id: string | undefined;
	$: id = generatePathSegment(token.text, options.slugger);
</script>

<svelte:element this={`h${token.depth}`} {id} class="custom-margin" style="{token.depth === 1 ?
 "font-size: 14px; border-bottom: 1px solid;": "font-size: 12px;"}"
 >
	<slot />
</svelte:element>

<style type="scss">
	.custom-margin {
		margin-block-start: 0em;
		margin-block-end: 0em;
		clear: left;
		text-align: left;

	}
</style>
