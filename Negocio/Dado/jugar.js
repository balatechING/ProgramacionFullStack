const button = document.getElementById("tirarDado");

const dados = ["dado1", "dado2", "dado3", "dado4", "dado5", "dado6"];
let caraActual = null; 

function ocultarCaras() {
    dados.forEach(id => {
        document.getElementById(id).style.display = "none";
    });
}

const zonasBosque = [1, 2, 3, 4, 5, 6, 7, 8].map(n => `.Zona${n}`);
const zonasLlanura = [9, 10, 11, 12, 13, 14, 15, 16].map(n => `.Zona${n}`);
const zonaCafeteria = [".Zona15"];
const zonaAseos = [".Zona16"];

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
    }, 2000);
});

function puedeSoltarPorDado(zona) {
    const claseZona = [...zona.classList].find(c => c.startsWith("Zona"));
    if (!claseZona) return false;

    switch (caraActual) {
        case 1: 
            return zonasBosque.includes(`.${claseZona}`);
        case 2: 
            return zonasLlanura.includes(`.${claseZona}`);
        case 3: 
            return zonaAseos.includes(`.${claseZona}`);
        case 4: 
            return zonaCafeteria.includes(`.${claseZona}`);
        case 5: 
            return zona.children.length === 0;
        case 6:
            const tieneTrex = zona.querySelector("img[data-tipo='Dino3']");
            return !tieneTrex;
        default:
            return true;
    }
}

document.addEventListener("dragover", (e) => {
    if (!window.dinoArrastrado || !caraActual) return;

    const zona = e.target.closest("[class^='Zona']");
    if (!zona) return;

    if (!puedeSoltarPorDado(zona)) {
        e.stopImmediatePropagation();
        e.dataTransfer.dropEffect = "none";
    }
});

document.addEventListener("drop", (e) => {
    if (!window.dinoArrastrado || !caraActual) return;

    const zona = e.target.closest("[class^='Zona']");
    if (!zona) return;

    if (!puedeSoltarPorDado(zona)) {
        e.stopImmediatePropagation(); 
        e.preventDefault();
        zona.style.borderColor = "red";
        setTimeout(() => zona.style.borderColor = "", 500);
        window.dinoArrastrado = null;
        return;
    }
});
