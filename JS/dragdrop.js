const dinos = document.querySelectorAll('.Dinos_ALM img');
const zonas = document.querySelectorAll('.Zona1, .Zona2, .Zona3, .Zona4, .Zona5, .Zona6, .Zona7, .Zona8, .Zona9, .Zona10, .Zona11, .Zona12, .Zona13, .Zona14, .Zona15, .Zona16');

let dragged;

dinos.forEach(dino => {
    dino.setAttribute('draggable', 'true');
    dino.addEventListener('dragstart', e => {
        dragged = e.target;
        e.dataTransfer.setData('text/plain', '');
    });
});

zonas.forEach(zona => {
    zona.addEventListener('dragover', e => e.preventDefault());
    zona.addEventListener('drop', e => {
        e.preventDefault();
        if (dragged) {
            const width = dragged.offsetWidth + 'px';
            const height = dragged.offsetHeight + 'px';
            dragged.style.position = 'absolute';
            dragged.style.width = width;
            dragged.style.height = height;
            dragged.style.left = e.offsetX - dragged.offsetWidth / 2 + 'px';
            dragged.style.top = e.offsetY - dragged.offsetHeight / 2 + 'px';
            zona.appendChild(dragged);
        }
    });
});
