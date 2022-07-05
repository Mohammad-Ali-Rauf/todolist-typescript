import { v4 as uuid } from "uuid";

type Task = {
    id: string
    title: string
    completed: boolean
    createdAt: Date
}

const list = document.getElementById("list") as HTMLUListElement | null;
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.getElementById("new-task-title") as HTMLInputElement | null;
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuid(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  saveTasks();

  addListItem(newTask);
  input.value = '';
});

function addListItem(task: Task) {
    const item = document.createElement('li')
    const label = document.createElement('label')
    const  checkbox = document.createElement('input')
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked
    })
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    label.append(checkbox, task.title)
    item.append(label)
    list?.append(item)
}

function saveTasks() {
    localStorage.setItem('Tasks', JSON.stringify(tasks))
}

function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem('Tasks')
    if(taskJSON == null) return [] 
    return JSON.parse(taskJSON)
}