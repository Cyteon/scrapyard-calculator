<script lang="ts">
    import { onMount } from "svelte";
    import { plans } from "$lib";

    var include: String[] = [];
    var total: number = 0;

    onMount(() => {
        if(localStorage.getItem("plans") !== null) {
            include = localStorage.getItem("plans")!.split(" ");

            include.forEach((item) => {
                document.getElementById(item)!.innerHTML = "Remove";
                total += plans.find((obj) => obj.name == item)!.price;
            });
        }
    });
</script>

<div class="flex flex-col w-full h-screen">
    <h1 class="font-bold text-3xl mx-auto mt-4">Select your Plans</h1>
    <p class="mx-auto">*plans does not include cheaper plans, buy em all</p>
    <p class="mx-auto">**100$ per button press not included</p>
    <div class="grid lg:grid-cols-2 m-auto w-full w-2/3 px-4">
        {#each plans as plan}
            <div class="p-2 border rounded-md mb-2 ml-2 relative">
                <div class="flex w-full">
                    <h1 class="font-bold text-2xl">{plan.name}</h1>
                    <p class="font-bold text-2xl ml-auto text-green-500">{plan.price} USD/hour**</p>
                </div>

                <p class="text-xl">{plan.description}</p>

                <div>
                    {#each plan.features as feature}
                        <p>✅ {feature}</p>
                    {/each}
                </div>

                <button 
                    class="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    id={plan.name}
                    onclick={() => {
                        if(include.includes(plan.name)) {
                            include = include.filter((item) => item !== plan.name);
                            document.getElementById(plan.name)!.innerHTML = "Add";
                            total -= plan.price;
                        } else {
                            include.push(plan.name);
                            document.getElementById(plan.name)!.innerHTML = "Remove";
                            total += plan.price;
                        }
                    }}
                >
                    Add
                </button>
            </div>
        {/each}
    </div>

    <button
        class="mx-auto mt-auto mb-4 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onclick={() => {
            localStorage.setItem("plans", include.join(" "));
            window.location.href = "/app";
        }}
    >
        Get Started (${total}/hour)
    </button>
</div>