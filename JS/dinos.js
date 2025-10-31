document.addEventListener("DOMContentLoaded", () => {
    const dinosContainer = document.querySelector(".Dinos_ALM");
    const btnMostrar = document.getElementById("DinoGen");
    let yaGenerado = false;

    btnMostrar.addEventListener("click", () => {
        if (yaGenerado) return;

        dinosContainer.innerHTML = "";

        const dinos = [
            "../Recursos/Dino1.png",
            "../Recursos/Dino2.png",
            "../Recursos/Dino3.png",
            "../Recursos/Dino4.png",
            "../Recursos/Dino5.png",
            "../Recursos/Dino6.png"
        ];

        const cantidad = 6;

        for (let i = 0; i < cantidad; i++) {
            const randomIndex = Math.floor(Math.random() * dinos.length);
            const src = dinos[randomIndex];

            const img = document.createElement("img");
            img.src = src;
            img.alt = "Dinosaurio";
            img.draggable = true;
            dinosContainer.appendChild(img);
        }

        if (typeof activarDragDrop === "function") {
            activarDragDrop();
        }

        yaGenerado = true;
    });
});
