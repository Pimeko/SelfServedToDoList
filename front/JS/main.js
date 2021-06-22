// Selectors

const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');

// Event Listeners

toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deletecheck);
document.addEventListener("DOMContentLoaded", async () => {
    await initTheme()
    await getTodos()
});
// document.addEventListener("DOMContentLoaded", getTodos);
standardTheme.addEventListener('click', async () => await changeTheme('standard'));
lightTheme.addEventListener('click', async () => await changeTheme('light'));
darkerTheme.addEventListener('click', async () => await changeTheme('darker'));

// Check if one theme has been set previously and apply it (or std theme if not found):
let savedTheme = ""

// Functions;
function addToDo(event) {
    // Prevents form from submitting / Prevents form from relaoding;
    event.preventDefault();

    // toDo DIV;
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    // Create LI
    const newToDo = document.createElement('li');
    if (toDoInput.value === '') {
            alert("You must write something!");
        } 
    else {
        // newToDo.innerText = "hey";
        newToDo.innerText = toDoInput.value;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        // Adding to local storage;
        savelocal(toDoInput.value);

        // check btn;
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(checked);
        // delete btn;
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        // Append to list;
        toDoList.appendChild(toDoDiv);

        // CLearing the input;
        toDoInput.value = '';
    }

}   


function deletecheck(event){

    // console.log(event.target);
    const item = event.target;

    // delete
    if(item.classList[0] === 'delete-btn')
    {
        // item.parentElement.remove();
        // animation
        item.parentElement.classList.add("fall");

        //removing local todos;
        removeLocalTodos(item.parentElement);

        item.parentElement.addEventListener('transitionend', function(){
            item.parentElement.remove();
        })
    }

    // check
    if(item.classList[0] === 'check-btn')
    {
        item.parentElement.classList.toggle("completed");
    }


}


// Saving to local storage:
async function savelocal(todo){
    //Check: if item/s are there;
    let todos;
    const remoteTodos = await remoteGetTodos()
    if (remoteTodos === "") {
        todos = [];
    }
    else {
        todos = JSON.parse(remoteTodos);
    }

    todos.push(todo);
    await remoteUpdateTodos(JSON.stringify(todos))
}



async function getTodos() {
    //Check: if item/s are there;
    let todos;
    const remoteTodos = await remoteGetTodos()
    if (remoteTodos === "") {
        todos = [];
    }
    else {
        todos = JSON.parse(remoteTodos);
    }

    todos.forEach(function(todo) {
        // toDo DIV;
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo", `${savedTheme}-todo`);

        // Create LI
        const newToDo = document.createElement('li');
        
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        // check btn;
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(checked);
        // delete btn;
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        // Append to list;
        toDoList.appendChild(toDoDiv);
    });
}


async function removeLocalTodos(todo){
    //Check: if item/s are there;
    let todos;
    const remoteTodos = await remoteGetTodos()
    if (remoteTodos === "") {
        todos = [];
    }
    else {
        todos = JSON.parse(remoteTodos);
    }

    const todoIndex =  todos.indexOf(todo.children[0].innerText);
    // console.log(todoIndex);
    todos.splice(todoIndex, 1);
    // console.log(todos);
    await remoteUpdateTodos(JSON.stringify(todos))
}

// Change theme function:
async function changeTheme(color) {
    remoteUpdateTheme(color)
    savedTheme = await remoteGetTheme()

    document.body.className = color;
    // Change blinking cursor for darker theme:
    color === 'darker' ? 
        document.getElementById('title').classList.add('darker-title')
        : document.getElementById('title').classList.remove('darker-title');

    document.querySelector('input').className = `${color}-input`;
    // Change todo color without changing their status (completed or not):
    document.querySelectorAll('.todo').forEach(todo => {
        Array.from(todo.classList).some(item => item === 'completed') ? 
            todo.className = `todo ${color}-todo completed`
            : todo.className = `todo ${color}-todo`;
    });
    // Change buttons color according to their type (todo, check or delete):
    document.querySelectorAll('button').forEach(button => {
        Array.from(button.classList).some(item => {
            if (item === 'check-btn') {
              button.className = `check-btn ${color}-button`;  
            } else if (item === 'delete-btn') {
                button.className = `delete-btn ${color}-button`; 
            } else if (item === 'todo-btn') {
                button.className = `todo-btn ${color}-button`;
            }
        });
    });
}

async function getData(url) {
    return await fetch('http://localhost:2696/api/' + url)
}

async function postData(url, body) {
    return await fetch('http://localhost:2696/api/' + url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
    })
}

///// THEME /////
async function initTheme() {
    savedTheme = await remoteGetTheme()
    await changeTheme(savedTheme === "" ? 'standard' : savedTheme)
}

async function remoteGetTheme() {
    const response = await getData("theme")
    const toText = await response.text()
    return toText
}

async function remoteUpdateTheme(value) {
    await postData(
        "theme",
        { value }
    )
}

///// TODOS /////
async function remoteGetTodos() {
    const response = await getData("todos")
    const toText = await response.text()
    return toText
}

async function remoteUpdateTodos(value) {
    await postData(
        "todos",
        { value }
    )
}