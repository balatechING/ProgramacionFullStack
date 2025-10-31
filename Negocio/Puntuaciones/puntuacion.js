let puntajeTotal = 0;

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
    Zona15: 5,  
    Zona16: 7
};

const puntosDiv = document.querySelector(".Puntuaciones");

function actualizarPuntos() {
    puntosDiv.textContent = `PUNTOS: ${puntajeTotal}`;
}

function sumarPuntos(idZona, zona) {
    if (idZona === "Zona15") {

        const dinos = zona.querySelectorAll("img");
        if (dinos.length % 2 === 0) {
            puntajeTotal += puntosPorZona[idZona];
        }
    } else if (idZona === "Zona8") {

        const dinos = zona.querySelectorAll("img");
        if (dinos.length === 3) {
            puntajeTotal += puntosPorZona[idZona];
        }
    } else {

        puntajeTotal += puntosPorZona[idZona];
    }
    actualizarPuntos();
}

document.querySelectorAll("[id^='Zona']").forEach(zona => {
    zona.addEventListener("DOMNodeInserted", e => {
        const target = e.target;
        if (target.tagName === "IMG") {
         
            sumarPuntos(zona.id, zona);
        }
    });
});

actualizarPuntos();
