// Función para inicializar un número determinado de jugadores
function inicializarJugadores(numJugadores) {
    const jugadores = [];
    for (let i = 1; i <= numJugadores; i++) {
        const nombre = `Jugador ${i}`;
        const dinero = 20; // Dinero inicial en Monopoly es 20
        jugadores.push({ nombre, dinero });
    }
    return jugadores;
}

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("#numPersonasForm");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío del formulario

        const numJugadores = parseInt(document.querySelector("#data").value);
        console.log("Número de jugadores:", numJugadores);

        // Inicializar jugadores
        let jugadores = inicializarJugadores(numJugadores);
        console.log("Jugadores inicializados:", jugadores);

        // Generar tabla HTML
        const tablaJugadores = document.createElement("table");
        tablaJugadores.innerHTML = `
            <thead>
                <tr>
                    <th>Jugador</th>
                    <th>Dinero</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${jugadores.map((jugador, index) => `
                    <tr>
                        <td>${jugador.nombre}</td>
                        <td id="dinero-${index}">${jugador.dinero.toFixed(2)}</td>
                        <td>
                            <input type="number" id="cantidad-${index}" placeholder="Cantidad" step="0.01">
                            <button onclick="agregarDinero(${index})">Añadir</button>
                            <button onclick="quitarDinero(${index})">Quitar</button>
                            <button onclick="agregar2Millones(${index})">Añadir 2</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;

        // Agregar tabla al contenedor en el HTML
        const contenedorTabla = document.querySelector("#tablaJugadores");
        contenedorTabla.innerHTML = '';
        contenedorTabla.appendChild(tablaJugadores);

        // Función para añadir dinero a un jugador
        window.agregarDinero = function (index) {
            const cantidadInput = document.querySelector(`#cantidad-${index}`);
            const cantidad = parseFloat(cantidadInput.value);
            if (!isNaN(cantidad)) {
                jugadores[index].dinero += cantidad;
                document.querySelector(`#dinero-${index}`).textContent = jugadores[index].dinero.toFixed(2);
                cantidadInput.value = ''; // Limpiar el campo de entrada después de agregar dinero
            }
        };

        // Función para quitar dinero a un jugador
        window.quitarDinero = function (index) {
            const cantidadInput = document.querySelector(`#cantidad-${index}`);
            const cantidad = parseFloat(cantidadInput.value);
            if (!isNaN(cantidad)) {
                jugadores[index].dinero -= cantidad;
                document.querySelector(`#dinero-${index}`).textContent = jugadores[index].dinero.toFixed(2);
                cantidadInput.value = ''; // Limpiar el campo de entrada después de quitar dinero
            }
        };

        // Función para añadir siempre 2 millones a un jugador
        window.agregar2Millones = function (index) {
            jugadores[index].dinero += 2;
            document.querySelector(`#dinero-${index}`).textContent = jugadores[index].dinero.toFixed(2);
        };
    });
});
