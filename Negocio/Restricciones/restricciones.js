let puntajeTotal = 0;
const puntosDiv = document.querySelector(".Puntuaciones");

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

function actualizarPuntos() {
    puntosDiv.textContent = `PUNTOS: ${puntajeTotal}`;
}

function sumarPuntos(zonaId, zona) {
    if (zonaId === "Zona15") {
        const dinos = zona.querySelectorAll("img");
        if (dinos.length % 2 === 0) {
            puntajeTotal += puntosPorZona[zonaId];
        }
    } else if (zonaId === "Zona8") {
        const dinos = zona.querySelectorAll("img");
        if (dinos.length === 3) {
            puntajeTotal += puntosPorZona[zonaId];
        }
    } else {
        puntajeTotal += puntosPorZona[zonaId];
    }
    actualizarPuntos();
}

function obtenerNumeroZona(zona) {
    const claseZona = Array.from(zona.classList).find(c => c.startsWith("Zona"));
    if (!claseZona) return NaN;
    return parseInt(claseZona.replace("Zona", ""), 10);
}

// BOSQUE DE LA SEMEJANZA
const ZonaSimilitud = document.querySelectorAll(".Zona1, .Zona2, .Zona3, .Zona4, .Zona5, .Zona6");
let tipoRecinto = null;
let ultimoBosqueColocado = 0;

function activarDragDropSimilitud() {
    const dinos = document.querySelectorAll(".Dinos_ALM img");
    dinos.forEach(dino => {
        dino.setAttribute("draggable", "true");
        dino.addEventListener("dragstart", () => {
            if (!window.puedeColocar) return;
            window.dinoArrastrado = dino;
        });
    });

    ZonaSimilitud.forEach(zona => {
        zona.addEventListener("dragover", e => {
            if (!window.puedeColocar || !window.dinoArrastrado) return;
            const tipoDino = window.dinoArrastrado.dataset.tipo;
            const zonaNum = obtenerNumeroZona(zona);

            if (puedeSoltarPorDado(zona) &&
                ((zonaNum === 1 && ultimoBosqueColocado === 0) ||
                zonaNum === ultimoBosqueColocado + 1) &&
                (!tipoRecinto || tipoDino === tipoRecinto) &&
                zona.children.length === 0) {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
            } else {
                e.dataTransfer.dropEffect = "none";
            }
        });

        zona.addEventListener("drop", e => {
            e.preventDefault();
            if (!window.puedeColocar || !window.dinoArrastrado) return;

            const dino = window.dinoArrastrado;
            const tipoDino = dino.dataset.tipo;
            const zonaNum = obtenerNumeroZona(zona);

            if (!puedeSoltarPorDado(zona) ||
                ((zonaNum !== 1 || ultimoBosqueColocado !== 0) &&
                zonaNum !== ultimoBosqueColocado + 1) ||
                (tipoRecinto && tipoDino !== tipoRecinto) ||
                zona.children.length > 0) {
                window.dinoArrastrado = null;
                return;
            }

            if (!tipoRecinto) tipoRecinto = tipoDino;
            ultimoBosqueColocado = zonaNum;

            dino.style.width = "90%";
            dino.style.height = "auto";
            dino.style.position = "absolute";
            const rect = zona.getBoundingClientRect();
            dino.style.left = rect.width / 2 - dino.offsetWidth / 2 + "px";
            dino.style.top = rect.height / 2 - dino.offsetHeight / 2 + "px";

            zona.appendChild(dino);
            sumarPuntos(zona.id, zona);
            window.dinoArrastrado = null;
            window.puedeColocar = false;
            verificarFinDePartida();
        });
    });
}

// PRADO DE LA DIFERENCIA
const ZonaPradera = document.querySelectorAll(".Zona9, .Zona10, .Zona11, .Zona12, .Zona13, .Zona14");
let tiposColocados = [];
let ultimaPraderaColocada = 8;

