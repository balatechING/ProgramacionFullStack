<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DRAFTOSAURUS</title>
    <link rel="stylesheet" href="../CSS/index.css">
    <link href="https://fonts.googleapis.com/css2?family=Bangers&family=WDXL+Lubrifont+SC&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<header class="container py-3 position-relative text-center">
    <h1 class="titulo">DRAFTOSAURUS</h1>
    <div class="header-botones d-flex gap-2 position-absolute top-0 end-0">
        <?php if(isset($_SESSION['nombre_usuario'])): ?>
            <span>Hola, <?= htmlspecialchars($_SESSION['nombre_usuario']) ?></span>
            <a class="botones" href="../../Negocio/CerrarSesion/cerrarsesion.php">Cerrar Sesión</a>
        <?php else: ?>
            <a class="botones" href="../../Negocio/Registro/registro.php">REGISTRO</a>
            <a class="botones" href="../../Negocio/Login/login.php">LOGIN</a>
        <?php endif; ?>
    </div>
</header>

<main class="d-flex flex-column justify-content-center align-items-center flex-grow-1 w-100">
    <div class="d-flex flex-column flex-lg-row gap-3 justify-content-center align-items-center">
        <a class="menu-boton" href="jugar.html">JUGAR</a>
        <a class="menu-boton" href="reglas.html">REGLAS</a>
        <a class="menu-boton" href="historial.php">HISTORIAL</a>
    </div>
</main>

<footer class="py-3 text-center">@Draftosaurus 2025 Balatech. Derechos reservados</footer>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
