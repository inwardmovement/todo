<script>
  export let todos = []

  $: totalTodos = todos.length
  let newTodoText = ''
  $: newTodoId = totalTodos ? Math.max(...todos.map(t => t.id)) + 1 : 1

  function deleteTodo(todo) {
    todos = todos.filter(t => t.id !== todo.id)
  }

  function addTodo() {
    todos = [...todos, { id: newTodoId, text: newTodoText }]
    newTodoText = ''
  }
</script>

<ul>
  {#each todos as todo (todo.id)}
    <li id="todo-{todo.id}" on:click={() => deleteTodo(todo)}>{todo.text}</li>
  {/each}
</ul>

<form on:submit|preventDefault={addTodo}>
  <input bind:value={newTodoText} type="text" id="newTodoInput" />
</form>
