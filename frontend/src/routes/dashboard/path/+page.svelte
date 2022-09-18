<script lang="ts">
    import { onMount } from "svelte"

    import { userStore, type User } from "$lib/store";
    import { fetchUserData} from "$lib/api";

    import { Confetti } from "svelte-confetti"

    let userData: User | null = null;

    userStore.subscribe(d => userData = d)

    let stats = {completed: 7, claimed: false}

    let progressVal = 0

    let confetti = false

    const continuePath = () => {
        const update = () => {
            progressVal+= (101-progressVal)/30
            if (progressVal > 100) {
                progressVal = 0
                confetti=true
                stats.completed++ 
                return
            }
            setTimeout(update, 20)
        }
        if (!stats.claimed) {
            stats.claimed = true
            update()
        }
    }

    const scrollIntoView = () => {
        const el = document.getElementById("next");
        if (!el) return;
        el.scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
        });
    }

    onMount(scrollIntoView)

</script>

<div class="overflow-x-hidden w-[100%]">
    <h1 class="text-center text-5xl mb-32 p-1">{userData?.username}'s Path</h1>
    <div class="flex flex-wrap w-[100%] justify-evenly">
        <div class="text-center text-blue-600 dark:text-blue-300 p-5">
            <p class="text-3xl py-2">Total Time:</p>
            <p class="text-3xl">
                <span class="font-extrabold">10</span>
                <span class="text-xl">hours</span>
            </p>
        </div>
        <div class="text-center text-cyan-600 dark:text-cyan-300 p-5">
            <p class="text-3xl py-2">Tasks Completed:</p>
            <p class="text-3xl">
                <span class="font-extrabold">50</span>
                <span class="text-xl">tasks</span>
            </p>
        </div>
        <div class="text-center text-purple-600 dark:text-purple-300 p-5">
            <p class="text-3xl py-2">Highest Streak:</p>
            <p class="text-3xl">
                <span class="font-extrabold">4</span>
                 <span class="text-xl">days</span>
            </p>
        </div>
    </div>

    <div class="flex flex-nowrap w-[100%] overflow-x-auto p-5 my-52 pb-10 pt-32">

        {#each Array(stats.completed+7) as _, i}
            <button 
                class=
                "
                    {i >= stats.completed ? "btn-outline" : ""}
                    btn btn-success rounded-full w-24 h-24 
                    text-4xl border-4
                "
                on:mouseup={i == stats.completed ? continuePath : () => {}}
                disabled={i > stats.completed}
                id={i+2 == stats.completed ? "next" : ""}
            >
                {i+1}
                {#if confetti && i+1 == stats.completed}
                    <Confetti x={[-0.5, 0.5]} />
                    <Confetti amount=10 x={[-0.75, -0.3]} y={[0.15, 0.75]} />
                    <Confetti amount=10 x={[0.3, 0.75]} y={[0.15, 0.75]} />
                {/if}
            </button>
            <progress
                class="
                    progress
                    progress-success
                    w-36
                    min-w-min
                    h-3
                    mt-10
                    mx-1
                    bg-inherit
                    border-2
                    {i+1 > stats.completed ? "border-gray-500" : "border-green-400" }
                "
                value={(i+1 > stats.completed) ? 0 : (i+1 == stats.completed) ? progressVal : 100}
                max={100}>
            </progress>
        {/each}

    </div>
</div>