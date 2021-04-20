<script>
  import { onMount } from "svelte";
  let todos;
  let newTodo;

  onMount(async () => {
    const response = await fetch("/.netlify/functions/read-all");
    todos = await response.json();
    console.log("Array of todos", todos);
  });

  async function submit() {
    todos = null;
    try {
      const response = await fetch("/.netlify/functions/create", {
        method: "POST",
        body: JSON.stringify({ newTodo: newTodo }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      todos = await response.json();
      console.log(todo);
    } catch (error) {
      console.log(error);
    }
  }
</script>

<main>
  <h1>To do</h1>
  {#if todos}
    <h2>
      {#each todos.reverse() as { data }}
        <input
          class="todo"
          bind:value={data.name}
        >
      {/each}
    </h2>
  {/if}
  <form on:submit|preventDefault={submit}>
    <input
      type="text"
      bind:value={newTodo}
      name="newTodo"
      placeholder="Add another"
    />
    <input type="submit" value="Submit" />
  </form>
  <footer>
    <hr />
    This is a Serverless app written with
    <a href="https://svelte.dev/" target="_blank" rel="noreferrer noopener">
      Svelte
    </a>
    backed by
    <a href="https://fauna.com" target="_blank" rel="noreferrer noopener">
      FaunaDB
    </a>
    deployed with
    <a
      href="https://www.netlify.com/"
      target="_blank"
      rel="noreferrer noopener"
    >
      Netlify
    </a>
  </footer>
</main>

<style>
  form {
    position: fixed;
    bottom: 20vh;
    left: 0;
    right: 0;
  }
  .todo {
    border-style: none;
  }
  footer {
    font-size: 2vh;
    position: fixed;
    bottom: 5vh;
    left: 0;
    right: 0;
  }
</style>
