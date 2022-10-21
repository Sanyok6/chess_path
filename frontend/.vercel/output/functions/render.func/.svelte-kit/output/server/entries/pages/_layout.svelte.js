import { c as create_ssr_component, b as add_attribute } from "../../chunks/index.js";
import { u as userStore } from "../../chunks/store.js";
import "theme-change";
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let theme = "light";
  userStore.subscribe((d) => d);
  return `<body${add_attribute("class", theme, 0)}><div class="${"bg-[#f7f7f5] dark:bg-gray-800 h-[100vh] dark:text-white font-sans"}"><div class="${"navbar bg-base-100 border-b-2 dark:border-b-0"}"><div class="${"flex-1"}"><a class="${"btn btn-ghost normal-case text-xl text-black dark:text-blue-300"}" href="${"/"}">Chess Path</a></div>
            <div class="${"flex-none"}"><ul class="${"menu menu-horizontal p-0"}"><li><button${add_attribute("data-set-theme", "dark", 0)} data-act-class="${"ACTIVECLASS"}">${`<svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"16"}" height="${"16"}" fill="${"currentColor"}" class="${"bi bi-moon"}" viewBox="${"0 0 16 16"}"><path d="${"M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"}"></path></svg>`}</button></li>
                    ${`<li><a href="${"/auth/login"}">Login</a></li>
                        <li><a href="${"/auth/signup"}">Signup</a></li>`}</ul></div></div>
        <main>${slots.default ? slots.default({}) : ``}</main></div></body>`;
});
export {
  Layout as default
};
