<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <link rel="stylesheet" href="../../Presentacion/CSS/registro.css">
</head>
<body>
    <?php
    
    if(isset($_POST["Enviar"])){
        if(empty($_POST['correo']) || empty($_POST['contrasenia'])){
            $mensaje = "Los campos estan vacios";
            echo '<div class="vacios">Los campos estan vacios</div>';
        }else{
        $nombre = $_POST['nombre'];
        $correo = $_POST['correo'];
        $contrasenia = $_POST['contrasenia'];
        $hashed_password = password_hash($contrasenia, PASSWORD_DEFAULT);

        include('../../Datos/conexionBD.php'); 
        $sql = 'INSERT INTO usuarios (nombre_usuario, correo_usuario, contrasenia) values ("'.$nombre.'", "'.$correo.'", "'.$hashed_password.'")';
        
        $resultado = mysqli_query($conexion, $sql);
        if($resultado){
            echo '<div class="logrado">Registro Exitoso</div>';
        } else{
            echo "Error en el registro";
        }
    }
    }
    ?>
    <header>
        <h1 class="title">Draftosaurus</h1>
        <a class="boton" href="../../Presentacion/HTML/index.php">Volver</a>
    </header>
    <div class="form-container">
    <form action="<?=$_SERVER['PHP_SELF']?>" method="post">
        <label for="nombre">Nombre de Usuario:</label>
        <input type="text" name="nombre" id="nombre" placeholder="Ingrese Nombre de Usaurio">
        <lavel for="correo">Correo:</label>
        <input type="text" name="correo" id="correo" placeholder="Ingrese su correo">
        <label for="contrasenia">Contraseña:</label>
        <input type="password" name="contrasenia" id="contrasenia" placeholder="Ingrese su contraseña">
        <button type="submit" name="Enviar" id="Enviar">Ingresar Registro</button>
    </form>
    </div>
</body>
</html>