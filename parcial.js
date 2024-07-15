document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const totalTimeDisplay = document.getElementById('totalTime');
    let totalTime = 0;

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombreTarea = document.getElementById('nombreTarea').value;
        const tiempoTarea = parseInt(document.getElementById('tiempoTarea').value);
        
        addTask(nombreTarea, tiempoTarea);
        taskForm.reset();
        showAlert('Tarea agregada correctamente.');
    });

    function addTask(nombre, tiempo) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="nombre-tarea">${nombre}</span> - <span class="tiempo-tarea">${tiempo}</span> horas
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
                totalTime += tiempo;
                updateTotalTime();
                showAlert('Tarea marcada como completada.');
            }
        });

        incompleteButton.addEventListener('click', function() {
            if (li.classList.contains('completed')) {
                li.classList.remove('completed');
                totalTime -= tiempo;
                updateTotalTime();
                showAlert('Tarea marcada como incompleta.');

                const nombreTareaSpan = li.querySelector('.nombre-tarea');
                const tiempoTareaSpan = li.querySelector('.tiempo-tarea');

                const nombreTareaInput = document.createElement('input');
                nombreTareaInput.type = 'text';
                nombreTareaInput.value = nombreTareaSpan.textContent;
                nombreTareaInput.className = 'edit-nombre-tarea';

                const tiempoTareaInput = document.createElement('input');
                tiempoTareaInput.type = 'number';
                tiempoTareaInput.value = tiempoTareaSpan.textContent;
                tiempoTareaInput.className = 'edit-tiempo-tarea';

                nombreTareaSpan.replaceWith(nombreTareaInput);
                tiempoTareaSpan.replaceWith(tiempoTareaInput);

                incompleteButton.textContent = 'Guardar';
                incompleteButton.classList.remove('incomplete');
                incompleteButton.classList.add('save');

                incompleteButton.addEventListener('click', function() {
                    const nuevoNombreTarea = nombreTareaInput.value;
                    const nuevoTiempoTarea = parseInt(tiempoTareaInput.value);

                    nombreTareaInput.replaceWith(nombreTareaSpan);
                    tiempoTareaInput.replaceWith(tiempoTareaSpan);

                    nombreTareaSpan.textContent = nuevoNombreTarea;
                    tiempoTareaSpan.textContent = nuevoTiempoTarea;

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
        totalTimeDisplay.textContent = `Tiempo Total Invertido: ${totalTime} hora`;
    }

    function showAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert';
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), 3000);
    }
});
