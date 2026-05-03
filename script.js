const input=document.getElementById('todo-input');
const addBtn=document.getElementById('add-btn');
const list=document.getElementById('todo-list');
const clearBtn=document.getElementById('clear-btn');

document.addEventListener('DOMContentLoaded',getLocalTodos);

function addTask(){
    if(input.value.trim()==="")
        return;
    createTodoElement(input.value);
    saveLocalTodos=(input.value);
    input.value="";
}
function createTodoElement(text,isCompleted=false){
    const li=document.createElement('li');
    li.classList.add('list-group-item');

    li.innerHTML=`
        <span class="todo-text ${isCompleted ? 'completed':''}">${text}</span>
        <button class='btn delete-btn'>X</button>
    `;
    // toogle completion
    li.querySelector('.todo-text').addEventListener('click',function(){
        this.classList.toggle('completed');
        updateLocalStatus(text);
    });
    //delete completion
    li.querySelector('.delete-btn').addEventListener('click',function(){
        li.remove();
        removeLocalTodo(text);
    });
    list.appendChild(li);
}
function saveLocalTodos(todo) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.push({ text: todo, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalTodos() {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.forEach(todo => createTodoElement(todo.text, todo.completed));
}

function removeLocalTodo(todoText) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    const filtered = todos.filter(t => t.text !== todoText);
    localStorage.setItem('todos', JSON.stringify(filtered));
}

function updateLocalStatus(todoText) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(t => {
        if (t.text === todoText) t.completed = !t.completed;
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}
addBtn.addEventListener('click',addTask);
input.addEventListener('keypress',(e)=>{
    if(e.key==='Enter')
        addTask();
});
clearBtn.addEventListener('click', () => {
    const completedItems = document.querySelectorAll('.completed');
    completedItems.forEach(item => {
        removeLocalTodo(item.textContent.trim());
        item.parentElement.remove();
    });
});