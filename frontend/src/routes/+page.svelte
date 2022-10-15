<script lang="ts">
    let y=0
    let h=0
    let s2=0
</script>

<svelte:window bind:scrollY={y} bind:outerHeight={h} />

<div class="fixed">{y}, {h/2}, {s2/2}</div>

<div class="h-[85vh] bg-gradient-to-r from-cyan-500 to-blue-500 text-center font-sans"> 
    <div class="w-full text-center fixed" style="bottom: {y/2+h/2.5}px;">
        <p class="lg:text-9xl text-3xl font-bold ">Chess Path</p>
        <p class="lg:text-4xl text-xl mt-20">Motivate yourself to practice chess, one step at a time.</p>
    </div>
</div>

<div class="bg-gray-800 py-36" bind:offsetHeight={s2}>
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
            <p class="text-2xl text-gray-300">Create and share puzzle sets. Unlike many chess sites, each puzzle allows for multiple variants.</p>
        </div>
        <div class="relative mt-10">
            <div class="w-[285px] h-[160px] lg:w-[600px] lg:h-[350px] rotate-[8deg] bg-success absolute top-5 left-5"></div>
            <img class="w-[300px] lg:w-[600px] shadow-2xl rotate-[8deg] shadow-black" src="/homepage/puzzles.png" alt="goals page" />
        </div>
    </div>
</div>