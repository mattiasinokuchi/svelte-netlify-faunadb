<script>
    import { onMount } from "svelte";
    import { todos } from "./stores";

    onMount(async () => {
        const response = await fetch("/.netlify/functions/read-all");
        $todos = await response.json();
        console.log("Array of todos", $todos);
    });
</script>

<main>
    <h1>To do</h1>
    {#if $todos}
        <h2>
            {#each $todos.reverse() as { data }}
                <input bind:value={data.name} />
            {/each}
        </h2>
    {/if}
</main>

<style>
    input {
        border-style: none;
    }
    input:focus {
        border-style: solid;
    }
</style>
