<script lang="ts">
    import { onMount } from "svelte"

    import { taskClaimed, userStore, type User } from "$lib/store";
    import { fetchUserData} from "$lib/api";

    import { Confetti } from "svelte-confetti"
    import { dataset_dev } from "svelte/internal";

    let userData: User | null = null;


    let stats = {completed: 0 || 1, claimed: <Boolean>(true)}

    userStore.subscribe(d => {
        userData = d
        taskClaimed.subscribe(t => {
            stats.claimed = t;
            if (userData) {
                stats.completed = t ? userData.data.current_streak : userData.data.current_streak-1
            }
        })
    })

    let progressVal = 0

    let confetti = false

    const continuePath = () => {
        const update = () => {
            progressVal+= (101-progressVal)/30
            if (progressVal > 100) {
                progressVal = 0
                confetti=true
                taskClaimed.set(true)
                return
            }
            setTimeout(update, 20)
        }
        if (!stats.claimed) {
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


{#if userData != null}
<div class="overflow-x-hidden w-[100%]">
    <h1 class="text-center text-5xl mb-32 p-1">{userData?.username}'s Path</h1>
    <div class="flex flex-wrap w-[100%] justify-evenly">
        <div class="text-center text-cyan-600 dark:text-cyan-300 p-5">
            <p class="text-3xl py-2">Tasks Completed:</p>
            <p class="text-3xl">
                <span class="font-extrabold">50</span>
                <span class="text-xl">tasks</span>
            </p>
        </div>
        <div class="text-center text-blue-600 dark:text-blue-300 p-5">
            <p class="text-3xl py-2">Last Completed:</p>
            <p class="text-3xl">
                <span class="font-extrabold">{userData.data.last_completion || "---"}</span>
                <!-- <span class="text-xl">mm/dd/yy</span> -->
            </p>
        </div>
        <div class="text-center text-purple-600 dark:text-purple-300 p-5">
            <p class="text-3xl py-2">Highest Streak:</p>
            <p class="text-3xl">
                <span class="font-extrabold">{userData.data.record}</span>
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
{:else}

<div role="status">
    <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
    </svg>
    <span class="sr-only">Loading...</span>
</div>

Chess Path
{/if}