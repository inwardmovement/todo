<script>
  import { createEventDispatcher } from 'svelte'

  export let todo

  const dispatch = createEventDispatcher()

  function deleteTodo() {
    dispatch('delete', todo)
  }
</script>

<li id="todo-{todo.id}" on:click={deleteTodo} >
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check check-icon" viewBox="3.75 5.25 9 5.5"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg><span>{todo.text}</span>
  <div class="separator"></div>
</li>

<style lang="scss">
  li {
    list-style-type: none;

    &:hover {
      color: #198754;

      .check-icon {
        visibility: visible;
      }
    }

    .check-icon {
      visibility: hidden;
      margin-left: .25rem;
      margin-right: .25rem;
    }

    .separator {
      border-bottom: 1px solid #ced4da;
    }
  }
</style>
