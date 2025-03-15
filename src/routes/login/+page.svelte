<script lang="ts">
    let username = "";
    let password = "";
    let error = "";

    function login() {
        error = ""

        if (password.length > 4) {
            error = "Password too secure, max 4 characters";
            return;
        }

        window.location.href = "/verify";
    }

    function bruteforce() {
        error = "";
        let i = 0;

        let interval = setInterval(() => {
            const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            password = "";

            let len = Math.floor(Math.random() * 10) + 1;

            for (let i = 0; i < len; i++) {
                password += chars[Math.floor(Math.random() * chars.length)];
                username = password;
            }

            i++;
            if (i > 20) {
                clearInterval(interval);
                window.location.href = "/verify";
            }
        }, 100);
    }
</script>

<div class="flex w-full h-screen">
    <div class="flex flex-col m-auto p-3 border rounded-md">
        <h1 class="font-bold text-3xl">Login/Register</h1>
        <input type="text" bind:value={username} class="border p-2 rounded-md mt-2 text-xl" placeholder="Username" />
        <input type="password" bind:value={password} class="border p-2 rounded-md mt-2 text-xl" placeholder="Password" />

        <p class="text-red-500 mt-2">{error}</p>

        <button onclick={login} class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
            Login/Register
        </button>

        <button onclick={bruteforce} class="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center">
            Bruteforce
        </button>
    </div>
</div>