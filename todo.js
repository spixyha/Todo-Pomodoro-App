const list = document.getElementById("todoList");
const form = document.getElementById("todoForm");
const todoText = document.getElementById("todoText");

let todos = [];

function renderTodos() {
    list.innerHTML = "";
    todos = todos.filter(todo => todo.isRemoved === false)
    todos.forEach(todo => renderTodo(todo));
}

function renderTodo(todo) {
    list.innerHTML += `    
    <li class="li${todo.id}">
        <input onclick="tickTodo(${todo.id})" type="checkbox" id="item${todo.id}"${checkIfChecked(todo.isChecked)}>
        <label for="item${todo.id}" class="${checkIfChecked(todo.isChecked)}">${todo.text}</label>
        <button onclick="editTodo(${todo.id})">Edit</button>
        <button onclick="proceed(${todo.id})">Proceed</button>
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

const checkIfChecked = isCheckedProperty => isCheckedProperty ? "checked" : "";

function tickTodo(tickId) {
    const todoIndex = todos.findIndex(todo => todo.id === tickId);
    todos[todoIndex].isChecked ? todos[todoIndex].isChecked = false : todos[todoIndex].isChecked = true;
    renderTodos();
}

function removeTodo(removeId) {
    todoIndex = todos.findIndex(todo => todo.id === removeId);
    todos[todoIndex].isRemoved = true;
    renderTodos();
}

function editTodo(editId) {
    const todoIndex = todos.findIndex(todo => todo.id === editId);
    const itemToEdit = document.querySelector(`.li${todos[todoIndex].id}`);
    itemToEdit.innerHTML = `
    <form class="form${todos[todoIndex].id} editForm">
        <input class="input${todos[todoIndex].id}" "type="text" value="${todos[todoIndex].text}">
        <button>Save</button>
    </form>`;
    const grabEditedInput = document.querySelector(`.input${todos[todoIndex].id}`)
    const end = grabEditedInput.value.length
    grabEditedInput.setSelectionRange(end, end);
    grabEditedInput.focus();
    const saveForm = document.querySelector(`.form${todos[todoIndex].id}`)
    saveForm.addEventListener("submit", e => {
        e.preventDefault();
        todos[todoIndex].text = grabEditedInput.value;
        renderTodos();
    })
}
function proceed(proceedId) {
    const todoIndex = todos.findIndex(todo => todo.id === proceedId);
    title.innerText = `${todos[todoIndex].text}`;
}

form.addEventListener("submit", e => {
    e.preventDefault();

    addTodo({
        id: Math.floor(Math.random() * 10000000),
        text: todoText.value,
        isRemoved: false,
        isChecked: false
    });

    todoText.value = "";
})
