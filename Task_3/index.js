const input = document.getElementById("inputBox");
const btn = document.getElementById("addBtn");
const todoList = document.getElementById("todolist");

let editToDo = null;

const addToDo = () => {
  const inputText = input.value.trim();
  if (inputText.length <= 0) {
    alert("Please type something");
    return false;
  }

  if (btn.value === "Edit") {
    editToDo.target.previousElementSibling.innerHTML = inputText;
    editLocalToDo(inputText);
    btn.value = "Add";
    input.value = "";
    
  } else {
    // creating p tag
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // creating edit button
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("btn", "editbtn");
    li.appendChild(editBtn);

    // creating delete button
    const deletebtn = document.createElement("button");
    deletebtn.innerHTML = "Delete";
    deletebtn.classList.add("btn", "deletebtn");
    li.appendChild(deletebtn);

    todoList.appendChild(li);
    input.value = "";
    saveToDo(inputText);
  }
};

const updateToDo = (e) => {
  if (e.target.innerHTML === "Delete") {
    todoList.removeChild(e.target.parentElement);
    deleteLocalToDo(e.target.parentElement)
  }
  if (e.target.innerHTML === "Edit") {
    input.value = e.target.previousElementSibling.innerHTML;
    input.focus();
    btn.value = "Edit";
    editToDo = e;
  }
};

const saveToDo = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getAllToDo = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      // creating p tag
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      // creating edit button
      const editBtn = document.createElement("button");
      editBtn.innerHTML = "Edit";
      editBtn.classList.add("btn", "editbtn");
      li.appendChild(editBtn);

      // creating delete button
      const deletebtn = document.createElement("button");
      deletebtn.innerHTML = "Delete";
      deletebtn.classList.add("btn", "deletebtn");
      li.appendChild(deletebtn);

      todoList.appendChild(li);
    });
  }
};
const deleteLocalToDo= (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todoText = todo.children[0].innerHTML;
    let toDoIndex = todos.indexOf(todoText);
    todos.splice(toDoIndex , 1)
    localStorage.setItem("todos" , JSON.stringify(todos))
}; 

const editLocalToDo = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let toDoIndex = todos.indexOf(todo);
  todos[toDoIndex] = input.value;
  localStorage.getItem('todos' , JSON.stringify(todos))
}

document.addEventListener('DOMContentLoaded' , getAllToDo)
btn.addEventListener("click", addToDo);
todoList.addEventListener("click", updateToDo);
