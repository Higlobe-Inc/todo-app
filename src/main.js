const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const todoList = document.getElementById('todo-list');
const stats = document.getElementById('stats');

let totalTasks = 0;
let completedTasks = 0;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (task) {
        totalTasks++;
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="mark-complete" />
            <span>${task}</span>
            <button class="delete-task">Delete</button>
        `;
        todoList.appendChild(li);
        updateStats();
        taskInput.value = '';
    }
});

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('mark-complete')) {
        completedTasks += e.target.checked ? 1 : -1;
        updateStats();
    }
    if (e.target.classList.contains('delete-task')) {
        const li = e.target.parentElement;
        if (li.querySelector('.mark-complete').checked) {
            completedTasks--;
        }
        totalTasks--;
        todoList.removeChild(li);
        updateStats();
    }
});

function updateStats() {
    stats.textContent = `Total tasks: ${totalTasks} | Completed: ${completedTasks}`;
}
