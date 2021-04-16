<script>
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  let showHeading;
  let todo;
  let newTodo;

  onMount(async () => {
    showHeading = "What's up?";
    const response = await fetch("/.netlify/functions/read-all");
    todo = await response.json();
    console.log("Array of todos", todo);
  });

  async function submit() {
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
  {#if showHeading}
    <h1>{showHeading}</h1>
  {/if}
  {#if todo}
    <h2>
      {#each todo as { data }}
        <span transition:fly={{ y: 200, duration: 2000 }}> {data.name}...</span>
      {/each}
    </h2>
  {/if}
  <form on:submit|preventDefault={submit}>
    <label for="todo_input">Add another thing:</label>
    <input
      type="text"
      bind:value={newTodo}
      name="newTodo"
      placeholder="Breathe deep three times"
    />
    <input type="submit" value="Hit me!" />
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
  footer {
    font-size: 2vh;
    position: fixed;
    bottom: 5vh;
    left: 0;
    right: 0;
  }
</style>
