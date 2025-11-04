Manual de Instalación:
Instalar el programa  XAMPP desde su página oficial:






Una vez dentro de la carpeta “htdocs” de XAMPP, clonar el repositorio con el comando “git clone https://github.com/balatechING/ProgramacionFullStack.git

Ya con todos los archivos del sistema descargados, iniciaremos Apache y MySQL desde XAMPP o la herramienta a preferencia del usuario


Acceder a phpMyAdmin presionando el boton llamado “Admin” que corresponde a MySQL dentro de XAMPP


Hacer click donde dice “nueva” en la columna de la parte lateral izquierda para poder crear una nueva base de datos y luego clickear donde dice “importar” que se encuentra en la barra de opciones que podemos ver arriba

Una vez dentro de la opcion “importar” hacemos click en “selecionar archivo”, dirigirse a la ruta de la base de datos y seleccionar el archivo

Dirigirse abajo del todo en la pagina y clickear el botón “importar”

Fin manual de instalación
----------------------------------------------------------------------------------------------------------------
Manual de Usuario

Introducción: 
El presente manual de usuario tiene como objetivo guiar al usuario final en la correcta utilización del proyecto S.I.G.P.D desarrollado por Balatech.
Este sistema permite gestionar, registrar y administrar partidas partidas del juego Draftosaurus de forma digital, simplificando el control de puntuaciones, la validación de reglas y el seguimiento de jugadores en tiempo real, también permite el registro de usuario, login y modificación del mismo.

Requisitos de Software:
-Sistema operativo: windows 10 o superior 
-Servidor local: Xampp o equivalente (Apache, PHP, MySql)
-Navegador compatible: Chrome, Mozilla Firefox o Microsoft Edge


Acceso al Sistema:
Iniciar el servidor local (XAMPP) y asegurarse de que Apache y MySql esten en ejecución
Abrir navegador y ingresar la siguiente direccion
http://localhost/(Ruta del archivo)

Registro de Usuario:
En la pantalla de inicio seleccionar el botón “registrarse”
Ingresar los campos obligatorios:
-Nombre
-Correo
-Contraseña
Clickear botón Enviar.
El sistema mostrará un mensaje de que el registro fue válido

Empezar una partida:
Desde la pantalla de inicio clickear el botón Jugar
Elegir modo de juego
Clickear empezar partida 
El sistema generara el tablero, dado y dinosaurios disponibles para cada jugador

Colocar un dinosaurio:
Clickear botón “dinosaurios”
Elegir el tipo de dinosaurio
Arrastrarlo 
El sistema validará automáticamente las reglas del juego:
-Si el movimiento es válido entonces colocara el dinosaurio en el recinto
           -Si no es válido entonces se mostrar un mensaje que diga que no es válido el movimiento


Consultar Historial de partidas:
En la pantalla principal clickear el botón “Historial de partidas”
El sistema mostrará una lista de partidas jugadas por el usuario logueado
El usuario podrá eliminar las partidas que desee


Soluciones a problemas comunes
Problema 
Causa Posible
Solución recomendada
No se puede acceder al sistema 
Servidor Apache o MySql no iniciado
Verificar que XAMPP este en ejecución
Error al registrar usuario
Campos vacíos o formato invalido 
Revisar los datos ingresados y volver a intentar 
Dinosaurio no se coloca
Esta clickeando el dinosaurio y luego el recinto
Arrastrar el dinosaurio al recinto elegido en base a la restricción 


 
Recomendaciones Generales:
No cerrar el navegador mientras una partida este en curso
Evitar abrir múltiples pestañas del sistema simultáneamente


Conclusión:
El proyecto S.I.G.P.D ha sido diseñado para ofrecer una experiencia de gestión de partidas práctica, visual y confiable. Este manual proporciona las instrucciones necesarias para el uso correcto del sistema, garantizando que tanto usuarios nuevos como experimentados puedan aprovechar todas sus funcionalidades

