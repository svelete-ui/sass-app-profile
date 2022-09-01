<script>
  let list = ['item0','item1'];
  function add() { list = [...list,'item'+list.length] }
  function del() { list = list.slice(0,-1) }
</script>

### My items

{#each list as item}
* {item}
{/each}

<button on:click={add}>Add Item</button>
<button on:click={del}>Del Item</button>