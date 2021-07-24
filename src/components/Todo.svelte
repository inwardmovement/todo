<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let todo
  export let editingTodo = false

  let editTodoText = todo.text

  function editTodo(editedTodo) {
    todo = { ...todo, ...editedTodo }
    dispatch('edit', todo)
  }

  function onFocus() {
    dispatch('focusTodo')
  }

  function onCancel() {
    editTodoText = todo.text
    editingTodo = false
    // console.log(editingTodo)
  }

  function onSave() {
    editTodo({ text: editTodoText })
    dispatch('blurTodo')
    editingTodo = false
    // console.log(editingTodo)
  }

  function onDelete() {
    dispatch('delete', todo)
  }

  function onEdit() {
    editingTodo = true
    // console.log(editingTodo)
  }
</script>

{#if editingTodo}
  <form on:submit|preventDefault={onSave} on:keydown={e => e.key === 'Escape' && onCancel()}>
    <!-- svelte-ignore a11y-autofocus -->
    <input bind:value={editTodoText} type="text" id="todo-{todo.id}" autofocus onfocus="this.select()" autoComplete="off" on:blur={onCancel} on:focus={onFocus} />
  </form>
{:else}
  <li id="todo-{todo.id}" on:click={onDelete} on:contextmenu|preventDefault={onEdit} >{todo.text}</li>
{/if}

<div class="separator"></div>
