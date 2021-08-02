<script>
  import { createEventDispatcher } from 'svelte'
  import { autofocus } from '../stores/globalStore.js'

  export let todo

  const dispatch = createEventDispatcher()
  let editingTodo = false
  let editTodoText = todo.text

  function editTodo() {
    editingTodo = true
    $autofocus = false
  }

  function cancelEdit() {
    editTodoText = todo.text
    editingTodo = false
    $autofocus = true
  }

  function saveTodo() {
    todo = { ...todo, text: editTodoText }
    editingTodo = false
    dispatch('update', todo)
  }

  function deleteTodo() {
    dispatch('delete', todo)
  }
</script>

{#if editingTodo}
  <form on:submit|preventDefault={saveTodo} on:keydown={e => e.key === 'Escape' && cancelEdit()}>
    <!-- svelte-ignore a11y-autofocus -->
    <input bind:value={editTodoText} type="text" id="todo-{todo.id}" autofocus onfocus="this.select()" autoComplete="off" on:blur={cancelEdit} />
  </form>
{:else}
  <li id="todo-{todo.id}" on:click={deleteTodo} on:contextmenu|preventDefault={editTodo} >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check check-icon" viewBox="3.75 5.25 9 5.5"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
    </svg><span>{todo.text}</span>
  </li>
{/if}

<div class="separator"></div>

<style lang="scss">
  li {
    list-style-type: none;
  }

  .separator {
    border-bottom: 1px solid #ced4da;
  }

  li:hover,
  li:focus {
    color: #198754;
  }

  .check-icon {
    visibility: hidden;
    margin-left: .25rem;
    margin-right: .25rem;
  }

  li:hover .check-icon,
  li:focus .check-icon {
    visibility: visible;
  }
</style>
