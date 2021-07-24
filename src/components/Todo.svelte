<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let todo

  let editingTodo = false
  let editTodoText = todo.text
  console.log('b 1 ' + editingTodo)

  function updateTodo(editedTodo) {
    todo = { ...todo, ...editedTodo }
    dispatch('update', todo)
  }

  function onCancel() {
    editTodoText = todo.text
    editingTodo = false
    console.log('b 2 ' + editingTodo)
  }

  function onSave() {
    updateTodo({ text: editTodoText })
    editingTodo = false
    console.log('b 3 ' + editingTodo)
  }

  function onDelete() {
    dispatch('delete', todo)
  }

  function onEdit() {
    editingTodo = true
    dispatch('editingTodo', todo)
    console.log('b 4 ' + editingTodo)
  }
</script>

{#if editingTodo}
  <form on:submit|preventDefault={onSave} on:keydown={e => e.key === 'Escape' && onCancel()}>
    <!-- svelte-ignore a11y-autofocus -->
    <input bind:value={editTodoText} type="text" id="todo-{todo.id}" autofocus onfocus="this.select()" autoComplete="off" on:blur={onCancel} />
  </form>
{:else}
  <li id="todo-{todo.id}" on:click={onDelete} on:contextmenu|preventDefault={onEdit} >{todo.text}</li>
{/if}

<div class="separator"></div>
