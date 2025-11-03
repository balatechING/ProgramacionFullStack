<?php
session_start();
include($_SERVER['DOCUMENT_ROOT'].'/ProgramacionFS/Datos/conexionBD.php');

if(!isset($_SESSION['id_usuario'])){
    echo json_encode(["error" => "No hay una sesión iniciada"]);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];

$datos = json_decode(file_get_contents('php://input'), true);
$puntos = isset($datos['puntos']) ? (int)$datos['puntos'] : 0;

$sql = $conexion->prepare("INSERT INTO historial (id_ganador, puntos) VALUES (?, ?)");
$sql->bind_param("ii", $id_usuario, $puntos);

if($sql->execute()){
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conexion->error]);
}
?>
