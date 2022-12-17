"use strict";
const nameInputField = document.getElementById("name");
const freshTodoForm = document.getElementById("todoForm");

const userName = localStorage.getItem("userName") || "";
let todos = JSON.parse(localStorage.getItem("todos")) || [];
const listElement = document.querySelector("#todoList");
nameInputField.value = userName;
nameInputField.addEventListener("change", (event) => {
  localStorage.setItem("userName", event.target.value);
});

freshTodoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const submit = document.querySelector("input[type = submit]");
  submit.value = "Create todo";
  const category = event.target.elements.cat.value;
  const subject = event.target.elements.subject.value;

  if (category === "" && subject === "") {
    submit.value = "Write some text God damn it and choose category!!!";
    return;
  }

  if (category === "") {
    submit.value = "Choose category!!!";
    return;
  }
  if (subject === "") {
    submit.value = "Write some text God damn it!!!";
    return;
  }
  const todo = {
    subject: subject,
    category: category,
    done: false,
    creationTime: new Date().getTime(),
    readonly: true,
  };

  todos = [...todos, todo];
  console.table(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
  event.target.reset();
  renderTodos();
});

function getTodos() {
  return JSON.parse(localStorage.getItem("todos"));
}
function markupTodos(data, index) {
  let readonly;
  data.readonly ? (readonly = "readonly") : (readonly = "");
  return `
       <div class="todoItem">
            <label>
              <input type="checkbox" />
              <span class="dot ${data.category}"> </span>
            </label>
            <div class="todoText">
              <input type="text" ${readonly} index=${index} value="${data.subject}" />
            </div>
            <div class="actionButtons">
              <button class="edit" index=${index} onclick="editTodo(this.index)">Edit</button>
              <button class="delete" index=${index} onclick="deleteTodo(this.index)">Delete</button>
            </div>
          </div>
`;
}
function renderTodos() {
  const todos = getTodos();
  listElement.innerHTML = "";
  todos?.forEach((todo, index) => {
    listElement.insertAdjacentHTML("afterbegin", markupTodos(todo, index));
  });
}

function deleteTodo(index) {
  todos = getTodos();
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function editTodo(thisIndex) {
  let taskIndex = thisIndex;
  todos = getTodos();
  todos?.forEach((_, index, todos) => {
    if ((taskIndex = todos[index])) {
      todos[index].readonly
        ? (todos[index].readonly = false)
        : (todos[index].readonly =
            true &&
            (todos[index].subject = document.querySelector(
              `input[index='${index}']`
            ).value));
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  console.table(todos);
  renderTodos();
}
renderTodos();
