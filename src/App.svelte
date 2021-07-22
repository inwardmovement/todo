<script>
  import Todos from "./components/Todos.svelte";

  let todos = [
    { id: 1, text: 'task1'},
    { id: 2, text: 'task2'},
    { id: 3, text: 'task3'}
  ]
</script>

<Todos {todos} />
