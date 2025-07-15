let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function mostrarMensagem(mensagem) {
  const PMsg = document.getElementById("PMsg");
  PMsg.textContent = mensagem;
}

function adicionarTarefas() {
  const input = document.getElementById("tarefainput");
  const tarefa = input.value.trim();

  if (tarefa === "") {
    mostrarMensagem("Por favor, digite uma tarefa válida!");
    return;
  }

  tarefas.push(tarefa);
  salvarTarefas();
  mostrarMensagem("Tarefa adicionada com sucesso! ✅");
  input.value = "";
  input.focus();
}

function listarTarefas() {
  const PMsg = document.getElementById("PMsg");

  if (tarefas.length === 0) {
    mostrarMensagem("Nenhuma tarefa na lista.");
    return;
  }

  PMsg.innerHTML = "<strong>Tarefas:</strong><br>" + tarefas.map((t, i) => `${i + 1}. ${t}`).join("<br>");
}

function atualizarTarefas() {
  const antiga = prompt("Digite a tarefa que deseja atualizar:");
  const index = tarefas.indexOf(antiga);

  if (index === -1) {
    mostrarMensagem("Tarefa não encontrada.");
    return;
  }

  const nova = prompt("Digite a nova tarefa:");
  if (!nova || nova.trim() === "") {
    mostrarMensagem("Nova tarefa inválida.");
    return;
  }

  tarefas[index] = nova.trim();
  salvarTarefas();
  mostrarMensagem("Tarefa atualizada com sucesso! ✏️");
}

function excluirTarefas() {
  const indice = prompt("Digite o número da tarefa que deseja excluir:");
  const pos = parseInt(indice) - 1;

  if (isNaN(pos) || pos < 0 || pos >= tarefas.length) {
    mostrarMensagem("Número inválido.");
    return;
  }

  const confirmacao = confirm(`Deseja realmente excluir: "${tarefas[pos]}"?`);
  if (confirmacao) {
    tarefas.splice(pos, 1);
    salvarTarefas();
    mostrarMensagem("Tarefa excluída com sucesso! ❌");
  }
}
