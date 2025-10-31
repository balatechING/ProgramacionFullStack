const button = document.getElementById("tirarDado");

const dados = ["dado1", "dado2", "dado3", "dado4", "dado5", "dado6"];
let caraActual = null; // Guarda el resultado final del dado

function ocultarCaras() {
    dados.forEach(id => {
        document.getElementById(id).style.display = "none";
    });
}

// === Restricciones de zonas por cara ===
const zonasBosque = [1, 2, 3, 4, 5, 6, 7, 8].map(n => `.Zona${n}`);
const zonasLlanura = [9, 10, 11, 12, 13, 14, 15, 16].map(n => `.Zona${n}`);
const zonaCafeteria = [".Zona15"];
const zonaAseos = [".Zona16"];

// === Tirar el dado ===
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
        caraActual = aleatorio + 1; // Guarda la cara final (1 a 6)
        console.log("Resultado del dado:", caraActual);
    }, 2000);
});

// === Función que decide si se puede soltar según el dado ===
function puedeSoltarPorDado(zona) {
    const claseZona = [...zona.classList].find(c => c.startsWith("Zona"));
    if (!claseZona) return false;

    switch (caraActual) {
        case 1: // Bosque
            return zonasBosque.includes(`.${claseZona}`);
        case 2: // Llanura
            return zonasLlanura.includes(`.${claseZona}`);
        case 3: // Aseos (derecha del río)
            return zonaAseos.includes(`.${claseZona}`);
        case 4: // Cafetería (izquierda del río)
            return zonaCafeteria.includes(`.${claseZona}`);
        case 5: // Recinto vacío
            return zona.children.length === 0;
        case 6: // Sin T-Rex (Dino3)
            const tieneTrex = zona.querySelector("img[data-tipo='Dino3']");
            return !tieneTrex;
        default:
            return true;
    }
}

// === Interceptor del drop: evita que se ejecute el drop si no cumple ===
document.addEventListener("dragover", (e) => {
    if (!window.dinoArrastrado || !caraActual) return;

    const zona = e.target.closest("[class^='Zona']");
    if (!zona) return;

    // Si el dado no permite soltar ahí, cancelamos el preventDefault
    if (!puedeSoltarPorDado(zona)) {
        e.stopImmediatePropagation(); // Evita que llegue al dragover de restricciones.js
        e.dataTransfer.dropEffect = "none";
    }
});

document.addEventListener("drop", (e) => {
    if (!window.dinoArrastrado || !caraActual) return;

    const zona = e.target.closest("[class^='Zona']");
    if (!zona) return;

    // Si el dado no permite soltar ahí, cancelamos el drop ANTES de restricciones.js
    if (!puedeSoltarPorDado(zona)) {
        e.stopImmediatePropagation(); // Detiene el evento antes de llegar al drop original
        e.preventDefault();
        zona.style.borderColor = "red";
        setTimeout(() => zona.style.borderColor = "", 500);
        window.dinoArrastrado = null;
        return;
    }
});
