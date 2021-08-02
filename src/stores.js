import { writable } from 'svelte/store'

export const autofocus = writable(true)
export const todos = writable([
  { id: 1, text: "task1" },
  { id: 2, text: "task2" },
  { id: 3, text: "task3" }
])
