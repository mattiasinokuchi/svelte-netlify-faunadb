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
            } catch (error) {
                console.log(error);
            }
        };

    const remove = (num) =>
        async function () {
            try {
                console.log(num);
                console.log($todos[num - 1]);
                console.log($todos[num - 1]["ref"]["@ref"]["id"]);
                const response = await fetch("/.netlify/functions/delete", {
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
                <div id="todo">
                    <button class="button" on:click={remove(i + 1)}>🗑</button>
                    <input bind:value={data.name} on:change={update(i + 1)} />
                </div>
            {/each}
        </h2>
    {/if}
</main>

<style>
    h2 {
        display: flex;
        flex-wrap: wrap;
    }
    input {
        border-style: none;
    }
    input:focus {
        border-style: solid;
    }
    button {
        visibility: hidden;
    }
    #todo:focus-within .button {
        visibility: visible;
    }
</style>