function activarDragDropPradera() {
    const dinos = document.querySelectorAll(".Dinos_ALM img");
    dinos.forEach(dino => {
        dino.setAttribute("draggable", "true");
        dino.addEventListener("dragstart", () => {
            if (!window.puedeColocar) return;
            window.dinoArrastrado = dino;
        });
    });

    ZonaPradera.forEach(zona => {
        zona.addEventListener("dragover", e => {
            if (!window.puedeColocar || !window.dinoArrastrado) return;
            const tipoDino = window.dinoArrastrado.dataset.tipo;
            const zonaNum = obtenerNumeroZona(zona);

            const dinosEnZonas = Array.from(ZonaPradera)
                .flatMap(z => Array.from(z.children))
                .map(d => d.dataset.tipo);

            if (puedeSoltarPorDado(zona) &&
                ((zonaNum === 9 && ultimaPraderaColocada === 8) ||
                zonaNum === ultimaPraderaColocada + 1) &&
                !dinosEnZonas.includes(tipoDino) &&
                zona.children.length === 0) {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
            } else {
                e.dataTransfer.dropEffect = "none";
            }
        });

        zona.addEventListener("drop", e => {
            e.preventDefault();
            if (!window.puedeColocar || !window.dinoArrastrado) return;

            const dino = window.dinoArrastrado;
            const tipoDino = dino.dataset.tipo;
            const zonaNum = obtenerNumeroZona(zona);

            const dinosEnZonas = Array.from(ZonaPradera)
                .flatMap(z => Array.from(z.children))
                .map(d => d.dataset.tipo);

            if (!puedeSoltarPorDado(zona) ||
                ((zonaNum !== 9 || ultimaPraderaColocada !== 8) &&
                zonaNum !== ultimaPraderaColocada + 1) ||
                dinosEnZonas.includes(tipoDino) ||
                zona.children.length > 0) {
                window.dinoArrastrado = null;
                return;
            }

            tiposColocados.push(tipoDino);
            ultimaPraderaColocada = zonaNum;

            dino.style.width = "90%";
            dino.style.height = "auto";
            dino.style.position = "absolute";
            const rect = zona.getBoundingClientRect();
            dino.style.left = rect.width / 2 - dino.offsetWidth / 2 + "px";
            dino.style.top = rect.height / 2 - dino.offsetHeight / 2 + "px";

            zona.appendChild(dino);
            sumarPuntos(zona.id, zona);
            window.dinoArrastrado = null;
            window.puedeColocar = false;
            verificarFinDePartida();
        });
    });
}

// REY DE LA SELVA
const ZonaRey = document.querySelector(".Zona7");
let reyOcupado = false;

function activarDragDropRey() {
    if (!ZonaRey) return;
    const dinos = document.querySelectorAll(".Dinos_ALM img");
    dinos.forEach(dino => {
        dino.setAttribute("draggable", "true");
        dino.addEventListener("dragstart", () => {
            if (!window.puedeColocar) return;
            window.dinoArrastrado = dino;
        });
    });

    ZonaRey.addEventListener("dragover", e => {
        if (!window.puedeColocar || !window.dinoArrastrado) return;
        if (!reyOcupado) {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
        } else {
            e.preventDefault();
            e.dataTransfer.dropEffect = "none";
        }
    });

    ZonaRey.addEventListener("drop", e => {
        e.preventDefault();
        if (!window.puedeColocar || !window.dinoArrastrado || reyOcupado) {
            window.dinoArrastrado = null;
            return;
        }

        const dino = window.dinoArrastrado;
        dino.style.width = "90%";
        dino.style.height = "auto";
        dino.style.position = "absolute";
        const rect = ZonaRey.getBoundingClientRect();
        const x = rect.width / 2 - dino.offsetWidth / 2;
        const y = rect.height / 2 - dino.offsetHeight / 2;
        dino.style.left = x + "px";
        dino.style.top = y + "px";

        ZonaRey.appendChild(dino);
        reyOcupado = true;
        sumarPuntos(ZonaRey.id, ZonaRey);
        window.dinoArrastrado = null;
        window.puedeColocar = false;
        verificarFinDePartida();
    });
}

const ZonaSoledad = document.querySelectorAll(".Zona16");
let tiposUsados = [];

