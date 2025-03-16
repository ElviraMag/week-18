document.addEventListener('DOMContentLoaded', () => {
  const taskManager = document.getElementById('taskManager');
  const buttonAdd = document.getElementById('buttonAdd');
  const taskList = document.getElementById('taskList');
  const noTask = document.getElementById('noTask');
  const clearButton = document.getElementById('clearButton');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const showTasks = () => {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
      noTask.classList.remove('hidden');
      clearButton.disabled = true;
    } else {
      noTask.classList.add('hidden');
      clearButton.disabled = false;
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
                    <input type="checkbox" id="task-${index}" ${
          task.completed ? 'checked' : ''
        }>
                    <label for="task-${index}" class="${
          task.completed ? 'completed' : ''
        }">${task.text}</label>
                `;
        li.querySelector('input').addEventListener('click', () => {
          task.completed = !task.completed;
          localStorage.setItem('tasks', JSON.stringify(tasks));
          showTasks();
        });
        taskList.appendChild(li);
      });
    }
  };
  buttonAdd.addEventListener('click', function () {
    const taskText = taskManager.value.trim();
    if (taskText) {
      tasks.push({ text: taskText, completed: false });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      taskManager.value = '';
      showTasks();
    }
  });

  clearButton.addEventListener('click', () => {
    tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks();
  });

  showTasks();
});
