document.addEventListener("DOMContentLoaded", () => {
    const dinosContainer = document.querySelector(".Dinos_ALM");
    const btnMostrar = document.getElementById("DinoGen");
    let yaGenerado = false;

    btnMostrar.addEventListener("click", () => {
        if (yaGenerado) return;

        dinosContainer.innerHTML = "";

        const tipos = ["Dino1","Dino2","Dino3","Dino4","Dino5","Dino6"];
        const cantidad = 6;

        for (let i = 0; i < cantidad; i++) {
            const randomIndex = Math.floor(Math.random() * tipos.length);
            const tipo = tipos[randomIndex];
            const src = `../Recursos/${tipo}.png`;

            const img = document.createElement("img");
            img.src = src;
            img.alt = "Dinosaurio";
            img.draggable = true;

            img.dataset.tipo = tipo;

            dinosContainer.appendChild(img);
        }

        if (typeof activarDragDrop === "function") activarDragDrop();
        if (typeof activarDragDropSimilitud === "function") activarDragDropSimilitud();

        yaGenerado = true;
    });
});

