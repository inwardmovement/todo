<script>
  import { createEventDispatcher } from 'svelte'

  export let todo

  const dispatch = createEventDispatcher()

  function deleteTodo() {
    dispatch('delete', todo)
  }
</script>

<li id="todo-{todo.id}" on:click={deleteTodo} >
  <span>{todo.text}</span>
</li>

<style lang="scss">
  li {
    list-style-type: none;
    min-height: 1.5em;
    padding-left: .5em;

    &:hover {
      color: #0d6efd;
    }
  }
</style>
