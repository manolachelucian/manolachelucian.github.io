let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
let finishedItems = JSON.parse(localStorage.getItem('finishedItems')) || [];




function addTodoItem(todoItem) {
  todoItems.push(todoItem);
  const todoList = document.getElementById('task-list');
  const div = document.createElement('div');
  div.className = 'list-group-item';
  div.innerHTML = `<span class="task-text">${todoItem.text}</span>
    <span class="created-date">Created: ${formatDate(todoItem.createdDate)}</span>
    <span class="due-date">Due: ${formatDate(todoItem.dueDate)}</span>
    <button class="finish-button btn btn-success mx-4">Finish</button>
    <button class="delete-button btn btn-danger mx-4">Delete</button>`;
  if (todoItem.completed) {
    div.classList.add('completed');
  }
  todoList.appendChild(div);
}
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short',day: 'numeric',hour:'numeric',minute:'numeric' };
  return date.toLocaleDateString('cs-CZ', options);
}

function saveTodoItems() {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

function loadTodoItems() {
  todoItems.forEach(function(todoItem) {
    addTodoItem(todoItem);
  });
}

function saveFinishedItems() {
  localStorage.setItem('finishedItems', JSON.stringify(finishedItems));
}

function loadFinishedItems() {
  finishedItems.forEach(function(finishedItem) {
    const finishedList = document.getElementById('completed-list');
    const div = document.createElement('div');
    div.className = 'completed-task';
    div.innerHTML = `<span class="task-text">${finishedItem.text}</span>
      <span class="created-date">Created: ${formatDate(finishedItem.createdDate)}</span>
      <button class="delete-button btn btn-danger my-3">Delete</button>`;
    finishedList.appendChild(div);
  });
}

document.getElementById('task-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const taskInput = document.getElementById('task-input');
  const taskDate = document.getElementById('task-date');
  const taskText = taskInput.value.trim();
  const taskDateValue = taskDate.value;
  if (taskText !== '') {
    const taskItem = {
      text: taskText,
      createdDate: new Date().toISOString(),
      dueDate: taskDateValue,
      completed: false
    };
    addTodoItem(taskItem);
    saveTodoItems();
    taskInput.value = '';
    taskDate.value = '';
    taskInput.focus();
  }
});

document.getElementById('task-list').addEventListener('click', function(e) {
  if (e.target.classList.contains('finish-button')) {
    const taskItem = e.target.closest('.list-group-item');
    const taskText = taskItem.querySelector('.task-text').textContent;
    const todoItem = todoItems.find(function(item) {
      return item.text === taskText;});
      if (todoItem) {
      todoItem.completed = true;
      taskItem.classList.add('completed');
      const completedList = document.getElementById('completed-list');
      const div = document.createElement('div');
      div.className = 'completed-task';
      div.innerHTML = `<span class="task-text">${todoItem.text}</span>
        <span class="created-date">Created: ${formatDate(todoItem.createdDate)}</span>
        <button class="delete-button btn btn-danger m-3">Delete</button>`;
      completedList.appendChild(div);
      finishedItems.push(todoItem);
      saveTodoItems();
      saveFinishedItems();
      taskItem.remove();
    }
  }
});

document.getElementById('task-list').addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-button')) {
    const taskItem = e.target.closest('.list-group-item');
    const taskText = taskItem.querySelector('.task-text').textContent;
    const taskIndex = todoItems.findIndex(function(item) {
      return item.text === taskText;
    });
    if (taskIndex !== -1) {
      todoItems.splice(taskIndex, 1);
      saveTodoItems();
      taskItem.remove();
    }}});
document.getElementById('completed-list').addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-button')) {
    const taskItem = e.target.closest('.completed-task');
    const finishedText = taskItem.querySelector('.task-text').textContent;
    const finishedIndex = finishedItems.findIndex(function(item) {
      return item.text === finishedText;
    });
    if (finishedIndex !== -1) {
      finishedItems.splice(finishedIndex, 1);
      saveFinishedItems();
      taskItem.remove();
    }
  }
});

document.getElementById('mark-all-button').addEventListener('click', function() {
  if (todoItems.length === 0) return;
  todoItems.forEach(function(todoItem) {
    todoItem.completed = true;
    const div = document.createElement('div');
    div.className = 'completed-task';
    div.innerHTML = `<span class="task-text">${todoItem.text}</span>
      <span class="created-date fs-3">Created: ${formatDate(todoItem.createdDate)}</span>
      <button class="delete-button btn btn-danger m-3 ">Delete</button>`;
    const completedList = document.getElementById('completed-list');
    completedList.appendChild(div);
  });

  todoItems = [];
  saveTodoItems();
  saveFinishedItems();

  const taskList = document.getElementById('task-list');
  while (taskList.firstChild) {
    taskList.firstChild.remove();
  }
});

loadTodoItems();
loadFinishedItems();
