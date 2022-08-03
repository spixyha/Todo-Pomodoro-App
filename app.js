const list = document.getElementById("todoList");
const form = document.getElementById("todoForm");
const todoText = document.getElementById("todoText");

const todos = [];

function renderTodos() {
    list.innerHTML = "";
    todos.forEach(todo => {
        if (todo.isRemoved === false) {
            renderTodo(todo);
        }
    })
}

function renderTodo(todo) {
    list.innerHTML += `    
    <li>
        <input onclick="tickTodo(${todo.id})" type="checkbox" id="item${todo.id}"${todo.checkbox}>
        <label for="item${todo.id}" class="${todo.checkbox} label${todo.id}">${todo.text}</label>
        <button>Edit</button>
        <button onclick="removeTodo(${todo.id})">x</button>
    </li>`;
}

function addTodo(todo) {
    todos.push({
        id: todo.id,
        text: todo.text,
        isRemoved: todo.isRemoved,
        checkbox: todo.checkbox
    })
    renderTodo(todo);
}

function tickTodo(tickId) {
    const todoIndex = todos.findIndex(todo => todo.id === tickId);
    todos[todoIndex].checkbox === "unchecked" ? todos[todoIndex].checkbox = "checked" : todos[todoIndex].checkbox = "unchecked";
    renderTodos();
}

function removeTodo(removeId) {
    todoIndex = todos.findIndex(todo => todo.id === removeId);
    todos[todoIndex].isRemoved = true;
    renderTodos();
}

form.addEventListener("submit", e => {
    e.preventDefault();

    addTodo({
        id: todos.length + 1,
        text: todoText.value,
        isRemoved: false,
        checkbox: "unchecked"
    });

    todoText.value = "";
})
