<script>
    import { todos } from "./stores";

    let i = 0;

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
                alert(error);
            }
        };
</script>

<button on:click|preventDefault={remove(i + 1)}>🗑</button>
