<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio de Sesion</title>
    <link rel="stylesheet" href="../HTML Y CSS/login.css">
</head>
<body>
    <?php
    include 'conexionBD.php';

    if(isset($_POST['Ingresar'])){
        if(empty($_POST['correo']) || empty($_POST['contrasenia'])){
            echo "Los campos estan vacios";
        }else{
        $nombre = $_POST['name'];
        $correo = $_POST['correo'];
        $contrasenia = $_POST['contrasenia'];

        $sql = $conexion->query("SELECT * FROM usuarios WHERE correo_usuario = '$correo' AND nombre_usuario = '$nombre' ");
        if($datos = $sql->fetch_object()){
            if(password_verify($contrasenia, $datos->contrasenia)){
            header("location:../HTML y CSS/index.html");
            exit();
            }else{
            echo "Datos incorrectos";
            }
        }else{
            echo "Datos incorrectos";
        }
        }
    }
    ?>
    <header>
        <h1 class="Titulo">Draftosaurus</h1>
        <a class="Boton" href="../HTML y CSS/index.html">Volver</a>
    </header>
    <div class="form-container">
        <form action="<?=$_SERVER['PHP_SELF']?>" method="post">
        <label for="nombre">Nombre de Usuario:</label>
        <input type="text" name="name" id="name" placeholder="Ingrese su Nombre de Usuario">
        <label for="correo">Correo:</label>
        <input type="text" name="correo" id="correo" placeholder="Ingrese su correo">
        <label for="contrasenia">Contraseña</label>
        <input type="password" name="contrasenia" id="contrasenia" placeholder="Ingrese su contraseña">
        <button type="submit" name="Ingresar" id="Ingresar">Iniciar Sesion</button>
        </form>
    </div>
</body>
</html>