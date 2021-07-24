<script>
  import Todo from "./Todo.svelte"

  export let todos = []

  $: totalTodos = todos.length
  let newTodoText = ""
  $: newTodoId = totalTodos ? Math.max(...todos.map(t => t.id)) + 1 : 1

  function deleteTodo(todo) {
    todos = todos.filter(t => t.id !== todo.id)
  }

  function newTodo() {
    todos = [...todos, { id: newTodoId, text: newTodoText }]
    newTodoText = ""
  }

  function editTodo(todo) {
    const i = todos.findIndex(t => t.id === todo.id)
    todos[i] = { ...todos[i], ...todo }
  }
</script>

<ul>
  {#each todos as todo (todo.id)}
    <Todo {todo}
      on:delete={e => deleteTodo(e.detail)}
      on:edit={e => editTodo(e.detail)}
    />
  {/each}
</ul>

<form on:submit|preventDefault={newTodo}>
  <input bind:value={newTodoText} type="text" id="newTodoInput" />
</form>
