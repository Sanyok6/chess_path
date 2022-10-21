import { c as create_ssr_component, e as escape, b as add_attribute } from "../../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let messages = [];
  let email;
  let password;
  return `


<div class="${"h-[70vh] flex flex-col items-center justify-center"}"><div class="${"flex items-center justify-center bg-slate-200 dark:bg-slate-900 pt-14 pb-16 px-10 rounded-2xl min-w-[400px]"}"><div class="${"w-full max-w-md space-y-8"}"><div><p class="${"font-extralight text-center text-xl mb-4"}">Chess Path</p>
          <h2 class="${"text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"}">Log in to your account</h2></div>
        <form class="${"mt-8 space-y-6"}">${messages.length ? `<div class="${"alert alert-warning"}">${escape(messages.toString())}</div>` : ``}
          <input type="${"hidden"}" name="${"remember"}" value="${"true"}">
          <div class="${"-space-y-px rounded-md shadow-sm"}"><div><label for="${"email-address"}" class="${"sr-only"}">Email address</label>
              <input id="${"email-address"}" name="${"email"}" type="${"email"}" autocomplete="${"email"}" required class="${"relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}" placeholder="${"Email address"}"${add_attribute("value", email, 0)}></div>
            <div><label for="${"password"}" class="${"sr-only"}">Password</label>
              <input id="${"password"}" name="${"password"}" type="${"password"}" autocomplete="${"current-password"}" required class="${"relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}" placeholder="${"Password"}"${add_attribute("value", password, 0)}></div></div>
    
          <div class="${"text-center"}"><button type="${"submit"}" class="${"group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"}">Sign in
            </button>
            <div class="${"mt-5"}"><a class="${"underline"}" href="${"/auth/signup"}">Sign up instead</a></div></div></form></div></div></div>`;
});
export {
  Page as default
};
