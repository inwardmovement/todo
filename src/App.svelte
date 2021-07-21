<script>
  import Todos from "./components/Todos.svelte";

  let todos = [
    { id: 1, name: 'task1'},
    { id: 2, name: 'task2'},
    { id: 3, name: 'task3'}
  ]
</script>

<Todos {todos} />
