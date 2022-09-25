<script lang="ts">
    import { type User, userStore, taskClaimed, type Task } from "$lib/store";
    import { fetchApi, fetchUserData, formatApiErrors } from "$lib/api";

    let userData: User | null = null;

    let messages: string[] = [];
    let newTaskName: string;
    let newTaskDur: number;

    let createModalOpen = false
    let taskModalOpen = false

    let tasks: Array<Task> = [{id:0, name: "", duration:0, lastCompleted:"", creator:0}];
    
    let currentTask: {task: Task, secondsRemaining: number, formattedTime: string, percentage: number, inProgress: boolean, paused: boolean} = {task: tasks[0], secondsRemaining:0, formattedTime:"", percentage:0,inProgress:false,paused:false}

    let editing = false

    const setCurrentTask = (index: number) => {
        taskModalOpen = true
        currentTask = {task: tasks[index], secondsRemaining: tasks[index].duration, formattedTime: "", percentage: 0, inProgress: false, paused: false}
    }

    const startTask = () => {
        if (!currentTask.paused) {
            currentTask.percentage = 100 - (currentTask.secondsRemaining / currentTask.task.duration * 100)

            currentTask.formattedTime = new Date(currentTask.secondsRemaining * 1000).toISOString().substring(14, 19)
            currentTask.secondsRemaining --

            if (currentTask.secondsRemaining < 0 || currentTask.inProgress == false) {
                return
            }
        }

        setTimeout(startTask, 1000)
    }

    userStore.subscribe(d => {
        userData = d
        if (d) {tasks = d.data.tasks}
    })


    const createNewTask = async () => {
        const response = await fetchApi("tasks/", {
            method: "POST",
            body: JSON.stringify({
                "name": newTaskName,
                "duration": newTaskDur
            })
        });


        if (response.ok) {
            createModalOpen = false
            newTaskName=""
            newTaskDur=0
            fetchUserData()
        } else {
            const errors = formatApiErrors(await response.json());
            messages=errors;
        }
    }

    const editTask = async () => {
        const response = await fetchApi("tasks/"+currentTask.task.id+"/", {
            method: "PUT",
            body: JSON.stringify({
                "name": newTaskName,
                "duration": newTaskDur
            })
        });

        if (response.ok) {
            createModalOpen = false
            editing = false
            newTaskName=""
            newTaskDur=0
            fetchUserData()
        } else {
            const errors = formatApiErrors(await response.json());
            messages=errors;
        }
    }


    const deleteCurrentTask = async () => {
        const response = await fetchApi("tasks/"+currentTask?.task.id, {
            method: "DELETE",
        });
        if (response.ok) {
            console.log("OK")
            taskModalOpen = false
            fetchUserData()
        } else {
            console.log("error deleting task")
        }
    }

    const finishTask = async () => {
        const response = await fetchApi("tasks/"+currentTask.task.id+"/", {
            method: "PATCH",
        });

        if (response.ok) {
            currentTask.inProgress = false;
            taskModalOpen=false
            if (userData?.data.tasks.length == 1) taskClaimed.set(false);
            fetchUserData()
        } else {
           alert("Error updating task completion status, check your internet connection and try again.") 
        }
    }


</script>

{#if userData != null}

<div class="flex justify-center flex-wrap w-[100%]">
    {#each tasks as t, i}
        <div class="w-[95%] lg:w-[60%] m-2 {t.lastCompleted == new Date().toISOString().split('T')[0] ? 'hidden' : ''}" on:click={() => {setCurrentTask(i);}}>
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
        {#if currentTask?.inProgress}
            <div class="radial-progress m-5" style="--value:{currentTask.percentage};--size:8rem;">{currentTask.formattedTime}</div>
        {:else}
            <div class="text-left">
                <p>Task Name: <span class="font-semibold">{currentTask.task.name}</span></p>
                <p>Duration: <span class="font-semibold">{currentTask.task.duration} mins</span></p>
            </div>
        {/if}
    </div>


    <div class="modal-action flex justify-center">
        {#if currentTask.inProgress}
            {#if currentTask.secondsRemaining >= 0}
                <button class="btn btn-outline" on:click={() => {currentTask.paused = !currentTask.paused}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                    </svg>
                </button>
                <button on:click={() => {currentTask.inProgress = false; taskModalOpen=false}} for="task-modal" class="btn btn-outline btn-error">cancel</button>
            {:else}
                <button on:click={finishTask} class="btn btn-outline btn-success">finish</button>
            {/if}
        {:else}
            <label for="task-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <button class="btn btn-outline btn-error" on:click={deleteCurrentTask}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                </svg>
            </button>
            <button class="btn btn-outline btn-warning" on:click={()=>{
                editing=true;
                taskModalOpen=false;
                createModalOpen = true
                newTaskName = currentTask.task.name
                newTaskDur = currentTask.task.duration
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
            </button>
            <button on:click={() => {currentTask.inProgress = true; startTask()}} class="btn btn-outline btn-success">start</button>
        {/if}
        
    </div>
  </div>
</div>


<input type="checkbox" id="create-modal" class="modal-toggle"  bind:checked={createModalOpen} />
<div class="modal">
  <div class="modal-box">
    <label for="create-modal" class="btn btn-sm btn-circle absolute right-2 top-2" on:click={() => {editing=false}}>✕</label>
    <h3 class="font-bold text-lg mb-2 -mt-2">Create new task</h3>

    <form class="my-5" on:submit|preventDefault={editing ? editTask : createNewTask}>
        {#if messages.length}
            <div class="alert alert-warning shadow-lg">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>{messages}</span>
                </div>
            </div>
        {/if}

        <div class="my-3">
            <p>Title</p>
            <input bind:value={newTaskName} type="text" required placeholder="Task Title" class="input input-bordered input-primary w-full max-w-xs" />
        </div>

        <div class="my-3">
            <p>Duration (minutes)</p>
            <input bind:value={newTaskDur} type="number" required placeholder="Task Duration (minutes)" min=0 class="input input-bordered input-primary w-full max-w-xs" />
        </div>

        <div class="modal-action">
            <button class="btn" type="submit">
              create
            </button>
          </div>

    </form>

    <!-- <div class="modal-action">
      <button on:click={createNewTask} class="btn">
        create
      </button>
    </div> -->
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