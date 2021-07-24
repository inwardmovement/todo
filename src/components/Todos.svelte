<script>
  import Todo from "./Todo.svelte"

  export let todos = []

  $: totalTodos = todos.length
  let editingNewTodo = false
  let newTodoText = ""
  $: newTodoId = totalTodos ? Math.max(...todos.map(t => t.id)) + 1 : 1

  function inputFocus(){
    if (!editingTodo) {
      editingNewTodo = true
      document.getElementById("newTodoInput").focus();
      console.log(editingNewTodo)
    }
  }
  window.onkeydown = inputFocus

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

  function onCancel() {
    newTodoText = ""
    editingNewTodo = false
    console.log(editingNewTodo)
  }

  // function onFocusTodo() {
  //   editingTodo = true
  //   console.log(editingTodo)
  // }

  // function onBlurTodo() {
  //   editingTodo = false
  //   console.log(editingTodo)
  // }
</script>

<ul>
  {#each todos as todo (todo.id)}
    <Todo {todo}
      on:delete={e => deleteTodo(e.detail)}
      on:edit={e => editTodo(e.detail)}

    />
  {/each}
</ul>

<form on:submit|preventDefault={newTodo} on:keydown={e => e.key === 'Escape' && onCancel()}>
  <input bind:value={newTodoText} type="text" id="newTodoInput" autoComplete="off" on:blur={onCancel} class:hidden={!editingNewTodo} />
</form>
