
const API_URL = "http://localhost:3000/tasks";


const form = document.getElementById("task-form");

const taskList = document.getElementById("task-list");

async function createTask(task) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const newTask = await response.json();

    const taskCard = createTaskCard(newTask);
    taskList.appendChild(taskCard);

  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
  }
}

  async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {
      const taskCard = createTaskCard(task);
      taskList.appendChild(taskCard);
    });

  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
  }
}


form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value;

  const task = {
    title,
    description,
    status,
  };
  
  createTask(task)

  form.reset();
});

function createTaskCard(task) {
  const article = document.createElement("article");
  article.classList.add("task-card");

  const titleEl = document.createElement("h3");
  titleEl.textContent = task.title;

  const descEl = document.createElement("p");
  descEl.textContent = task.description;

  const statusEl = document.createElement("span");
  statusEl.classList.add("status", task.status);
  statusEl.textContent = formatStatus(task.status);

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Concluir";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Excluir";
  deleteBtn.classList.add("delete");

  actions.append(doneBtn, deleteBtn);
  article.append(titleEl, descEl, statusEl, actions);

  return article;
}

function formatStatus(status) {
  if (status === "todo") return "A fazer";
  if (status === "pending") return "Pendente";
  if (status === "done") return "Concluído";
}

fetchTasks();
