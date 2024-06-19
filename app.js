let added_todo = document.getElementById("todo");
let finded_todo = document.getElementById("filter");
let todo_list = document.getElementsByClassName("list-group")[0];
let form = document.getElementById("todo-form");
let clear_todos_btn = document.getElementById("clear-todos");

form.addEventListener("submit", addToDo);
todo_list.addEventListener("click", deleteTodo);
finded_todo.addEventListener("keyup", filterTodos);
clear_todos_btn.addEventListener("click", clearToDos);
document.addEventListener("DOMContentLoaded", BringTodosFromStorage);

function addToDo(e) {
    if (added_todo.value.trim() === "") {
        console.log("Input is empty !!!");
    }
    else {
        createNewToDo();
        addToDoToStorage(added_todo.value);
    }
    added_todo.value = "";
    e.preventDefault();
}

function createNewToDo() {
    let tag_a = document.createElement("a");
    let tag_i = document.createElement("i");
    let new_todo = document.createElement("li");

    new_todo.setAttribute("class", "todo");
    tag_i.setAttribute("class", "fa fa-remove");

    tag_a.appendChild(tag_i);
    new_todo.appendChild(document.createTextNode(added_todo.value));
    new_todo.appendChild(tag_a);
    todo_list.appendChild(new_todo);
}

function deleteTodo(e) {
    if (e.target.className == "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e);
    }
}

function filterTodos() {
    let finded_todo_lower = finded_todo.value.toLowerCase();
    let todos = document.getElementsByClassName("todo");
    let todos_array = [...todos];

    todos_array.forEach(todo => {
        let text = todo.textContent.toLowerCase();

        if (text.includes(finded_todo_lower)) {
            todo.setAttribute("style", "display:flex;");
        }
        else {
            todo.setAttribute("style", "display:none;");
        }
    });
}

function addToDoToStorage(todo) {
    if (localStorage.getItem("todos") === null) {
        let todos = [];
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    else {
        let todos = JSON.parse(localStorage.getItem("todos"));
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

function BringTodosFromStorage() {
    let todos = JSON.parse(localStorage.getItem("todos"));

    if (todos !== null) {
        todos.forEach(todo => {
            let tag_a = document.createElement("a");
            let tag_i = document.createElement("i");
            let new_todo = document.createElement("li");

            new_todo.setAttribute("class", "todo");
            tag_i.setAttribute("class", "fa fa-remove");

            tag_a.appendChild(tag_i);
            new_todo.appendChild(document.createTextNode(todo));
            new_todo.appendChild(tag_a);
            todo_list.appendChild(new_todo);
        })
    }
}

function clearToDos() {
    confirm("All to-dos will be deleted !!!")
    localStorage.removeItem("todos");
    location.reload();
}

function deleteTodoFromStorage(e) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let text_content = e.target.parentElement.parentElement.textContent;

    todos.forEach((todo, index) => {
        if (todo === text_content) {
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    });
}