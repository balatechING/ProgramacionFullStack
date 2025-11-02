<?php
include("conexionBD.php");

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_ganador = isset($_POST['id_ganador']) ? intval($_POST['id_ganador']) : null;

    if ($id_ganador === null) {
        echo json_encode(["error" => "Falta el id del ganador"]);
        exit;
    }

    $fecha = date('Y-m-d H:i:s');

    $sql = "INSERT INTO historial (fecha, id_ganador) VALUES ('$fecha', '$id_ganador')";

    if ($conexion->query($sql) === TRUE) {
        echo json_encode(["success" => true, "mensaje" => "Partida registrada correctamente"]);
    } else {
        echo json_encode(["error" => "Error al guardar el historial: " . $conexion->error]);
    }

    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM historial ORDER BY fecha DESC";
    $resultado = $conexion->query($sql);

    $historial = [];

    if ($resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_assoc()) {
            $historial[] = $fila;
        }
    }

    echo json_encode($historial);
    exit;
}
?>
