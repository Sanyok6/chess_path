<script lang="ts">
    import { goto } from "$app/navigation";

    let y=0
    let h=0
    let s2=0
</script>

<svelte:window bind:scrollY={y} bind:outerHeight={h} />

<div class="h-[85vh] bg-gradient-to-r from-cyan-500 to-blue-500 text-center font-sans"> 
    <div class="w-full text-center fixed" style="bottom: {y/2+h/2.5}px;">
        <p class="lg:text-9xl text-3xl font-bold ">Chess Path</p>
        <p class="lg:text-4xl text-xl mt-20">Motivate yourself to practice chess, one step at a time.</p>
    </div>
</div>

<div class="bg-gray-800 pt-36 pb-[230px]" bind:offsetHeight={s2}>
    <div class="flex flex-wrap justify-evenly p-3">
        <div />
        <div class="w-96 mt-16">
            <p class="text-4xl font-bold text-gray-100">Goals</p>
            <p class="text-2xl text-gray-300">Set goals, and work on them for a set amount of time each day to improve.</p>
        </div>
        <div class="relative mt-10">
            <div class="w-[285px] h-[160px] lg:w-[600px] lg:h-[350px] rotate-[10deg] bg-primary absolute top-5 left-5"></div>
            <img class="w-[300px] lg:w-[600px] rotate-[10deg] shadow-2xl shadow-black" src="/homepage/goals.png" alt="goals page" />
        </div>
    </div>
    <div class="flex flex-wrap justify-evenly p-3 mt-36">
        <div class="relative mt-10">
            <div class="w-[285px] h-[160px] lg:w-[600px] lg:h-[350px] -rotate-[6deg] bg-info absolute top-3 left-5" />
            <img class="w-[300px] lg:w-[600px] shadow-2xl -rotate-[6deg] shadow-black" src="/homepage/path.png" alt="goals page" />
        </div>
        <div class="w-96 mt-16">
            <p class="text-4xl font-bold text-gray-100">Path</p>
            <p class="text-2xl text-gray-300">Complete all of your goals each day to progress on your path.</p>
        </div>
        <div />
    </div>
    <div class="flex flex-wrap justify-evenly p-3 mt-36">
        <div />
        <div class="w-96 mt-16">
            <p class="text-4xl font-bold text-gray-100">Puzzles</p>
            <p class="text-2xl text-gray-300">Create and share puzzle sets. Unlike many chess sites, each puzzle allows for multiple variations.</p>
        </div>
        <div class="relative mt-10">
            <div class="w-[285px] h-[160px] lg:w-[600px] lg:h-[350px] rotate-[8deg] bg-success absolute top-5 left-5"></div>
            <img class="w-[300px] lg:w-[600px] shadow-2xl rotate-[8deg] shadow-black" src="/homepage/puzzles.png" alt="goals page" />
        </div>
    </div>
</div>

<div class="curve">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
    </svg>
</div>

<div class="h-[70vh] bg-[#9f3dfb] flex flex-col align-middle justify-center text-center">
    <div class="flex justify-center w-full">
        <div>
            <p class="text-3xl lg:text-5xl font-bold font-sans">Are you ready?</p>
            <p class="text-lg w-96 mt-1 mb-3">What are you waiting for? Create a free account on Chess Path, and start improving!</p>
            <button on:click={() => goto("/auth/signup")} class='btn w-96 bg-black text-white h-16 shadow-[0_0_10px_10px_rgba(9,179,214,0.5)] text-lg'>Sign up</button>
        </div>
    </div>
</div>

<footer class="text-center">
    <div class="pt-3">
      <div class="flex justify-center mb-3">
        <a class="underline mx-5" href="/auth/login">About</a>
        <a class="underline mx-5" href="/auth/login">Login</a>
        <a class="underline mx-5" href="/auth/signup">Signup</a>
      </div>
    </div>
  
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.2);">
      This project is open source. Check it out on <a class="underline" href="https://github.com/Sanyok6/chess_path">Github</a>.
    </div>
  </footer>

<style>
    .curve {
        position: relative;
        bottom: 85px;
        left: 0;
        width: 100%;
        overflow: hidden;
        line-height: 0;
        transform: rotate(180deg);
        margin-bottom: -90px;
    }

    .curve svg {
        position: relative;
        display: block;
        width: calc(100% + 1.3px);
        height: 85px;
    }

    .curve .shape-fill {
        fill: #9f3dfb;
    }
</style>