import { c as create_ssr_component } from "../../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"text-center"}"><p>Logout sucsessful!</p>
    <a class="${"text-blue-500 underline"}" href="${"/"}">Return home</a></div>`;
});
export {
  Page as default
};
