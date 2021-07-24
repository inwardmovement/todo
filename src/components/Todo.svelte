<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let todo

  let editingTodo = false
  let editTodoText = todo.text

  function editTodo(editedTodo) {
    todo = { ...todo, ...editedTodo }
    dispatch('edit', todo)
  }

  function onCancel() {
    editTodoText = todo.text
    editingTodo = false
  }

  function onSave() {
    editTodo({ text: editTodoText })
    editingTodo = false
  }

  function onDelete() {
    dispatch('delete', todo)
  }

  function onEdit() {
    editingTodo = true
  }
</script>

{#if editingTodo}
<form on:submit|preventDefault={onSave} on:keydown={e => e.key === 'Escape' && onCancel()}>
  <input bind:value={editTodoText} type="text" id="todo-{todo.id}" />
</form>
{:else}
  <li id="todo-{todo.id}" on:click={onDelete} on:contextmenu|preventDefault={onEdit}>{todo.text}</li>
{/if}
