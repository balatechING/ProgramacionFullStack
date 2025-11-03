-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-09-2025
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Base de datos: `bd_balatech`

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `historial`
-- --------------------------------------------------------
CREATE TABLE `historial` (
  `id_historial` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_ganador` int(11) NOT NULL,
  `puntos` int(50) NOT NULL,
  PRIMARY KEY (`id_historial`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `partidas`
-- --------------------------------------------------------
CREATE TABLE `partidas` (
  `id_partida` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `estado` varchar(50) DEFAULT 'finalizada',
  PRIMARY KEY (`id_partida`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `usuarios`
-- --------------------------------------------------------
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `correo_usuario` varchar(100) DEFAULT NULL,
  `nombre_usuario` varchar(50) DEFAULT NULL,
  `contrasenia` varchar(100) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Volcado de datos para la tabla `usuarios`
-- --------------------------------------------------------
INSERT INTO `usuarios` (`id_usuario`, `correo_usuario`, `nombre_usuario`, `contrasenia`) VALUES
(3, 'lu.gonzafer@gmail.com', 'asdawd', ''),
(4, 'matipor33@gmail.com', 'pepito', ''),
(5, 'matipor33@gmail.com', 'pepito', ''),
(6, 'lu.gonzafer@gmail.com', 'Xenoverse', '$2y$10$fZZ6xK6E8j09czaXtkOV5.lmfEngrxK2nSq9SdppfmFPQfnOZ25da'),
(7, 'matipor33@gmail.com', 'jose', '$2y$10$VZ0AMn8zzjdn4lScnbh4Quzkc4G194xN9lHS2NL8nRfG/3iMX9mb2'),
(8, 'lu.gonzafer@gmail.com', 'close', '$2y$10$PaQNALFb.bU6P.P1ouMkVe22Z6wGpukKyUNkALijbigbE73OPMm2m'),
(13, 'lu.gonzafer@gmail.com', 'asdawd', '$2y$10$i85kMU7WSZuS4HAbQfuzpOAKCOvfrbs3Sa4T1VYEvKwKwEQuHiU.S'),
(14, 'lu.gonzafer@gmail.com', 'asdawd', '$2y$10$D9OdZoR/YWdrPi3PAXm12OIrpB3lhM92VcG7w90uN/1MrvdTGsJj2'),
(15, 'lu.gonzafer@gmail.com', 'asdawd', '$2y$10$2OOLFk/jWmJKINzUE/csyuhNIvzedUtpOC26OKt.j7uLfAkq0G6qO'),
(16, 'lu.gonzafer@gmail.com', 'asdawd', '$2y$10$ZvCzGpsUEIZvzmj1XJgbye6Nv394WsYxyFfNwT2oyyqC6.eI6mY9G'),
(17, 'lu.gonzafer@gmail.com', 'asdawd', '$2y$10$0cbvCWMNqCyPwKDS4uxV6O7Py.wJqMvz9rDVfW4F6XLBPXVOk2BAu'),
(18, 'cccccc', 'asdawd', '$2y$10$WonnftgrnbWY6Wo3FslyGOjlvsFHq/IOoRxR043sgpa2GyFeSzSJK');

-- --------------------------------------------------------
-- Índices para tablas volcadas
-- --------------------------------------------------------
ALTER TABLE `historial`
  ADD KEY `id_ganador` (`id_ganador`);

-- --------------------------------------------------------
-- Restricciones para tablas volcadas
-- --------------------------------------------------------
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`id_ganador`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;
