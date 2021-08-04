<script>
  import Todo from "./Todo.svelte"
  import { onMount } from 'svelte'
  import sortable from 'sortablejs'

  let todos = [
    { id: 1, text: "task1" },
    { id: 2, text: "task2" },
    { id: 3, text: "task3" }
  ]

  let newTodoInputFocused = false
  let newTodoInput
  let ul
  $: totalTodos = todos.length
  let newTodoText = ""
  $: newTodoId = totalTodos ? Math.max(...todos.map(t => t.id)) + 1 : 1

  onMount(() => {
    sortable.create(ul)
  })

  function focusNewTodoInput(){
    newTodoInput.focus()
    newTodoInputFocused = true
  }
  window.onkeydown = focusNewTodoInput

  function newTodo() {
    todos = [...todos, { id: newTodoId, text: newTodoText }]
    cancelNewTodo()
  }

  function cancelNewTodo() {
    newTodoInput.blur()
    newTodoText = ""
    newTodoInputFocused = false
  }

  function deleteTodo(todo) {
    todos = todos.filter(t => t.id !== todo.id)
  }
</script>

<ul bind:this={ul}>
  {#each todos as todo (todo.id)}
    <Todo {todo}
      on:delete={e => deleteTodo(e.detail)}
    />
  {/each}
</ul>

<form on:submit|preventDefault={newTodo} on:keydown={e => e.key === 'Escape' && cancelNewTodo()}>
  <input bind:value={newTodoText} bind:this={newTodoInput} type="text" id="newTodoInput" autoComplete="off" on:blur={cancelNewTodo} class:hidden={!newTodoInputFocused} />
</form>

<style lang="scss">
  ul {
    margin: 0;
    padding: 0;
    padding-bottom: 1.5rem;
  }

  #newTodoInput {
    padding-left: .25rem;
    position: fixed;
    bottom: 0;
  }

  .hidden {
    background-color: transparent !important;
    pointer-events: none;
  }
</style>
