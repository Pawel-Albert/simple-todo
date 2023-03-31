"use strict";

// DOM Elements and Variables
const nameInputField = document.getElementById("name");
const freshTodoForm = document.getElementById("todoForm");
const todoText = document.querySelector(".todoText input");
const userName = localStorage.getItem("userName") || "";
const listElement = document.querySelector("#todoList");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Event Listeners
nameInputField.value = userName;
nameInputField.addEventListener("change", onNameInputChange);
freshTodoForm.addEventListener("submit", onFormSubmit);
listElement.addEventListener("click", onListElementClick);

// Functions
function onNameInputChange(event) {
  localStorage.setItem("userName", event.target.value);
}

function onFormSubmit(event) {
  event.preventDefault();
  const submit = document.querySelector("input[type = submit]");
  submit.value = "Create todo";
  const category = event.target.elements.cat.value;
  const subject = event.target.elements.subject.value;

  if (category === "" && subject.trim() === "") {
    submit.value = "Write some text and choose category!!!";
    return;
  }

  if (category === "") {
    submit.value = "Choose category!";
    return;
  }
  if (subject.trim() === "") {
    submit.value = "Write some text!";
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
  setTodos(todos);
  event.target.reset();
  renderTodos();
}

function onListElementClick(e) {
  if (e.target.type === "checkbox") {
    markAsDone(e.target.value);
  }
}

function getTodos() {
  return JSON.parse(localStorage.getItem("todos"));
}

function setTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function markupTodos(data, index) {
  let readonly, editClass, editSaveText, textClass, completed;

  if (data.readonly) {
    readonly = "readonly";
    editClass = "edit";
    editSaveText = "Edit";
    textClass = "";
  } else {
    readonly = "";
    editClass = "save";
    editSaveText = "Save";
    textClass = "edited";
  }
  if (data.done) {
    completed = "checked";
  } else {
    completed = "";
  }
  return `
       <div class="todoItem">
            <label>
              <input value=${index} type="checkbox" ${completed} />
              <span class="dot ${data.category}"> </span>
            </label>
            <div class="todoText">
              <input type="text" ${readonly} class="${textClass} ${completed}" data-index=${index} value="${data.subject}" />
            </div>
            <div class="actionButtons">
              <button class="${editClass}" value=${index} onclick="editTodo(this.value)">${editSaveText}</button>
              <button class="delete" value=${index} onclick="deleteTodo(this.value)">Delete</button>
            </div>
          </div>
`;
}

function renderTodos() {
  const todos = getTodos();
  listElement.innerHTML = "";
  todos?.forEach((todo, index) => {
    listElement.insertAdjacentHTML("beforeend", markupTodos(todo, index));
  });
}

function deleteTodo(index) {
  todos = getTodos();
  todos.splice(index, 1);
  setTodos(todos);
  renderTodos();
}

function editTodo(thisIndex) {
  let taskIndex = thisIndex;
  todos = getTodos();
  todos?.forEach((_, index, todos) => {
    if (taskIndex == index) {
      let i = `"${index}"`;
      todos[index].readonly
        ? (todos[index].readonly = false)
        : (todos[index].readonly = true) &&
          (todos[index].subject = document.querySelector(
            "input[data-index=" + i + "]"
          ).value) &&
          (document.querySelector("input[data-index=" + i + "]").styles =
            "red");
    }
  });
  setTodos(todos);
  renderTodos();
}

function markAsDone(value) {
  let taskIndex = value;
  todos = getTodos();
  todos?.forEach((_, index, todos) => {
    if (taskIndex == index) {
      todos[index].done
        ? (todos[index].done = false)
        : (todos[index].done = true);
    }
  });
  setTodos(todos);
  renderTodos();
}

// Initial render
renderTodos();
