
let tasks = [];

const taskContainer = document.getElementById("task-container");

const form = document.querySelector("form");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");

const filtroButtons = document.querySelectorAll(".filtro-nav button");

function atualizarContador() {
  const pendenteCount = tasks.filter((t) => t.status === "pendente").length;
  const concluidaCount = tasks.filter((t) => t.status === "concluido").length;
  const totalCount = tasks.length;

  const spans = document.querySelectorAll(".contador span");
  spans[0].querySelector("strong").textContent = pendenteCount;
  spans[1].querySelector("strong").textContent = concluidaCount;
  spans[2].querySelector("strong").textContent = totalCount;
}

filtroButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    let filterTasks = [];

    if (filter === "todas") {
      filterTasks = tasks;
    } else {
      filterTasks = tasks.filter((task) => task.status === filter);
    }
    renderTasks(filterTasks);
  });
});

async function carregarTasks() {
  try {
    const res = await fetch("https://api-manager-9kxc.onrender.com/task");

    tasks = await res.json();
    renderTasks(tasks);
    atualizarContador();
  } catch (error) {
    console.log("Erro ao carregar tasks:", error);
    alert("Não foi possível carregar as tarefas do servidor");
  }
}

carregarTasks();

async function criaTaskApi(title, description) {
  try {
    const res = await fetch("https://api-manager-9kxc.onrender.com/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status: "a_fazer",
      }),
    });

    if (!res.ok) throw new Error("Erro ao criar tarefa");

    const novaTask = await res.json();
    return novaTask;
  } catch (error) {
    console.log("Erro ao criar tarefa:", error);
    alert("Não foi possível criar a tarefa no servidor");
  }
}

async function atualizarTaskAPI(id, title, description, status) {
  try {
    const res = await fetch(
      `https://api-manager-9kxc.onrender.com/task/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status }),
      },
    );

    if (!res.ok) throw new Error("Erro ao atualizar tarefa");

    const taskAtualizada = await res.json();
    return taskAtualizada;
  } catch (error) {
    console.log("Erro ao atualizar tarefa:", error);
    alert("Não foi possível atualizar a tarefa");
  }
}

async function atualizarStatusAPI(id, novoStatus) {
  try {
    const res = await fetch(
      `https://api-manager-9kxc.onrender.com/task/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus }),
      },
    );

    if (!res.ok) throw new Error("Erro ao atualizar status");

    const taskAtualizada = await res.json();
    return taskAtualizada;
  } catch (error) {
    console.log("Erro ao atualizar status:", error);
    alert("Não foi possível atualizar o status da tarefa");
  }
}

async function deletarTaskAPI(id) {
  try {
    const res = await fetch(
      `https://api-manager-9kxc.onrender.com/task/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!res.ok) throw new Error("Erro ao deletar tarefa");

    return true; // sucesso
  } catch (error) {
    console.log("Erro ao deletar tarefa:", error);
    alert("Não foi possível deletar a tarefa");
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = inputTitle.value.trim();
  const description = inputDescription.value.trim();

  if (!title || !description) {
    alert("Preencha título e descrição!");
    return;
  }

  const novaTask = await criaTaskApi(title, description);
  if (novaTask) {
    tasks.push(novaTask);
    renderTasks(tasks);
    atualizarContador();

    inputTitle.value = "";
    inputDescription.value = "";
  }
});

function criandoElementoTask(task) {
  const article = document.createElement("article");

  article.classList.add(`task-${task.status}`);

  article.innerHTML = `
    <div class="info">
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Status: ${task.status}</p>
    </div>

    <div class="acoes">
      <button type="button" class="btn-concluir">✔</button>
      <button type="button" class="btn-editar">✏️</button>
      <button type="button" class="btn-deletar">🗑</button>
    </div>
  `;

  const btnConcluir = article.querySelector(".btn-concluir");

  btnConcluir.addEventListener("click", async () => {
    const novoStatus = task.status === "pendente" ? "concluido" : "pendente";
    const taskAtualizada = await atualizarStatusAPI(task.id, novoStatus);

    if (taskAtualizada) {
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks[index] = taskAtualizada;

      renderTasks(tasks);
      atualizarContador();
    }
  });

  const btnDeletar = article.querySelector(".btn-deletar");

  btnDeletar.addEventListener("click", async () => {
    const confirmDelete = confirm("Tem certeza que quer deletar?");
    if (!confirmDelete) return;

    const sucesso = await deletarTaskAPI(task.id);
    if (sucesso) {
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks.splice(index, 1);
      renderTasks(tasks);
      atualizarContador();
    }
  });

  const btnEditar = article.querySelector(".btn-editar");

  btnEditar.addEventListener("click", async () => {
    const infoDiv = article.querySelector(".info");
    const currentTitle = task.title;
    const currentDescription = task.description;
    const curentStatus = task.status;

    infoDiv.innerHTML = `
      <input type="text" class="edit-title" value="${currentTitle}" />
      <textarea class="edit-description">${currentDescription}</textarea>
      <select class="edit-status">
      <option value="a_fazer" ${curentStatus === "a_fazer" ? "selected" : ""}>Não iniciada</option>
      <option value="pendente" ${curentStatus === "pendente" ? "selected" : ""}>Pendente</option>
      <option value="concluido" ${curentStatus === "concluido" ? "selected" : ""}>Concluido</option>
      </select>`;

    const acoesDiv = article.querySelector(".acoes");
    acoesDiv.innerHTML = `
      <button class="btn-salvar">💾 Salvar</button>
      <button class="btn-cancelar">❌ Cancelar</button>
    `;

    const btnSalvar = acoesDiv.querySelector(".btn-salvar");
    const btnCancelar = acoesDiv.querySelector(".btn-cancelar");

    btnSalvar.addEventListener("click", async () => {
      const newTitle = infoDiv.querySelector(".edit-title").value.trim();
      const newDescription = infoDiv
        .querySelector(".edit-description")
        .value.trim();
      const newStatus = infoDiv.querySelector(".edit-status").value;

      if (!newTitle || !newDescription) {
        alert("Preencha título e descrição!");
        return;
      }

      const taskAtualizada = await atualizarTaskAPI(
        task.id,
        newTitle,
        newDescription,
        newStatus,
      );

      if (taskAtualizada) {
        const index = tasks.findIndex((t) => t.id === task.id);
        tasks[index] = taskAtualizada;

        renderTasks(tasks);
        atualizarContador();
      }
    });
    btnCancelar.addEventListener("click", () => {
      renderTasks(tasks);
    });
  });
  return article;
}

function renderTasks(taskList) {
  taskContainer.innerHTML = "";

  taskList.forEach((task) => {
    const taskElemt = criandoElementoTask(task);
    taskContainer.appendChild(taskElemt);
  });
}

renderTasks(tasks);
