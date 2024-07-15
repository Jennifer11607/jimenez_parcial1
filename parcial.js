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
            <span>${name} - ${time} minutos</span>
            <div>
                <button class="complete">Completar</button>
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
            }
        });

        taskList.appendChild(li);
    }

    function updateTotalTime() {
        totalTimeDisplay.textContent = `Tiempo Total Invertido: ${totalTime} minutos`;
    }

    function showAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert';
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), 3000);
    }
});
