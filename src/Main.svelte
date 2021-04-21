<script>
    import { onMount } from "svelte";
    import { todos } from "./stores";

    let i = 0;

    onMount(async () => {
        const response = await fetch("/.netlify/functions/read-all");
        $todos = await response.json();
        console.log("Array of todos", $todos);
    });

    const update = (num) =>
        async function () {
            try {
                console.log(num);
                console.log($todos[num - 1]);
                console.log($todos[num - 1]["ref"]["@ref"]["id"]);
                const response = await fetch("/.netlify/functions/update", {
                    method: "POST",
                    body: JSON.stringify({
                        id: $todos[num - 1]["ref"]["@ref"]["id"],
                        data: $todos[num - 1]["data"]["name"],
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                $todos = await response.json();
                console.log($todos);
                newTodo = "";
            } catch (error) {
                console.log(error);
            }
        };
</script>

<main>
    <h1>To do</h1>
    {#if $todos}
        <h2>
            {#each $todos as { data }, i}
                <input bind:value={data.name} on:change={update(i + 1)} />
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
