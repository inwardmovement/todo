<script>
  export let todos = []

  $: totalTodos = todos.length
  let newTodo = ''
  $: newTodoId = totalTodos ? Math.max(...todos.map(t => t.id)) + 1 : 1

  function removeTodo(todo) {
      todos = todos.filter(t => t.id !== todo.id)
    }

  function addTodo() {
    todos = [...todos, { id: newTodoId, name: newTodo }]
    newTodo = ''
  }
</script>

<ul>
  {#each todos as todo (todo.id)}
    <li id="todo-{todo.id}" on:click={() => removeTodo(todo)}>{todo.name}</li>
  {/each}
</ul>

<form on:submit|preventDefault={addTodo}>
  <input bind:value={newTodo} type="text" id="todo-new" />
</form>
