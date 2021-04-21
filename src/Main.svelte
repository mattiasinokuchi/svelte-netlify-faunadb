<script>
    import { onMount } from "svelte";
    import { todos } from "./stores";

    let i = 0;

    const select = num => function() {
        console.log(num);
        console.log($todos[num-1]);
        console.log($todos[num-1]['ref']['@ref']['id']);
    }

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
            {#each $todos as { data }, i}
                <input
                    bind:value={data.name}
                    on:focus={select(i + 1)}
                />
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
