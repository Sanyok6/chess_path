<script lang="ts">

    let taskModalOpen = false

    let tasks = [{name: "Puzzles", duration: 10, completed: true}, {name: "Games", duration: 15, completed: false}, {name: "Chess Book", duration: 10, completed: true}, {name: "Lichess Puzzles", duration: 15, completed: false}, ]
    
    let currentTask = {task: tasks[0], secondsRemaining: 0, formattedTime: "", percentage: 0, inProgress: false, paused: false}


    const setCurrentTask = (index: number) => {
        taskModalOpen = true
        currentTask = {task: tasks[index], secondsRemaining: tasks[index].duration, formattedTime: "", percentage: 0, inProgress: false, paused: false}
    }

    const startTask = () => {
        if (!currentTask.paused) {
            currentTask.formattedTime = new Date(currentTask.secondsRemaining * 1000).toISOString().substring(14, 19)
            currentTask.secondsRemaining --

            currentTask.percentage = 100 - (currentTask.secondsRemaining / currentTask.task.duration * 100)

            if (currentTask.secondsRemaining < 0 || currentTask.inProgress == false) {
                return
            }
        }

        setTimeout(startTask, 1000)
    }
</script>


<div class="flex justify-center flex-wrap w-[100%]">

    {#each tasks as t, i}
        <div class="w-[95%] lg:w-[60%] m-2 {t.completed ? 'hidden' : ''}" on:click={() => {setCurrentTask(i);}}>
            <button for="task-modal" class="btn btn-outline rounded-3xl w-full h-24 normal-case text-3xl font-light">
                <p class="mx-5">{t.name}</p>
            </button>
        </div>
    {/each}

    <div class="w-[95%] lg:w-[60%] m-2">
        <label for="create-modal" class="btn btn-primary btn-outline rounded-3xl w-full h-24 normal-case text-3xl font-light">
            <p class="mx-5">Create New Task</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </label>
    </div>

</div>


<input type="checkbox" id="task-modal" class="modal-toggle" bind:checked={taskModalOpen} />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-2 -mt-2 text-center">{ currentTask.inProgress ? "Work on " : ""}"{currentTask.task.name}"</h3>

    <div class="flex justify-center">
        {#if currentTask.inProgress}
            <div class="radial-progress m-5" style="--value:{currentTask.percentage};--size:8rem;">{currentTask.formattedTime}</div>
        {:else}
            <div class="text-left">
                <p>Task Name: {currentTask.task.name}</p>
                <p>Duration: {currentTask.task.duration} mins</p>
            </div>
        {/if}
    </div>


    <div class="modal-action flex justify-center">
        {#if currentTask.inProgress}
            {#if currentTask.secondsRemaining > 0}
                <button class="btn btn-outline" on:click={() => {currentTask.paused = !currentTask.paused}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                    </svg>
                </button>
                <button on:click={() => {currentTask.inProgress = false; taskModalOpen=false}} for="task-modal" class="btn btn-outline btn-error">cancel</button>
            {:else}
                <button on:click={() => {currentTask.inProgress = false; taskModalOpen=false}} class="btn btn-outline btn-success">finish</button>
            {/if}
        {:else}
            <button class="btn btn-outline btn-error">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                </svg>
            </button>
            <button class="btn btn-outline btn-warning">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
            </button>
            <button on:click={() => {currentTask.inProgress = true; startTask()}} class="btn btn-outline btn-success">start</button>
        {/if}
        
    </div>
  </div>
</div>


<input type="checkbox" id="create-modal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <label for="create-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 class="font-bold text-lg mb-2 -mt-2">Create new task</h3>

    <form class="my-5">
        <div class="my-3">
            <p>Title</p>
            <input type="text" placeholder="Task Title" class="input input-bordered input-primary w-full max-w-xs" />
        </div>

        <div class="my-3">
            <p>Duration (minutes)</p>
            <input type="number" placeholder="Task Duration (minutes)" class="input input-bordered input-primary w-full max-w-xs" />
        </div>
    </form>

    <div class="modal-action">
      <label for="create-modal" class="btn">create</label>
    </div>
  </div>
</div>
