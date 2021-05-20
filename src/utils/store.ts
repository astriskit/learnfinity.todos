export interface Task {
  id: string;
  title: string;
  done: boolean;
  lastUpdated: number;
}
export const getTasks = (): Task[] => {
  const tasksStr = localStorage.getItem("tasks");
  if (tasksStr) {
    return JSON.parse(tasksStr);
  }
  localStorage.setItem("tasks", JSON.stringify([]));
  return [];
};
export const setTasks = (tasks: Task[]): void => {
  if (tasks.length) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};
export const clearTasks = () => {
  localStorage.clear();
};
