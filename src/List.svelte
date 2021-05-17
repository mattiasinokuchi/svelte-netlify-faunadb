<script>
    import { onMount } from "svelte";
    import { todos } from "./stores";

    onMount(async () => {
        const response = await fetch("/.netlify/functions/read-all");
        $todos = await response.json();
    });

    const update = (num) =>
        function () {
            try {
                fetch("/.netlify/functions/update", {
                    method: "POST",
                    body: JSON.stringify({
                        id: $todos[num - 1]["ref"]["@ref"]["id"],
                        data: $todos[num - 1]["data"]["name"],
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } catch (error) {
                console.log(error);
            }
        };

    const remove = (num) =>
        function () {
            try {
                fetch("/.netlify/functions/delete", {
                    method: "POST",
                    body: JSON.stringify({
                        id: $todos[num - 1]["ref"]["@ref"]["id"],
                        data: $todos[num - 1]["data"]["name"],
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                $todos = [...$todos.slice(0, num - 1), ...$todos.slice(num)];
            } catch (error) {
                console.log(error);
            }
        };
</script>

<form>
    {#if $todos}
        {#each $todos as { data }, i}
            <div id="todo">
                <button on:click|preventDefault={remove(i + 1)}>🗑</button>
                <input
                    bind:value={data.name}
                    on:change={update(i + 1)}
                    size={data.name.length}
                    maxlength="35"
                />
            </div>
        {/each}
    {/if}
</form>

<style>
    form,
    div {
        display: flex;
        flex-wrap: wrap;
    }

    input {
        border-style: none;
        font-size: 2vh;
    }

    input:focus {
        border-style: solid;
    }

    button {
        visibility: hidden;
        font-size: 2vh;
    }

    #todo:focus-within button {
        visibility: visible;
    }
</style>
