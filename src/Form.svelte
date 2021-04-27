<script>
    import { todos } from "./stores";
    let newTodo;
    async function submit() {
        try {
            const object = { data: { name: newTodo } };
            newTodo = "";
            $todos = $todos.concat(object);
            const response = await fetch("/.netlify/functions/create", {
                method: "POST",
                body: JSON.stringify({ newTodo: object.data.name }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            $todos = await response.json();
        } catch (error) {
            console.log(error);
        }
    }
</script>

<form on:submit|preventDefault={submit}>
    <input
        type="text"
        bind:value={newTodo}
        name="newTodo"
        placeholder="Another thing"
        maxlength="35"
    />
    <input type="submit" value="Add" />
</form>

<style>
    form {
        position: fixed;
        bottom: 20vh;
        margin-left: 15%;
        margin-right: 15%;
        width: 70%;
    }

    input {
        font-size: 2vh;
    }
</style>
