<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  let showHeading;
  let showText;
  let newTodo;

  onMount(async () => {
    showHeading = "What's up?";
    showText = false;
    const response = await fetch("/.netlify/functions/read-all");
    let object = await response.json();
    console.log(object.data);
    showText = object.data;
  });

  async function submit() {
    try {
      const response = await fetch("/.netlify/functions/create", {
        method: "POST",
        body: JSON.stringify({ newTodo : newTodo }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const object = await response.json();
      console.log(object.data);
      showText = object.data;
    } catch (error) {
      console.log(error);
    }
  }
</script>

<main>
  {#if showHeading}
    <h1>{showHeading}</h1>
  {/if}
  {#if showText}
    <h2 transition:fade>{showText}</h2>
  {/if}
  <form on:submit|preventDefault={submit}>
    <label for="todo_input">Add another thing:</label>
    <input
      type="text"
      bind:value={newTodo}
      name="newTodo"
      placeholder="Breathe deep three times"
    />
    <input
      type="submit"
      value="Hit me!"
    >
  </form>
  <footer>
    <hr>
    This is a Serverless app written with
    <a href="https://svelte.dev/" target="_blank" rel="noreferrer noopener">
      Svelte
    </a>
    backed by
    <a href="https://fauna.com" target="_blank" rel="noreferrer noopener">
      FaunaDB
    </a>
    and deployed with
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
    bottom: 20vw;
    left: 0;
    right: 0;
  }
  footer {
    position: fixed;
    bottom: 5vw;
    left: 0;
    right: 0;
  }
</style>
