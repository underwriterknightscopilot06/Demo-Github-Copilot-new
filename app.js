document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to create a task element
    /**
     * Creates a new task list item element with a checkbox and delete button.
     *
     * @param {string} taskText - The text content of the task.
     * @param {boolean} [completed=false] - Whether the task is initially completed.
     * @returns {HTMLLIElement} The constructed list item element representing the task.
     */
    function createTaskElement(taskText, completed = false) {
        const li = document.createElement('li');
        li.setAttribute('data-task-text', taskText);

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                li.classList.add('completed');
            } else {
                li.classList.remove('completed');
            }
            saveTasks();
        });

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function () {
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }
            saveTasks();
        });
        li.appendChild(document.createTextNode(` ${taskText.trim()} `));
        li.appendChild(deleteBtn);
        li.appendChild(document.createTextNode(' ' + taskText + ' '));
        li.appendChild(deleteBtn);

        if (completed) {
            li.classList.add('completed');
        }

        return li;
    }

    /**
     * Saves the current list of tasks to localStorage.
     */
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            const text = li.getAttribute('data-task-text');
            const completed = li.querySelector('input[type="checkbox"]').checked;
            tasks.push({ text, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    /**
     * Loads tasks from localStorage and appends them to the task list.
     */
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = createTaskElement(task.text, task.completed);
            taskList.appendChild(li);
        });
    }
        });
    }

    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const li = createTaskElement(taskText);
            taskList.appendChild(li);
            taskInput.value = "";
            saveTasks();
        }
    });

    // Load tasks on page load
    loadTasks();
});

