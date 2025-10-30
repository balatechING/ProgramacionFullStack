<?php
$servidor = "localhost";
$contrasenia = "";
$baseDeDatos = "draftosaurus";
$usuario = "root";
$conexion = new mysqli($servidor, $usuario, $contrasenia, $baseDeDatos);
if($conexion->connect_error){
    die("La conexion fallo". $conexion->connect_error);
}
?>