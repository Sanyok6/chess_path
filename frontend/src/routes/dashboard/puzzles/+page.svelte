<script lang="ts">
    import { goto } from "$app/navigation";
    import { fetchApi, fetchUserData } from "$lib/api";
    import { userStore, type User } from "$lib/store";

    let userData: User | null = null;
    userStore.subscribe(d => {userData = d})

    let createModalOpen = false

    let newSetName = ""
    
    let create_new = async () => {
        const response = await fetchApi("puzzlesets/sets/", {
            method: "POST",
            body: JSON.stringify({
                "name": newSetName,
            })
        });


        if (response.ok) {
            createModalOpen = false
            fetchUserData()
            goto("puzzles/"+(await response.json()).id)
        }
    }
</script>

{#if userData != null}
<div class=" w-[90%] flex flex-wrap justify-start ">

    <!-- <button class="btn btn-outline">

    </button> -->

    <div on:click={() => {createModalOpen = true}} class="m-5 w-56 text-purple-500 border-solid border-2 border-purple-600 rounded-xl p-5 hover:scale-105 flex items-center justify-center hover:bg-purple-600 hover:text-white">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </div>
        <p class="ml-3 text-lg">Create New</p>
    </div>

    {#each userData.data.sets as s}
        <div on:click={() => {goto("puzzles/"+s.id)}} class="m-5 w-56 border-solid border-2 border-gray-400 dark:border-gray-300 rounded-xl p-5 hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-700">
            <p class="font-extrabold text-xl">{s.name}</p>
            <p class="text-sm">Last Opened: <span class="font-semibold">{s.last_opened}</span></p>
            <p class="text-sm">Creator: <span class="font-semibold">{s.creator}</span></p>
            <p class="text-sm">Puzzles: <span class="font-semibold">{s.amount}</span></p>
        </div>
    {/each}
</div>

<input type="checkbox" id="create-modal" class="modal-toggle"  bind:checked={createModalOpen} />
<div class="modal">
  <div class="modal-box">
    <label for="create-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 class="font-bold text-lg mb-2 -mt-2">Create new puzzle set</h3>

    <form class="my-5" on:submit|preventDefault={create_new}>

        <div class="my-3">
            <p>Puzzle Set Name</p>
            <input bind:value={newSetName} type="text" required placeholder="Puzzle Set Name" class="input input-bordered input-primary w-full max-w-xs" />
        </div>

        <div class="modal-action">
            <button class="btn" type="submit">
              continue
            </button>
          </div>

    </form>

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