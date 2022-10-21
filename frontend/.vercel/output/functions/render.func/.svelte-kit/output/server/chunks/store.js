import { w as writable } from "./index2.js";
const userStore = writable(null);
const taskClaimed = writable(true);
export {
  taskClaimed as t,
  userStore as u
};
