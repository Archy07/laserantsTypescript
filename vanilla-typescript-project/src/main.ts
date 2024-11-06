import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
import { Task } from './Interface/task.ts';


// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

const todoListElement = document.createElement('ul');

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="container">
    <div class="row>
        <div class="col-12">To do list:</div>
    </div>
    <div class="row">
        <div class="col-4">New Task: </div>
        <div class="col-4"><input class="form-control" type="text" id="txtTask"/> </div>
        <div class="col-4"><button type="button" class="btn btn-dark" id="btnAdd">Add</button> </div>
    </div>
    <div class="row">
        <div class="col" id="divListado"></div>
    </div>
</div>
`;

const divListado = document.getElementById("divListado");
const btnAdd = document.getElementById("btnAdd");
const txtTask = <HTMLInputElement>document.getElementById("txtTask");
divListado?.append(todoListElement);

let initialTask: Task = { id: 1, text: "Tarea", completed: false };
let taks: Task[] = [initialTask];
let idCounter = 1;

function renderTodos() {
  todoListElement.innerHTML = ''; // Limpiar la lista antes de renderizar
  taks.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.completed) {
      li.classList.add('completed');
    }

    // Botón para marcar la tarea como completada
    const toggleButton = document.createElement('button');
    toggleButton.textContent = todo.completed ? 'Undo' : 'Done';
    toggleButton.addEventListener('click', () => toggleTodoCompletion(todo.id));

    // Botón para eliminar la tarea
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTodo(todo.id));

    li.appendChild(toggleButton);
    li.appendChild(deleteButton);
    todoListElement.appendChild(li);
  });
}

btnAdd?.addEventListener('click', () => {
  const text = txtTask?.value.trim();
  if (text) {
    const newTodo: Task = {
      id: ++idCounter,
      text: text,
      completed: false
    };
    taks.push(newTodo);
    txtTask.value = ''; // Limpiar el campo de entrada
    renderTodos();
  }
});

// Función para marcar una tarea como completada
function toggleTodoCompletion(id: number) {
  const todo = taks.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}

// Función para eliminar una tarea
function deleteTodo(id: number) {
  taks = taks.filter(todo => todo.id !== id);
  renderTodos();
}

renderTodos();
