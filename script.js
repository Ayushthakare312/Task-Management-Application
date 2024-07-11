document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    console.log('DOM fully loaded and parsed');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add(task.completed ? 'completed' : '');
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div class="actions">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                    <button class="toggle">${task.completed ? 'Undo' : 'Complete'}</button>
                </div>
            `;
            taskList.appendChild(taskItem);

            // Edit task
            taskItem.querySelector('.edit').addEventListener('click', () => {
                const newText = prompt('Edit task:', task.text);
                if (newText !== null && newText.trim() !== '') {
                    tasks[index].text = newText;
                    updateLocalStorage();
                    renderTasks();
                }
            });

            // Delete task
            taskItem.querySelector('.delete').addEventListener('click', () => {
                tasks.splice(index, 1);
                updateLocalStorage();
                renderTasks();
            });

            // Toggle complete
            taskItem.querySelector('.toggle').addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                updateLocalStorage();
                renderTasks();
            });
        });
    };

    const updateLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add new task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted');
        const newTaskText = taskInput.value.trim();
        if (newTaskText !== '') {
            console.log('Adding task:', newTaskText);
            const newTask = {
                text: newTaskText,
                completed: false
            };
            tasks.push(newTask);
            updateLocalStorage();
            renderTasks();
            taskInput.value = '';
        }
    });

    // Initial render
    renderTasks();
});
