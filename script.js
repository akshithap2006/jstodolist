const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const list = document.getElementById("list");
const stats = document.getElementById("stats");
const addBtn = document.getElementById("addBtn");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Events
addBtn.addEventListener("click", addTask);
themeToggle.addEventListener("click", toggleTheme);

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    text,
    done: false,
    priority: priority.value
  });

  taskInput.value = "";
  save();
  render();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  save();
  render();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  save();
  render();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";
  let completed = 0;

  tasks.forEach((task, index) => {
    if (task.done) completed++;

    list.innerHTML += `
      <li class="${task.done ? "completed" : ""}">
        <span onclick="toggleTask(${index})">${task.text}</span>
        <span class="priority ${task.priority}">${task.priority}</span>
        <button onclick="deleteTask(${index})">🗑️</button>
      </li>
    `;
  });

  stats.textContent =
    `Total: ${tasks.length} | Completed: ${completed} | Pending: ${tasks.length - completed}`;
}

render();
