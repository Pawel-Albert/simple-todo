const nameInputField = document.getElementById("name");
const freshTodoForm = document.getElementById("todoForm");

const userName = localStorage.getItem("userName") || "";
let todos = JSON.parse(localStorage.getItem("todos")) || [];

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
  };

  todos = [...todos, todo];
  console.table(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
  event.target.reset();
});

const listElement = document.querySelector("#todoList");
console.log(listElement);

const test = `
    <div class="todoItem">
            <label>
              <input type="checkbox" />
              <span class="dot business"> </span>
            </label>
            <div class="todoText">
              <input type="text" readonly value="Do some pussssshups" />
            </div>
            <div class="actionButtons">
              <button class="edit">Edit</button>
              <button class="delete">Delete</button>
            </div>
          </div>
`;

const test2 = `
       <div class="todoItem">
            <label>
              <input type="checkbox" />
              <span class="dot private"> </span>
            </label>
            <div class="todoText">
              <input type="text" readonly value="Do some pushups222" />
            </div>
            <div class="actionButtons">
              <button class="edit">Edit</button>
              <button class="delete">Delete</button>
            </div>
          </div>
`;

listElement.insertAdjacentHTML("afterbegin", test);
listElement.insertAdjacentHTML("afterbegin", test2);
listElement.insertAdjacentHTML("afterbegin", test);
listElement.insertAdjacentHTML("afterbegin", test2);
