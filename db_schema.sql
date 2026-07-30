-- Esquema SQL para la base de datos del Portal Académico carrera.mawil.us
-- Puedes importar este archivo directamente en tu phpMyAdmin.

CREATE TABLE IF NOT EXISTS `telemetry` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `temp` DECIMAL(4,2) NOT NULL DEFAULT 24.20,
  `humidity` DECIMAL(4,2) NOT NULL DEFAULT 62.40,
  `reservoir` DECIMAL(4,2) NOT NULL DEFAULT 78.50,
  `solarVoltage` DECIMAL(4,2) NOT NULL DEFAULT 18.40,
  `solarCurrent` DECIMAL(4,2) NOT NULL DEFAULT 3.20,
  `power` DECIMAL(6,2) NOT NULL DEFAULT 58.80,
  `co2` INT NOT NULL DEFAULT 412,
  `anomalyMode` TINYINT(1) NOT NULL DEFAULT 0,
  `last_updated` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar estado inicial de telemetría
INSERT INTO `telemetry` (`id`, `temp`, `humidity`, `reservoir`, `solarVoltage`, `solarCurrent`, `power`, `co2`, `anomalyMode`, `last_updated`) 
VALUES (1, 24.20, 62.40, 78.50, 18.40, 3.20, 58.80, 412, 0, 1770000000)
ON DUPLICATE KEY UPDATE `id`=`id`;

CREATE TABLE IF NOT EXISTS `telemetry_history` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `time_str` VARCHAR(20) NOT NULL,
  `water` DECIMAL(4,2) NOT NULL,
  `solar` DECIMAL(6,2) NOT NULL,
  `temp` DECIMAL(4,2) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar historial inicial de telemetría
INSERT INTO `telemetry_history` (`time_str`, `water`, `solar`, `temp`) VALUES
('10:00', 72.00, 45.00, 22.00),
('10:05', 73.00, 48.00, 22.50),
('10:10', 74.00, 50.00, 23.00),
('10:15', 75.00, 52.00, 23.40),
('10:20', 77.00, 55.00, 23.80),
('10:25', 78.00, 58.80, 24.20);

CREATE TABLE IF NOT EXISTS `reports` (
  `id` BIGINT PRIMARY KEY,
  `category` VARCHAR(50) NOT NULL,
  `description` TEXT NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `reporter` VARCHAR(255) NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'pending',
  `date_str` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar reportes iniciales
INSERT INTO `reports` (`id`, `category`, `description`, `location`, `reporter`, `status`, `date_str`) VALUES
(101, 'water', 'Baja presión detectada en la acometida norte de la escuela de Los Vergeles.', 'Sector Escuela Comunitaria', 'Sr. Manuel Guamán (Líder Vecinal)', 'progress', 'Julio 27, 2026'),
(102, 'energy', 'Fluctuaciones de voltaje intermitentes en el banco de inversores solares secundarios.', 'Estación de Baterías Norte', 'Ing. Alejandro Rivas', 'pending', 'Julio 28, 2026'),
(103, 'telecom', 'Reemplazo y calibración del nodo gateway LoRaWAN principal finalizado con éxito.', 'Torre de Transmisión del Aula Tecnológica', 'M.Sc. Diana Paredes', 'resolved', 'Julio 24, 2026');

CREATE TABLE IF NOT EXISTS `uploads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `date_str` VARCHAR(50) NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'pending',
  `role` VARCHAR(50) NOT NULL DEFAULT 'student',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar cargas iniciales
INSERT INTO `uploads` (`name`, `date_str`, `status`, `role`) VALUES
('Informe_Final_Practicas_Vergeles_Velasco.pdf', 'Julio 10, 2026', 'approved', 'student'),
('Firma_Asistencia_Tutor_Alejandro.pdf', 'Julio 12, 2026', 'approved', 'student');