function activarDragDropSoledad() {
    const dinos = document.querySelectorAll(".Dinos_ALM img");
    dinos.forEach(dino => {
        dino.setAttribute("draggable", "true");
        dino.addEventListener("dragstart", () => {
            if (!window.puedeColocar) return;
            window.dinoArrastrado = dino;
        });
    });
// ISLA SOLITARIA
    ZonaSoledad.forEach(zona => {
        zona.addEventListener("dragover", e => {
            if (!window.puedeColocar || !window.dinoArrastrado) return;
            const tipoDino = window.dinoArrastrado.dataset.tipo;
            if (zona.children.length === 0 && !tiposUsados.includes(tipoDino)) {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
            } else {
                e.preventDefault();
                e.dataTransfer.dropEffect = "none";
            }
        });

        zona.addEventListener("drop", e => {
            e.preventDefault();
            if (!window.puedeColocar || !window.dinoArrastrado) return;
            const dino = window.dinoArrastrado;
            const tipoDino = dino.dataset.tipo;

            if (zona.children.length > 0 || tiposUsados.includes(tipoDino)) {
                window.dinoArrastrado = null;
                return;
            }

            tiposUsados.push(tipoDino);

            dino.style.width = "90%";
            dino.style.height = "auto";
            dino.style.position = "absolute";
            const rect = zona.getBoundingClientRect();
            const x = rect.width / 2 - dino.offsetWidth / 2;
            const y = rect.height / 2 - dino.offsetHeight / 2;
            dino.style.left = x + "px";
            dino.style.top = y + "px";

            zona.appendChild(dino);
            sumarPuntos(zona.id, zona);
            window.dinoArrastrado = null;
            window.puedeColocar = false;
            verificarFinDePartida();
        });
    });
}
// PRADERA DEL AMOR
const ZonaLago = document.querySelectorAll(".Zona15");
let tipoLago = null;
let cantidadLago = 0;

function activarDragDropLago() {
    const dinos = document.querySelectorAll(".Dinos_ALM img");
    dinos.forEach(dino => {
        dino.setAttribute("draggable", "true");
        dino.addEventListener("dragstart", () => {
            if (!window.puedeColocar) return;
            window.dinoArrastrado = dino;
        });
    });

    ZonaLago.forEach(zona => {
        zona.addEventListener("dragover", e => {
            if (!window.puedeColocar || !window.dinoArrastrado) return;
            const tipoDino = window.dinoArrastrado.dataset.tipo;
            if ((cantidadLago < 2) && (!tipoLago || tipoDino === tipoLago)) {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
            } else {
                e.preventDefault();
                e.dataTransfer.dropEffect = "none";
            }
        });

        zona.addEventListener("drop", e => {
            e.preventDefault();
            if (!window.puedeColocar || !window.dinoArrastrado) return;
            const dino = window.dinoArrastrado;
            const tipoDino = dino.dataset.tipo;

            if ((cantidadLago >= 2) || (tipoLago && tipoDino !== tipoLago)) {
                window.dinoArrastrado = null;
                return;
            }

            if (!tipoLago) tipoLago = tipoDino;
            cantidadLago++;

            dino.style.width = "90%";
            dino.style.height = "auto";
            dino.style.position = "absolute";
            const rect = zona.getBoundingClientRect();
            const x = rect.width / 2 - dino.offsetWidth / 2;
            const y = rect.height / 2 - dino.offsetHeight / 2;
            dino.style.left = x + "px";
            dino.style.top = y + "px";

            if (dino.parentNode !== zona) zona.appendChild(dino);
            sumarPuntos(zona.id, zona);
            window.dinoArrastrado = null;
            window.puedeColocar = false;
            verificarFinDePartida();
        });
    });
}
// TRÍO FRONDOSO
const ZonaTrio = document.querySelectorAll(".Zona8");
let dinosTrio = [];

function activarDragDropTrio() {
    const dinos = document.querySelectorAll(".Dinos_ALM img");
    dinos.forEach(dino => {
        dino.setAttribute("draggable", "true");
        dino.addEventListener("dragstart", () => {
            if (!window.puedeColocar) return;
            window.dinoArrastrado = dino;
        });
    });

    ZonaTrio.forEach(zona => {
        zona.addEventListener("dragover", e => {
            if (!window.puedeColocar || !window.dinoArrastrado) return;
            if (dinosTrio.length < 3) {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
            } else {
                e.dataTransfer.dropEffect = "none";
            }
        });

        zona.addEventListener("drop", e => {
            e.preventDefault();
            if (!window.puedeColocar || !window.dinoArrastrado) return;
            const dino = window.dinoArrastrado;
            dinosTrio.push(dino.dataset.tipo);

            dino.style.width = "40%";
            dino.style.height = "auto";
            dino.style.position = "absolute";
            const offsetX = dinosTrio.length * (dino.offsetWidth + 5) - dino.offsetWidth;
            const rect = zona.getBoundingClientRect();
            const x = offsetX;
            const y = rect.height / 2 - dino.offsetHeight / 2;
            dino.style.left = x + "px";
            dino.style.top = y + "px";

            zona.appendChild(dino);
            sumarPuntos(zona.id, zona);
            window.dinoArrastrado = null;
            window.puedeColocar = false;
            verificarFinDePartida();
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    activarDragDropSimilitud();
    activarDragDropPradera();
    activarDragDropRey();
    activarDragDropSoledad();
    activarDragDropLago();
    activarDragDropTrio();
});
