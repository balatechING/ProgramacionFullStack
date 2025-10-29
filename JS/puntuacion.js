// ============================
// PUNTUACIONES
// ============================

let puntajeTotal = 0;

// Puntos por zona
const puntosPorZona = {
    Zona1: 2,
    Zona2: 4,
    Zona3: 8,
    Zona4: 12,
    Zona5: 18,
    Zona6: 24,
    Zona7: 7,
    Zona8: 7,
    Zona9: 1,
    Zona10: 3,
    Zona11: 6,
    Zona12: 10,
    Zona13: 15,
    Zona14: 21,
    Zona15: 5,  // Pradera del Amor: por pareja
    Zona16: 7
};

// Referencia al div de puntuaciones
const puntosDiv = document.querySelector(".Puntuaciones");

// Función para actualizar visualmente
function actualizarPuntos() {
    puntosDiv.textContent = `PUNTOS: ${puntajeTotal}`;
}

// Función para sumar puntos según zona
function sumarPuntos(idZona, zona) {
    if (idZona === "Zona15") {
        // Pradera del Amor: 5 puntos por cada pareja de la misma especie
        const dinos = zona.querySelectorAll("img");
        if (dinos.length % 2 === 0) {
            puntajeTotal += puntosPorZona[idZona];
        }
    } else if (idZona === "Zona8") {
        // Trío Frondoso: 7 puntos solo si hay 3 dinosaurios
        const dinos = zona.querySelectorAll("img");
        if (dinos.length === 3) {
            puntajeTotal += puntosPorZona[idZona];
        }
    } else {
        // Todas las demás zonas suman siempre
        puntajeTotal += puntosPorZona[idZona];
    }
    actualizarPuntos();
}

// ============================
// Detectar drop en todas las zonas
// ============================

document.querySelectorAll("[id^='Zona']").forEach(zona => {
    zona.addEventListener("DOMNodeInserted", e => {
        const target = e.target;
        if (target.tagName === "IMG") {
            // Se agregó un dinosaurio, sumamos puntos según el recinto
            sumarPuntos(zona.id, zona);
        }
    });
});

// Inicializamos
actualizarPuntos();
