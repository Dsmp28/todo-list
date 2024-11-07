import './style.css';

let tasks: Task[] = [];
let taskIdCounter = 0;

const taskList = document.querySelector<HTMLUListElement>('#task-list');
const taskInput = document.querySelector<HTMLInputElement>('#task-input');
const addTaskButton = document.querySelector<HTMLButtonElement>('#add-task-button');

function renderTasks() {
  if (taskList) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const listItem = document.createElement('li');
      listItem.className = task.completed ? 'completed' : '';
      listItem.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
        <span>${task.description}</span>
        <button data-id="${task.id}">Eliminar</button>
      `;
      taskList.appendChild(listItem);
    });
  }
}

function addTask(description: string) {
  tasks.push({ id: taskIdCounter++, description, completed: false });
  renderTasks();
}

function deleteTask(id: number) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function toggleTaskCompletion(id: number) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

if (addTaskButton && taskInput) {
  addTaskButton.addEventListener('click', () => {
    if (taskInput.value.trim()) {
      addTask(taskInput.value.trim());
      taskInput.value = '';
    }
  });

  taskInput.addEventListener('keydown', (event: KeyboardEvent) => {
    // Verifica si la tecla presionada es 'Enter'
    if (event.key === 'Enter') {
      addTask(taskInput.value.trim());
      taskInput.value = '';
    }
  });
}

if (taskList) {
  taskList.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const id = Number(target.getAttribute('data-id'));

      if (target.tagName === 'BUTTON') {
          deleteTask(id);
      } else if (target.tagName === 'INPUT') {
          const inputElement = target as HTMLInputElement;
          if (inputElement.type === 'checkbox') {
              toggleTaskCompletion(id);
          }
      }
  });
}