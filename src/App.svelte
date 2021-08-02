<script>
  import GlobalStylesReboot from "./components/globalStyles/GlobalStylesReboot.svelte"
  import GlobalStyles from "./components/globalStyles/GlobalStyles.svelte"
  import Todos from "./components/Todos.svelte"
  import { todos } from './stores.js'
</script>

<GlobalStylesReboot/>
<GlobalStyles/>
<Todos bind:todos={$todos} />
