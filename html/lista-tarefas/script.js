const formulario = document.querySelector("#formulario");
const input = document.querySelector("#tarefa");
const listaUl = document.querySelector("#listaUl");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const texto = input.value;

    const li = document.createElement("li");
    li.textContent = texto;
    li.classList.add("tarefaLi");

    listaUl.appendChild(li);


    input.value = ""
});