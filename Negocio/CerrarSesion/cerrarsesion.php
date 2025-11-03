<?php
session_start();   
session_unset();   
session_destroy();  
header("Location: ../../Presentacion/HTML/index.php"); 
exit();
