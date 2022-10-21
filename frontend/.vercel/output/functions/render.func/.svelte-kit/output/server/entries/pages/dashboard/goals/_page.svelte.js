import { c as create_ssr_component, f as each, b as add_attribute, e as escape } from "../../../../chunks/index.js";
import { u as userStore } from "../../../../chunks/store.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let userData = null;
  let messages = [];
  let newTaskName;
  let newTaskDur;
  let createModalOpen = false;
  let taskModalOpen = false;
  let tasks = [
    {
      id: 0,
      name: "",
      duration: 0,
      lastCompleted: "",
      creator: 0
    }
  ];
  let currentTask = {
    task: tasks[0],
    secondsRemaining: 0,
    formattedTime: "",
    percentage: 0,
    inProgress: false,
    paused: false
  };
  userStore.subscribe((d) => {
    userData = d;
    if (d) {
      tasks = d.data.tasks;
    }
  });
  return `${userData != null ? `<div class="${"flex justify-center flex-wrap w-[100%]"}">${each(tasks, (t, i) => {
    return `<div class="${"w-[95%] lg:w-[60%] m-2 " + escape(
      t.lastCompleted == new Date().toISOString().split("T")[0] ? "hidden" : "",
      true
    )}"><button for="${"task-modal"}" class="${"btn btn-outline rounded-3xl w-full h-24 normal-case text-3xl font-light"}"><p class="${"mx-5"}">${escape(t.name)}</p></button>
        </div>`;
  })}

    <div class="${"w-[95%] lg:w-[60%] m-2"}"><label for="${"create-modal"}" class="${"btn btn-primary btn-outline rounded-3xl w-full h-24 normal-case text-3xl font-light"}"><p class="${"mx-5"}">Create New Task</p>
            <svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"30"}" height="${"30"}" fill="${"currentColor"}" class="${"bi bi-plus-circle"}" viewBox="${"0 0 16 16"}"><path d="${"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"}"></path><path d="${"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"}"></path></svg></label></div></div>


<input type="${"checkbox"}" id="${"task-modal"}" class="${"modal-toggle"}"${add_attribute("checked", taskModalOpen, 1)}>
<div class="${"modal"}"><div class="${"modal-box"}"><h3 class="${"font-bold text-lg mb-2 -mt-2 text-center"}">${escape("")}&quot;${escape(currentTask.task.name)}&quot;</h3>

    <div class="${"flex justify-center"}">${(currentTask == null ? void 0 : currentTask.inProgress) ? `<div class="${"radial-progress m-5"}" style="${"--value:" + escape(currentTask.percentage, true) + ";--size:8rem;"}">${escape(currentTask.formattedTime)}</div>` : `<div class="${"text-left"}"><p>Task Name: <span class="${"font-semibold"}">${escape(currentTask.task.name)}</span></p>
                <p>Duration: <span class="${"font-semibold"}">${escape(currentTask.task.duration / 60)} mins</span></p></div>`}</div>


    <div class="${"modal-action flex justify-center"}">${`<label for="${"task-modal"}" class="${"btn btn-sm btn-circle absolute right-2 top-2"}">\u2715</label>
            <button class="${"btn btn-outline btn-error"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"20"}" height="${"20"}" fill="${"currentColor"}" class="${"bi bi-trash3"}" viewBox="${"0 0 16 16"}"><path d="${"M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"}"></path></svg></button>
            <button class="${"btn btn-outline btn-warning"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"20"}" height="${"20"}" fill="${"currentColor"}" class="${"bi bi-pencil"}" viewBox="${"0 0 16 16"}"><path d="${"M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"}"></path></svg></button>
            <button class="${"btn btn-outline btn-success"}">start</button>`}</div></div></div>


<input type="${"checkbox"}" id="${"create-modal"}" class="${"modal-toggle"}"${add_attribute("checked", createModalOpen, 1)}>
<div class="${"modal"}"><div class="${"modal-box"}"><label for="${"create-modal"}" class="${"btn btn-sm btn-circle absolute right-2 top-2"}">\u2715</label>
    <h3 class="${"font-bold text-lg mb-2 -mt-2"}">Create new task</h3>

    <form class="${"my-5"}">${messages.length ? `<div class="${"alert alert-warning shadow-lg"}"><div><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"stroke-current flex-shrink-0 h-6 w-6"}" fill="${"none"}" viewBox="${"0 0 24 24"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"}"></path></svg>
                <span>${escape(messages)}</span></div></div>` : ``}

        <div class="${"my-3"}"><p>Title</p>
            <input type="${"text"}" required placeholder="${"Task Title"}" class="${"input input-bordered input-primary w-full max-w-xs"}"${add_attribute("value", newTaskName, 0)}></div>

        <div class="${"my-3"}"><p>Duration (minutes)</p>
            <input type="${"number"}" required placeholder="${"Task Duration (minutes)"}" min="${"0"}" class="${"input input-bordered input-primary w-full max-w-xs"}"${add_attribute("value", newTaskDur, 0)}></div>

        <div class="${"modal-action"}"><button class="${"btn"}" type="${"submit"}">create
            </button></div></form>

    </div></div>` : `<div role="${"status"}"><svg aria-hidden="${"true"}" class="${"mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"}" viewBox="${"0 0 100 101"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"}" fill="${"currentColor"}"></path><path d="${"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"}" fill="${"currentFill"}"></path></svg>
    <span class="${"sr-only"}">Loading...</span></div>

Chess Path`}`;
});
export {
  Page as default
};
