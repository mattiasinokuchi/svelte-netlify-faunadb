<script>
  import { onMount } from "svelte";
  let todo;
  let newTodo;

  onMount(async () => {
    const response = await fetch("/.netlify/functions/read-all");
    todo = await response.json();
    console.log("Array of todos", todo);
  });

  async function submit() {
    todo = null;
    try {
      const response = await fetch("/.netlify/functions/create", {
        method: "POST",
        body: JSON.stringify({ newTodo: newTodo }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      todo = await response.json();
      console.log(todo);
    } catch (error) {
      console.log(error);
    }
  }
</script>

<main>
  <h1>To do</h1>
  {#if todo}
    <h2>
      {#each todo.reverse() as { data }}
        <span>{data.name} ... </span>
      {/each}
    </h2>
  {/if}
  <form on:submit|preventDefault={submit}>
    <label for="todo_input">Add another:</label>
    <input
      type="text"
      bind:value={newTodo}
      name="newTodo"
      placeholder="Breathe deep three times"
    />
    <input type="submit" value="Push me!" />
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
  span {
    white-space: break-spaces;
  }
  form {
    position: fixed;
    bottom: 20vh;
    left: 0;
    right: 0;
  }
  footer {
    font-size: 2vh;
    position: fixed;
    bottom: 5vh;
    left: 0;
    right: 0;
  }
</style>
