<script>
  import Todo from "./Todo.svelte"

  export let todos = []

  $: totalTodos = todos.length
  let editingNewTodo = false
  let newTodoText = ""
  $: newTodoId = totalTodos ? Math.max(...todos.map(t => t.id)) + 1 : 1
  let editingTodo = false
  console.log('autofocus ON')

  function inputFocus(){
    if (!editingTodo) {
      document.getElementById("newTodoInput").focus()
    }
  }
  window.onkeydown = inputFocus

  function deleteTodo(todo) {
    todos = todos.filter(t => t.id !== todo.id)
  }

  function newTodo() {
    todos = [...todos, { id: newTodoId, text: newTodoText }]
    onCancel()
  }

  function updateTodos(todo) {
    const i = todos.findIndex(t => t.id === todo.id)
    todos[i] = { ...todos[i], ...todo }
    editingTodo = false
    console.log('autofocus ON')
  }

  function onCancel() {
    newTodoText = ""
    editingNewTodo = false
  }

  function onEditingTodo() {
    editingTodo = true
    console.log('autofocus OFF')
  }

  function onCancelEditingTodo() {
    editingTodo = false
    console.log('autofocus ON')
  }
</script>

<ul>
  {#each todos as todo (todo.id)}
    <Todo {todo}
      on:delete={e => deleteTodo(e.detail)}
      on:editingTodo={e => onEditingTodo(e.detail)}
      on:cancel={e => onCancelEditingTodo(e.detail)}
      on:update={e => updateTodos(e.detail)}
    />
  {/each}
</ul>

<form on:submit|preventDefault={newTodo} on:keydown={e => e.key === 'Escape' && onCancel()}>
  <input bind:value={newTodoText} type="text" id="newTodoInput" autoComplete="off" on:blur={onCancel} class:hidden={!editingNewTodo} />
</form>
