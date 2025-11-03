const button = document.getElementById("tirarDado");
window.puedeColocar = false;
window.ultimoBosqueColocado = 0;
window.ultimaPraderaColocada = 8;

const dados = ["dado1", "dado2", "dado3", "dado4", "dado5", "dado6"];
let caraActual = null;

function ocultarCaras() {
    dados.forEach(id => {
        document.getElementById(id).style.display = "none";
    });
}

const zonasBosque = [1, 2, 3, 4, 5, 6, 7, 8].map(n => `.Zona${n}`);
const zonasLlanura = [9, 10, 11, 12, 13, 14, 15, 16].map(n => `.Zona${n}`);
const zonasIzquierda = [1, 2, 3, 4, 5, 6, 8, 15].map(n => `.Zona${n}`);
const zonasDerecha = [7, 9, 10, 11, 12, 13, 14, 16].map(n => `.Zona${n}`);

button.addEventListener("click", (event) => {
    event.preventDefault();
    let i = 0;
    const intervalo = setInterval(() => {
        ocultarCaras();
        document.getElementById(dados[i]).style.display = "block";
        i = (i + 1) % dados.length;
    }, 100);

    setTimeout(() => {
        clearInterval(intervalo);
        ocultarCaras();
        const aleatorio = Math.floor(Math.random() * dados.length);
        document.getElementById(dados[aleatorio]).style.display = "block";
        caraActual = aleatorio + 1;
        window.puedeColocar = true;
    }, 2000);
});

function puedeSoltarPorDado(zona, dino = window.dinoArrastrado) {
    const claseZona = [...zona.classList].find(c => c.startsWith("Zona"));
    if (!claseZona) return false;

    switch (caraActual) {
        case 1: return zonasBosque.includes(`.${claseZona}`);
        case 2: return zonasLlanura.includes(`.${claseZona}`);
        case 3: return zonasDerecha.includes(`.${claseZona}`);
        case 4: return zonasIzquierda.includes(`.${claseZona}`);
        case 5: return zona.children.length === 0;
        case 6: return !zona.querySelector("img[data-tipo='Dino3']");
        default: return true;
    }
}

document.addEventListener("dragstart", (e) => {
    if (!window.puedeColocar || !caraActual) e.preventDefault();
});

document.addEventListener("dragover", (e) => {
    if (!window.dinoArrastrado || !caraActual || !window.puedeColocar) return;
    const zona = e.target.closest("[class^='Zona']");
    if (!zona) return;

    const claseZona = [...zona.classList].find(c => c.startsWith("Zona"));
    const zonaNum = parseInt(claseZona.replace("Zona", ""), 10);

    if (zonaNum <= 6 || (zonaNum >= 9 && zonaNum <= 14)) return;

    if (!puedeSoltarPorDado(zona)) {
        e.stopImmediatePropagation();
        e.dataTransfer.dropEffect = "none";
    } else {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }
});

document.addEventListener("drop", (e) => {
    if (!window.dinoArrastrado || !caraActual || !window.puedeColocar) return;
    const zona = e.target.closest("[class^='Zona']");
    if (!zona) return;

    const claseZona = [...zona.classList].find(c => c.startsWith("Zona"));
    const zonaNum = parseInt(claseZona.replace("Zona", ""), 10);

    if (zonaNum <= 6 || (zonaNum >= 9 && zonaNum <= 14)) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return;
    }

    if (!puedeSoltarPorDado(zona)) {
        e.stopImmediatePropagation();
        e.preventDefault();
        window.dinoArrastrado = null;
        return;
    }

    const dino = window.dinoArrastrado;
    const rect = zona.getBoundingClientRect();
    dino.style.width = "90%";
    dino.style.height = "auto";
    dino.style.position = "absolute";
    dino.style.left = rect.width / 2 - dino.offsetWidth / 2 + "px";
    dino.style.top = rect.height / 2 - dino.offsetHeight / 2 + "px";

    zona.appendChild(dino);
    window.puedeColocar = false;
    window.dinoArrastrado = null;
    verificarFinDePartida();
});

function finalizarPartida() {
    fetch("../../Negocio/GuardarPartida/Partida.php", {
        method: "POST",
        credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Partida guardada correctamente");
        } else {
            console.error(data.error);
            alert("Error al guardar la partida");
        }
    })
    .catch(err => {
        console.error(err);
        alert("Error de conexión al guardar la partida");
    });
}

function verificarFinDePartida() {
    const dinosEnAlmacen = document.querySelectorAll(".Dinos_ALM img").length;
    if (dinosEnAlmacen === 0) {
        finalizarPartida();
    }
}

window.verificarFinDePartida = verificarFinDePartida;
