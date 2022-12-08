
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);

let tasks = [];


if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    
};

tasks.forEach(function (task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

    const taskHtml = `
            <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                <span class="${cssClass}">${task.text}</span>
                <div class="task-item__buttons">
                    <button type="button" data-action="done" class="btn-action">
                        <img src="./img/tick.svg" alt="Done" width="18" height="18">
                    </button>
                    <button type="button" data-action="delete" class="btn-action">
                        <img src="./img/cross.svg" alt="Done" width="18" height="18">
                    </button>
                </div>
            </li>`;

    tasksList.insertAdjacentHTML('beforeend', taskHtml);
})

checkEmptyList();

// Додати задачу
function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    tasks.push(newTask);
    saveToLocalStorrage();
    
    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';

    const taskHtml = `
            <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
                <span class="${cssClass}">${newTask.text}</span>
                <div class="task-item__buttons">
                    <button type="button" data-action="done" class="btn-action">
                        <img src="./img/tick.svg" alt="Done" width="18" height="18">
                    </button>
                    <button type="button" data-action="delete" class="btn-action">
                        <img src="./img/cross.svg" alt="Done" width="18" height="18">
                    </button>
                </div>
            </li>`;

    tasksList.insertAdjacentHTML('beforeend', taskHtml);


    taskInput.value = "";
    taskInput.focus();

    
    checkEmptyList();
   
};
// Видалити задачу
function deleteTask(event) {
    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest('.list-group-item');

        const id = Number(parentNode.id);

         const index = tasks.findIndex(function (task) {
            return task.id === id;
        });

        tasks.splice(index, 1)

        saveToLocalStorrage();

        parentNode.remove();

       
    }

    checkEmptyList();
};
// Відмічаємо як завершену задачу
function doneTask(event) {
    if (event.target.dataset.action === "done") {
        const parentNode = event.target.closest('.list-group-item');
        const taskTitle = parentNode.querySelector('.task-title');

        const id = Number(parentNode.id);

        const task =  tasks.find(function (task) {
            if (task.id === id) {
                return true
            }
        });
        
        task.done = !task.done

        saveToLocalStorrage();

        taskTitle.classList.add('task-title--done');
    }

   
};


function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `
                <li id="emptyList" class="list-group-item empty-list">
                <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                <div class="empty-list__title">Список задач порожній</div>
                </li>`;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    } 

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }

}


// Зберігання в localStorrage
function saveToLocalStorrage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}