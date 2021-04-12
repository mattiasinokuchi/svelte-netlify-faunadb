<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  let showText;

  onMount(async () => {
    await delay(1000);
    showText = "Hello serverless function!";
    await delay(2000);
    showText = false;
    let response = await fetch("/.netlify/functions/hello");
    let object = await response.json();
    showText = object.greeting;
    await delay(2000);
    showText = false;
    await delay(1000);
    showText = "Where are you?";
    await delay(1000);
    showText = false;
    await delay(1000);
    response = await fetch("/.netlify/functions/place");
    object = await response.json();
    showText = object.answer;
  });

  function delay(delayInms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }
</script>

<main>
  <p>
    This is a
    <a href="https://svelte.dev/">Svelte</a>
    app deployed with
    <a
      href="https://www.netlify.com/"
      target="_blank"
      rel="noreferrer noopener"
    >
      Netlify
    </a>
    which contains two serverless
    <a href="https://nodejs.org/en/">Node.js</a>
    functions.
  </p>
  <br />
  {#if showText}
    <h2 transition:fade>{showText}</h2>
  {/if}
</main>
