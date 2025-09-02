const button = document.getElementById("tirarDado");

const dados = ["dado1", "dado2", "dado3", "dado4", "dado5", "dado6"];

function ocultarCaras() {
    dados.forEach(id => {
        document.getElementById(id).style.display = "none";
    });
}

button.addEventListener("click", (event) => {  // <-- pasar event
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
    }, 2000);
});
