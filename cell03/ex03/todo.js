const list = document.getElementById("ft_list");
let TodoList = [];

function createTodo(text) {
    const element = document.createElement('div');
    element.classList.add('todo');
    element.innerHTML = `<p>${text}</p> <button onclick="remove('${text}')">Delete</button>`;
    return element;
}

function render() {
    list.innerHTML = '';
    for (let index = 0; index < TodoList.length; index++) {
        const element = TodoList[index];
        list.appendChild(createTodo(element));  // Append elements instead of using innerHTML
    }
    saveTodos();
}

function newTodo() {
    let name = prompt("Name the todo.");
    if (name && name.trim().length > 0) {
        TodoList.unshift(name.trim());
        render();
    }
}

function remove(text) {
    let yes = confirm('Are you sure you want to remove this?');
    if (yes) {
        TodoList = TodoList.filter(a => a !== text);
        render();
    }
}

function saveTodos() {
    document.cookie = `todos=${encodeURIComponent(JSON.stringify(TodoList))}; path=/; max-age=86400`;
}

function loadTodos() {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('todos='));
    if (todoCookie) {
        TodoList = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
        render();
    }
}

window.onload = loadTodos;
