import { c as create_ssr_component, e as escape, f as each, b as add_attribute } from "../../../../chunks/index.js";
import { u as userStore, t as taskClaimed } from "../../../../chunks/store.js";
const Confetti_svelte_svelte_type_style_lang = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let userData = null;
  let stats = { completed: 1, claimed: true };
  userStore.subscribe((d) => {
    userData = d;
    taskClaimed.subscribe((t) => {
      stats.claimed = t;
      if (userData) {
        stats.completed = t ? userData.data.current_streak : userData.data.current_streak - 1;
      }
    });
  });
  let progressVal = 0;
  return `${userData != null ? `<div class="${"overflow-x-hidden w-[100%]"}"><h1 class="${"text-center text-5xl mb-32 p-1"}">${escape(userData == null ? void 0 : userData.username)}&#39;s Path</h1>
    <div class="${"flex flex-wrap w-[100%] justify-evenly"}"><div class="${"text-center text-cyan-600 dark:text-cyan-300 p-5"}"><p class="${"text-3xl py-2"}">Tasks Completed:</p>
            <p class="${"text-3xl"}"><span class="${"font-extrabold"}">${escape(userData.data.total_completed)}</span>
                <span class="${"text-xl"}">tasks</span></p></div>
        <div class="${"text-center text-blue-600 dark:text-blue-300 p-5"}"><p class="${"text-3xl py-2"}">Last Completed:</p>
            <p class="${"text-3xl"}"><span class="${"font-extrabold"}">${escape(userData.data.last_completion || "---")}</span>
                </p></div>
        <div class="${"text-center text-purple-600 dark:text-purple-300 p-5"}"><p class="${"text-3xl py-2"}">Highest Streak:</p>
            <p class="${"text-3xl"}"><span class="${"font-extrabold"}">${escape(userData.data.record)}</span>
                 <span class="${"text-xl"}">days</span></p></div></div>

    <div class="${"flex flex-nowrap w-[100%] overflow-x-auto p-5 my-52 pb-10 pt-32"}"><button class="${"btn btn-success rounded-full w-24 h-24 text-4xl border-4"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"45"}" height="${"45"}" fill="${"currentColor"}" class="${"bi bi-house"}" viewBox="${"0 0 16 16"}"><path fill-rule="${"evenodd"}" d="${"M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"}"></path><path fill-rule="${"evenodd"}" d="${"M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"}"></path></svg></button>

        ${each(Array(stats.completed + 7), (_, i) => {
    return `<progress class="${"progress progress-success w-36 min-w-min h-3 mt-10 mx-1 bg-inherit border-2 " + escape(
      i > stats.completed ? "border-gray-500" : "border-green-400",
      true
    )}"${add_attribute(
      "value",
      i > stats.completed ? 0 : i == stats.completed ? progressVal : 100,
      0
    )}${add_attribute("max", 100, 0)}></progress>
            
            <button class="${"" + escape(i >= stats.completed ? "btn-outline" : "", true) + " btn btn-success rounded-full w-24 h-24 text-4xl border-4"}" ${i > stats.completed ? "disabled" : ""}${add_attribute("id", i + 2 == stats.completed ? "next" : "", 0)}>${escape(i + 1)}
                ${``}
            </button>`;
  })}</div>

    ${``}</div>` : `<div role="${"status"}"><svg aria-hidden="${"true"}" class="${"mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"}" viewBox="${"0 0 100 101"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"}" fill="${"currentColor"}"></path><path d="${"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"}" fill="${"currentFill"}"></path></svg>
    <span class="${"sr-only"}">Loading...</span></div>

Chess Path`}`;
});
export {
  Page as default
};
