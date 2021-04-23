<script>
    import { todos } from "./stores";

    let i = 0;

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

<button on:click|preventDefault={remove(i + 1)}>🗑</button>
