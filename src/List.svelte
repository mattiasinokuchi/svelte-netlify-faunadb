<script>
    import { onMount } from "svelte";
    import { todos } from "./stores";

    let i = 0;

    onMount(async () => {
        const response = await fetch("/.netlify/functions/read-all");
        $todos = await response.json();
        console.log("Array of todos", $todos);
    });
    const storage = (operation, num) =>
        async function () {
            try {
                console.log(operation, num);
                console.log($todos[num - 1]);
                console.log($todos[num - 1]["ref"]["@ref"]["id"]);
                const response = await fetch("/.netlify/functions/"+operation, {
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

<h1>Faster To Do</h1>

<form>
    {#if $todos}
        {#each $todos as { data }, i}
            <div id="todo">
                <button class="button" on:click|preventDefault={storage("delete", i + 1)}> 🗑 </button>
                <input
                    bind:value={data.name}
                    on:change={storage("update", i + 1)}
                    size={data.name.length}
                    maxlength="35"
                />
            </div>
        {/each}
    {/if}
</form>

<style>
    form {
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
    #todo:focus-within .button {
        visibility: visible;
    }
</style>
