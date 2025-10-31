function activarDragDrop() {
    const dinos = document.querySelectorAll('.Dinos_ALM img');
    const zonas = document.querySelectorAll(
        '.Zona1, .Zona2, .Zona3, .Zona4, .Zona5, .Zona6, .Zona7, .Zona8, ' +
        '.Zona9, .Zona10, .Zona11, .Zona12, .Zona13, .Zona14, .Zona15, .Zona16'
    );

    let dragged = null;

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
            if (!dragged) return;

            const rect = zona.getBoundingClientRect();
            const x = e.clientX - rect.left - dragged.offsetWidth / 2;
            const y = e.clientY - rect.top - dragged.offsetHeight / 2;

            const maxX = rect.width - dragged.offsetWidth;
            const maxY = rect.height - dragged.offsetHeight;
            const finalX = Math.max(0, Math.min(x, maxX));
            const finalY = Math.max(0, Math.min(y, maxY));

            dragged.style.position = 'absolute';
            dragged.style.left = finalX + 'px';
            dragged.style.top = finalY + 'px';
            dragged.style.maxWidth = dragged.offsetWidth + 'px';
            dragged.style.maxHeight = dragged.offsetHeight + 'px';

            zona.appendChild(dragged);
            dragged = null;
        });
    });
}
