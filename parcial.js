document.addEventListener('DOMContentLoaded', function() {
    const formularioTarea = document.getElementById('formularioTarea');
    const listaTareas = document.getElementById('listaTareas');
    const tiempoTotalDisplay = document.getElementById('tiempoTotal');
    let tiempoTotal = 0;

    formularioTarea.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombreTarea = document.getElementById('nombreTarea').value;
        const tiempoTarea = parseInt(document.getElementById('tiempoTarea').value);
        
        agregarTarea(nombreTarea, tiempoTarea);
        formularioTarea.reset();
        mostrarAlerta('Tarea agregada correctamente.');
    });

    function agregarTarea(nombre, tiempo) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="nombre-tarea">${nombre}</span> - <span class="tiempo-tarea">${tiempo}</span> horas
            <div>
                <button class="completar">Completar</button>
                <button class="incompleta">Incompleta</button>
            </div>
        `;

        const botonCompletar = li.querySelector('.completar');
        const botonIncompleta = li.querySelector('.incompleta');

        botonCompletar.addEventListener('click', function() {
            if (!li.classList.contains('completada')) {
                li.classList.add('completada');
                tiempoTotal += tiempo;
                actualizarTiempoTotal();
                mostrarAlerta('Tarea marcada como completada.');
            }
        });

        botonIncompleta.addEventListener('click', function() {
            if (li.classList.contains('completada')) {
                li.classList.remove('completada');
                tiempoTotal -= tiempo;
                actualizarTiempoTotal();
                mostrarAlerta('Tarea marcada como incompleta.');

                const nombreTareaSpan = li.querySelector('.nombre-tarea');
                const tiempoTareaSpan = li.querySelector('.tiempo-tarea');

                const nombreTareaInput = document.createElement('input');
                nombreTareaInput.type = 'text';
                nombreTareaInput.value = nombreTareaSpan.textContent;
                nombreTareaInput.className = 'editar-nombre-tarea';

                const tiempoTareaInput = document.createElement('input');
                tiempoTareaInput.type = 'number';
                tiempoTareaInput.value = tiempoTareaSpan.textContent;
                tiempoTareaInput.className = 'editar-tiempo-tarea';

                nombreTareaSpan.replaceWith(nombreTareaInput);
                tiempoTareaSpan.replaceWith(tiempoTareaInput);

                botonIncompleta.textContent = 'Guardar';
                botonIncompleta.classList.remove('incompleta');
                botonIncompleta.classList.add('guardar');

                botonIncompleta.addEventListener('click', function() {
                    const nuevoNombreTarea = nombreTareaInput.value;
                    const nuevoTiempoTarea = parseInt(tiempoTareaInput.value);

                    nombreTareaInput.replaceWith(nombreTareaSpan);
                    tiempoTareaInput.replaceWith(tiempoTareaSpan);

                    nombreTareaSpan.textContent = nuevoNombreTarea;
                    tiempoTareaSpan.textContent = nuevoTiempoTarea;

                    botonIncompleta.textContent = 'Incompleta';
                    botonIncompleta.classList.remove('guardar');
                    botonIncompleta.classList.add('incompleta');

                    mostrarAlerta('Tarea editada correctamente.');
                }, { once: true });
            }
        });

        listaTareas.appendChild(li);
    }

    function actualizarTiempoTotal() {
        tiempoTotalDisplay.textContent = `Tiempo Total Invertido: ${tiempoTotal} horas`;
    }

    function mostrarAlerta(mensaje) {
        const alertaDiv = document.createElement('div');
        alertaDiv.className = 'alerta';
        alertaDiv.textContent = mensaje;
        document.body.appendChild(alertaDiv);
        setTimeout(() => alertaDiv.remove(), 3000);
    }
});
