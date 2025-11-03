<?php
session_start();
include($_SERVER['DOCUMENT_ROOT'].'/ProgramacionFS/Datos/conexionBD.php');

if(isset($_POST['Ingresar'])){
    if(empty($_POST['correo']) || empty($_POST['name']) || empty($_POST['contrasenia'])){
        $error = "Los campos están vacíos";
    } else {
        $nombre = $_POST['name'];
        $correo = $_POST['correo'];
        $contrasenia = $_POST['contrasenia'];

        $stmt = $conexion->prepare("SELECT * FROM usuarios WHERE correo_usuario = ? AND nombre_usuario = ?");
        $stmt->bind_param("ss", $correo, $nombre);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if($datos = $resultado->fetch_object()){
            if(password_verify($contrasenia, $datos->contrasenia)){
                // Guardar sesión
                $_SESSION['id_usuario'] = $datos->id_usuario;
                $_SESSION['nombre_usuario'] = $datos->nombre_usuario;
                $_SESSION['correo_usuario'] = $datos->correo_usuario;

                header("Location: ../../Presentacion/HTML/index.php");
                exit();
            } else {
                $error = "Contraseña incorrecta";
            }
        } else {
            $error = "Usuario no encontrado";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio de Sesión</title>
    <link rel="stylesheet" href="../../Presentacion/CSS/registro.css">
</head>
<body>
<header>
    <h1 class="Titulo">Draftosaurus</h1>
    <a class="boton" href="../../Presentacion/HTML/index.php">Volver</a>
</header>

<div class="form-container">
    <?php if(!empty($error)) echo "<div class='error'>$error</div>"; ?>
    <form action="<?= $_SERVER['PHP_SELF'] ?>" method="post">
        <label for="nombre">Nombre de Usuario:</label>
        <input type="text" name="name" id="name" placeholder="Ingrese su Nombre de Usuario">
        <label for="correo">Correo:</label>
        <input type="text" name="correo" id="correo" placeholder="Ingrese su correo">
        <label for="contrasenia">Contraseña</label>
        <input type="password" name="contrasenia" id="contrasenia" placeholder="Ingrese su contraseña">
        <button type="submit" name="Ingresar" id="Ingresar">Iniciar Sesión</button>
    </form>
</div>
</body>
</html>
