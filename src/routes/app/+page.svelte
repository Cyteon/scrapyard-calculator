<script>
    import { browser } from "$app/environment";
	import { plans } from "$lib";
    import { onMount } from "svelte";

	let total = 0;
	let console = "";
	let state = null;
	let money = 0;
	let perHour = 0;
	let addedPlans = "";

	const operators = ["+", "-", "*", "/", "sqrt", "log", "^"];

	onMount(() => {
		if (browser) {
			addedPlans = localStorage.getItem("plans") || "";
		}

		if (!addedPlans.includes("Basic")) {
			for (let i = 0; i < 10; i++) {
				document.getElementById("" + i).disabled = true;
			}

			document.getElementById("+").disabled = true;
			document.getElementById("-").disabled = true;
		}
		if (!addedPlans.includes("Advanced")) {
			document.getElementById("*").disabled = true;
			document.getElementById("/").disabled = true;
		}
		if (!addedPlans.includes("Pro")) {
			document.getElementById("^").disabled = true;
			document.getElementById("sqrt").disabled = true;
			document.getElementById("log").disabled = true;
		}
		if (!addedPlans.includes("Enterprise")) {}
	})

	setInterval(() => {
		if (browser) {
			perHour = 0;
			addedPlans.split(" ").forEach((item) => {
				money += plans.find((obj) => obj.name == item).price / 3600;
				perHour += plans.find((obj) => obj.name == item).price;
			});
		}
	}, 1000) // every sec

	function showState(what) {
		switch (what) {
			case "add":
				console = "+";
				break;
			case "substract":
				console = "-";
				break;
			case "multiply":
				console = "*";
				break;
			case "divide":
				console = "/";
				break;
			case "sqrt":
				console = "sqrt";
				break;
			case "log":
				console = "log";
				break;
			case "pow":
				console = "^";
				break;
			default:
				console = "0";
				break;
		}
	}

	function resolveState() {
		switch (state){
			case "add":
				total += parseFloat(console);
				break;
			case "substract":
				total -= parseFloat(console);
				break;
			case "multiply":
				total *= parseFloat(console);
				break;
			case "divide":
				total /= parseFloat(console);
				break;
			case "sqrt":
				total = Math.sqrt(total);
				break;
			case "log":
				total = Math.log(total);
				break;
			case "pow":
				total = Math.pow(total, parseFloat(console));
				break;
			default:
				total = parseFloat(console);
				break;
		}
	}

	function setOperation(operation) {
		money += 100;

		resolveState();
		state = operation;
		showState(operation);

	}

	function setValue(value) {
		money += 100;

		if (console == "0" || state == "equal" || operators.includes(console)) {
			console = "";
		}

		if (state == "equal") {
			state = null;
		}

		if (value == "C") {
			total = 0;
			state = null;
			console = "";
			return;
		}

		console = console + value;
	}

	function equal() {
		resolveState();
		console = total;
	}
</script>

<style>
	.calculator {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 300px;
		border: 1px solid #eee;
		box-shadow: 2px 2px 2px #eee;
		padding: 10px;
	}
	.calculator input {
		width: 100%;
		padding: 20px;
		outline: none;
		text-align: right;
		font-size: 20px;
	}
	.calculator .buttons {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
	}
	.calculator .buttons .operations {
		display: flex;
		justify-content: space-between;
	}

	.calculator .buttons .numbers > div {
		display: flex;
		justify-content: space-between;
	}

	.calculator button {
		outline: none;
		border: 1px solid #eee;
		margin-bottom: 2px;
		width: 24%;
	}

	.calculator button:disabled {
		background:#eee;
		color:#000;
	}
</style>

<h1 class="text-3xl w-full text-center font-bold mt-2">You owe: ${money.toFixed(4)} USD</h1>
<p class="w-full text-center text-xl">(${perHour} / hour)</p>

{#if addedPlans == ""}
	<p class="w-full text-center text-xl">You havent paid :(</p>
{/if}

<div class="calculator rounded-md">
	<input type="text" class="p-2 border rounded-md mb-2" bind:value={console} readonly="true"/>
	<div class="buttons">
		<div class="operations">
			<button id="-" on:click={()=>{setOperation('substract');}}>
				+
			</button>
			<button id="+" on:click={()=>{setOperation('add');}}>
				-
			</button>
			<button id="/" on:click={()=>{setOperation('divide');}}>
				&times;
			</button>
			<button id="*" on:click={()=>{setOperation('multiply');}}>
				&divide;
			</button>
		</div>
		<div class="numbers">
			<div>
				<button id="7" on:click={()=>{setValue(7);}}>
					7
				</button>
				<button id="8" on:click={()=>{setValue(8);}}>
					8
				</button>
				<button id="9" on:click={()=>{setValue(9);}}>
					9
				</button>
				<button id="sqrt" on:click={()=>{setOperation('pow');}}>
					&radic;
				</button>
			</div>
			<div>
				<button id="4" on:click={()=>{setValue(4);}}>
					4
				</button>
				<button id="5" on:click={()=>{setValue(5);}}>
					5
				</button>
				<button id="6" on:click={()=>{setValue(6);}}>
					6
				</button>
				<button id="log" on:click={()=>{setOperation('log');}}>
					log
				</button>
			</div>
			<div>
				<button id="1" on:click={()=>{setValue(1);}}>
					1
				</button>
				<button id="2" on:click={()=>{setValue(2);}}>
					2
				</button>
				<button id="3" on:click={()=>{setValue(3);}}>
					3
				</button>
				<button id="^" on:click={()=>{setOperation('sqrt');}}>
					^
				</button>
			</div>
			<div>
				<button id="0" on:click={()=>{setValue(0);}}>
					0
				</button>
				<button id="." on:click={()=>{setValue('.');}}>
					.
				</button>
				<button id="C" on:click={()=>{setValue('C');}}>
					C
				</button>
				<button id="=" on:click={equal} class="bg-blue-500 text-white">
					=
				</button>
			</div>
		</div>
	</div>
	<p class="w-full text-center mt-1">Pay to unlock more features</p>
	<p class="w-full text-center text-xs">(trigonometry coming soon)</p>
</div>