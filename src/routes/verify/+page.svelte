<script>
    import { onMount } from 'svelte';

    let captchaInput = '';
    let captchaText = '';
    let message = '';
    let mathInput = '';
    let mathMessage = '';

    let success = 0;

    function verifyMath() {
        if (mathInput !== '2') {
            mathMessage = 'Math CAPATCHA failed successfully!';
            success = 2;
        } else {
            mathMessage = 'Math verification succeded. Please try again.';
        }
    }

    function generateCaptcha() { 
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        captchaText = '';
        for (let i = 0; i < 6; i++) {
            captchaText += chars[Math.floor(Math.random() * chars.length)];
        }
    }

    function verifyCaptcha() {
        if (captchaInput !== captchaText) {
            message = 'CAPTCHA failed successfully! But you might still be a human :(';
            success = 1
        } else {
            message = 'CAPTCHA verification succeded. Please try again.';
            generateCaptcha();
        }
    }

    onMount(() => {
        generateCaptcha();
    });
</script>

<style>
    .captcha {
        font-family: 'Courier New', Courier, monospace;
        background-color: #f0f0f0;
        padding: 10px;
    }
</style>

<div class="w-full flex flex-col">
    <h1 class="text-3xl font-bold w-full text-center mt-2">
        Prove that you are not a human
    </h1>
    
    <div class="border mx-2 md:mx-auto p-2 rounded-md mt-4">
        <div class="flex">
            <div class="captcha rounded-md text-lg">{captchaText}</div>
            <input type="text" class="border p-1 rounded-md flex-1 mx-1 w-8 md:w-full" bind:value={captchaInput} placeholder="Enter CAPTCHA" />
            <button on:click={verifyCaptcha} class="bg-blue-500 text-white p-2 rounded-md">Verify</button>
        </div>

        {#if message}
            <p class="my-2">{message}</p>
        {/if}

        {#if success >= 1}
            <div class="flex">
                <div class="captcha rounded-md text-lg">1 + 1 = ?</div>
                <input type="text" class="border p-1 rounded-md flex-1 mx-1" bind:value={mathInput} placeholder="Enter answer" />
                <button on:click={verifyMath} class="bg-blue-500 text-white p-2 rounded-md">Check Answer</button>
            </div>
        {/if}

        {#if mathMessage}
            <p class="my-2">{mathMessage}</p>
        {/if}

        {#if success == 2}
            <a href="/payment">
                <button class="bg-green-500 text-white p-2 rounded-md text-xl w-full text-center">
                    Continue
                </button>
            </a>
        {/if}
    </div>
</div>