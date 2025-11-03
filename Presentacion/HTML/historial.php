<?php
session_start();
include($_SERVER['DOCUMENT_ROOT'].'/ProgramacionFS/Datos/conexionBD.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/historial.css">
    <title>Historial</title>
</head>
<body>
<header class="botones2">
    <a href="index.php">Volver</a>
</header>

<section class="Historial">
    <div class="Dinos_ALM"></div>
    <div class="Info">
<?php
$sql = "SELECT h.id_historial, h.fecha, h.puntos, u.nombre_usuario AS ganador 
        FROM historial h
        LEFT JOIN usuarios u ON h.id_ganador = u.id_usuario
        ORDER BY h.fecha DESC";

$resultado = $conexion->query($sql);

if (!$resultado) {
    echo "<p>Error en la consulta: " . $conexion->error . "</p>";
} elseif ($resultado->num_rows > 0) {
    echo "<table>";
    echo "<tr><th>ID</th><th>Fecha</th><th>Ganador</th><th>Puntaje</th></tr>";
    while ($fila = $resultado->fetch_assoc()) {
        echo "<tr>";
        echo "<td>".htmlspecialchars($fila['id_historial'])."</td>";
        echo "<td>".htmlspecialchars($fila['fecha'])."</td>";
        echo "<td>".htmlspecialchars($fila['ganador'])."</td>";
        echo "<td>".htmlspecialchars($fila['puntos'])."</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "<p>No hay partidas registradas</p>";
}
?>
</div>

</section>
</body>
</html>
