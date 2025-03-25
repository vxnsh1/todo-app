const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUl= document.getElementById('todo-list');

let allToDos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addToDo();
})

function addToDo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        }
        allToDos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = '';
    }
}

function updateTodoList(){
    todoListUl.innerHTML = '';
    allToDos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoListUl.append(todoItem);
    })
}

function createTodoItem(todo, todoIndex){
    const todoLi = document.createElement('li');
    const todoText = todo.text;
    const todoId = 'todo-'+todoIndex;
    todoLi.className = 'todo';
    todoLi.innerHTML = `
    <input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todoText}
                </label>
                <button class="delete-button">
                    <svg fill="var(--secondary)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
    ` 
    const deleteButton = todoLi.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        deleteTodoItem(todoIndex);
    })

    const checkbox = todoLi.querySelector('input');
    checkbox.addEventListener('change', () => {
        allToDos[todoIndex].completed = checkbox.checked;
        saveTodos();  
    })
    checkbox.checked = todo.completed;
    return todoLi;
}

function deleteTodoItem(todoIndex){
    allToDos = allToDos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}


function saveTodos(){
    const todoJson = JSON.stringify(allToDos);
    localStorage.setItem('todo', todoJson);
}

function getTodos(){
    const todos = localStorage.getItem('todo');
    return todos ? JSON.parse(todos) : [];
}