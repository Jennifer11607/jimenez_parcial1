document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const totalTimeDisplay = document.getElementById('totalTime');
    let totalTime = 0;

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskName = document.getElementById('taskName').value;
        const taskTime = parseInt(document.getElementById('taskTime').value);
        
        addTask(taskName, taskTime);
        taskForm.reset();
        showAlert('Tarea agregada correctamente.');
    });

    function addTask(name, time) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-name">${name}</span> - <span class="task-time">${time}</span> horas
            <div>
                <button class="complete">Completa</button>
                <button class="incomplete">Incompleta</button>
            </div>
        `;

        const completeButton = li.querySelector('.complete');
        const incompleteButton = li.querySelector('.incomplete');

        completeButton.addEventListener('click', function() {
            if (!li.classList.contains('completed')) {
                li.classList.add('completed');
                totalTime += time;
                updateTotalTime();
                showAlert('Tarea marcada como completada.');
            }
        });

        incompleteButton.addEventListener('click', function() {
            if (li.classList.contains('completed')) {
                li.classList.remove('completed');
                totalTime -= time;
                updateTotalTime();
                showAlert('Tarea marcada como incompleta.');

                const taskNameSpan = li.querySelector('.task-name');
                const taskTimeSpan = li.querySelector('.task-time');

                const taskNameInput = document.createElement('input');
                taskNameInput.type = 'text';
                taskNameInput.value = taskNameSpan.textContent;
                taskNameInput.className = 'edit-task-name';

                const taskTimeInput = document.createElement('input');
                taskTimeInput.type = 'number';
                taskTimeInput.value = taskTimeSpan.textContent;
                taskTimeInput.className = 'edit-task-time';

                taskNameSpan.replaceWith(taskNameInput);
                taskTimeSpan.replaceWith(taskTimeInput);

                incompleteButton.textContent = 'Guardar';
                incompleteButton.classList.remove('incomplete');
                incompleteButton.classList.add('save');

                incompleteButton.addEventListener('click', function() {
                    const newTaskName = taskNameInput.value;
                    const newTaskTime = parseInt(taskTimeInput.value);

                    taskNameInput.replaceWith(taskNameSpan);
                    taskTimeInput.replaceWith(taskTimeSpan);

                    taskNameSpan.textContent = newTaskName;
                    taskTimeSpan.textContent = newTaskTime;

                    incompleteButton.textContent = 'Incompleta';
                    incompleteButton.classList.remove('save');
                    incompleteButton.classList.add('incomplete');

                    showAlert('Tarea editada correctamente.');
                }, { once: true });
            }
        });

        taskList.appendChild(li);
    }

    function updateTotalTime() {
        totalTimeDisplay.textContent = `Tiempo Total Invertido: ${totalTime} horas`;
    }

    function showAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert';
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), 3000);
    }
});
