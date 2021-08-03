<script>
  import Todo from "./Todo.svelte"
  import { autofocus } from '../stores/globalStore.js'
  import { todos } from '../stores/todosStore.js'

  let newTodoInputFocused = false
  let newTodoInput
  $: totalTodos = $todos.length
  let newTodoText = ""
  $: newTodoId = totalTodos ? Math.max(...$todos.map(t => t.id)) + 1 : 1

  function focusNewTodoInput(){
    if ($autofocus) {
      newTodoInput.focus()
      newTodoInputFocused = true
    }
  }
  window.onkeydown = focusNewTodoInput

  function newTodo() {
    $todos = [...$todos, { id: newTodoId, text: newTodoText }]
    cancelNewTodo()
  }

  function cancelNewTodo() {
    newTodoInput.blur()
    newTodoText = ""
    newTodoInputFocused = false
  }

  function deleteTodo(todo) {
    $todos = $todos.filter(t => t.id !== todo.id)
  }

  function updateTodos(todo) {
    const i = $todos.findIndex(t => t.id === todo.id)
    $todos[i] = { ...$todos[i], ...todo }
    $autofocus = true
  }
</script>

<ul>
  {#each $todos as todo (todo.id)}
    <Todo {todo}
      on:delete={e => deleteTodo(e.detail)}
      on:update={e => updateTodos(e.detail)}
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
