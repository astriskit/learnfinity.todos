import { atom } from "jotai";
import { nanoid } from "nanoid";

import { Task, getTasks, setTasks, clearTasks as cT } from "../utils";

export const tasks = atom<Task[], Task[]>([], (_, set, update) => {
  set(tasks, update);
  if (update.length) {
    setTasks(update);
  } else {
    cT();
  }
});
tasks.onMount = (update) => {
  update(getTasks());
};

export const addTask = atom(
  null,
  (get, set, task: Omit<Task, "lastUpdated" | "id">) => {
    const ts = get<Task[]>(tasks);
    set(tasks, [{ ...task, lastUpdated: Date.now(), id: nanoid(10) }, ...ts]);
  }
);

export const clearTasks = atom(null, (_, set) => {
  set(tasks, []);
});

export const toggleTaskDone = atom(null, (get, set, idx: string) => {
  const ts = get(tasks);
  const uTs = ts.map(({ id, done, lastUpdated, ...restTask }) => ({
    id,
    done: idx === id ? !done : done,
    lastUpdated: idx === id ? Date.now() : lastUpdated,
    ...restTask,
  }));
  set(tasks, uTs);
});

export const sortedTasks = atom((get) => {
  const ts = get(tasks);
  let dTs = [];
  let uTs = [];
  for (const t of ts) {
    if (t.done) {
      dTs.push(t);
    } else {
      uTs.push(t);
    }
  }
  const numSorter = (a: Task, b: Task) => b.lastUpdated - a.lastUpdated;
  dTs.sort(numSorter);
  uTs.sort(numSorter);
  return [...uTs, ...dTs];
});
