<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dataDir = __DIR__ . '/data';
$uploadsDir = __DIR__ . '/uploads';

if (!file_exists($dataDir)) {
    mkdir($dataDir, 0755, true);
}
if (!file_exists($uploadsDir)) {
    mkdir($uploadsDir, 0755, true);
}

// Database config file path
$configFile = __DIR__ . '/db_config.php';
$pdo = null;

// Attempt database connection if config exists
if (file_exists($configFile)) {
    include_once($configFile);
    if (defined('DB_HOST') && defined('DB_NAME') && defined('DB_USER') && defined('DB_PASS')) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (\PDOException $e) {
            // Log connection error but don't crash, fallback to JSON
            error_log("Database connection failed: " . $e->getMessage());
        }
    }
}

// File paths for JSON fallback
$telemetryFile = $dataDir . '/telemetry.json';
$reportsFile = $dataDir . '/reports.json';
$uploadsFile = $dataDir . '/uploads.json';
$teachersFile = $dataDir . '/teachers.json';

// Helper function to send JSON error
function sendError($message, $code = 400) {
    http_response_code($code);
    echo json_encode(["error" => $message]);
    exit;
}

// Initial default structures
$defaultTelemetry = [
    "temp" => 24.2,
    "humidity" => 62.4,
    "reservoir" => 78.5,
    "solarVoltage" => 18.4,
    "solarCurrent" => 3.2,
    "power" => 58.8,
    "co2" => 412,
    "anomalyMode" => false,
    "last_updated" => time()
];

$defaultHistory = [
    ["time" => "10:00", "water" => 72, "solar" => 45, "temp" => 22],
    ["time" => "10:05", "water" => 73, "solar" => 48, "temp" => 22.5],
    ["time" => "10:10", "water" => 74, "solar" => 50, "temp" => 23],
    ["time" => "10:15", "water" => 75, "solar" => 52, "temp" => 23.4],
    ["time" => "10:20", "water" => 77, "solar" => 55, "temp" => 23.8],
    ["time" => "10:25", "water" => 78, "solar" => 58.8, "temp" => 24.2]
];

$initialReports = [
    [
        "id" => 101,
        "category" => "water",
        "description" => "Baja presión detectada en la acometida norte de la escuela de Los Vergeles.",
        "location" => "Sector Escuela Comunitaria",
        "reporter" => "Sr. Manuel Guamán (Líder Vecinal)",
        "status" => "progress",
        "date" => "Julio 27, 2026"
    ],
    [
        "id" => 102,
        "category" => "energy",
        "description" => "Fluctuaciones de voltaje intermitentes en el banco de inversores solares secundarios.",
        "location" => "Estación de Baterías Norte",
        "reporter" => "Ing. Alejandro Rivas",
        "status" => "pending",
        "date" => "Julio 28, 2026"
    ],
    [
        "id" => 103,
        "category" => "telecom",
        "description" => "Reemplazo y calibración del nodo gateway LoRaWAN principal finalizado con éxito.",
        "location" => "Torre de Transmisión del Aula Tecnológica",
        "reporter" => "M.Sc. Diana Paredes",
        "status" => "resolved",
        "date" => "Julio 24, 2026"
    ]
];

$initialUploads = [
    ["name" => "Informe_Final_Practicas_Vergeles_Velasco.pdf", "date" => "Julio 10, 2026", "status" => "approved", "role" => "student"],
    ["name" => "Firma_Asistencia_Tutor_Alejandro.pdf", "date" => "Julio 12, 2026", "status" => "approved", "role" => "student"]
];

$initialTeachers = [
    [
        "id" => 1,
        "name" => "Dr. Alejandro Rivas",
        "title" => "Ph.D. en Telecomunicaciones",
        "department" => "telecom",
        "email" => "arivas@universidad.edu.ec",
        "avatar" => "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        "scholar" => "https://scholar.google.com/",
        "orcid" => "https://orcid.org/",
        "scopus" => "https://www.scopus.com/",
        "bio" => "Especialista en redes inalámbricas de baja potencia (LPWAN) y modelamiento de canales de propagación para entornos rurales."
    ],
    [
        "id" => 2,
        "name" => "M.Sc. Beatriz Castro",
        "title" => "Máster en Sistemas Embebidos",
        "department" => "hardware",
        "email" => "bcastro@universidad.edu.ec",
        "avatar" => "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
        "scholar" => "https://scholar.google.com/",
        "orcid" => "https://orcid.org/",
        "scopus" => "https://www.scopus.com/",
        "bio" => "Investigadora en diseño de hardware de bajo consumo y optimización de firmware para sensores agrícolas autónomos."
    ],
    [
        "id" => 3,
        "name" => "Dr. Carlos Mendoza",
        "title" => "Ph.D. en Ciencias de la Computación",
        "department" => "software",
        "email" => "cmendoza@universidad.edu.ec",
        "avatar" => "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        "scholar" => "https://scholar.google.com/",
        "orcid" => "https://orcid.org/",
        "scopus" => "https://www.scopus.com/",
        "bio" => "Líder del grupo de computación en la nube e inteligencia artificial para la predicción de fluctuaciones en recursos hídricos."
    ],
    [
        "id" => 4,
        "name" => "M.Sc. Diana Paredes",
        "title" => "Máster en IoT e Industria 4.0",
        "department" => "telecom",
        "email" => "dparedes@universidad.edu.ec",
        "avatar" => "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
        "scholar" => "https://scholar.google.com/",
        "orcid" => "https://orcid.org/",
        "scopus" => "https://www.scopus.com/",
        "bio" => "Consultora en automatización de fábricas, integración de protocolos Modbus/MQTT y robótica colaborativa."
    ]
];

// 1. Manage Telemetry (MySQL or JSON fallback)
function getTelemetry($pdo, $telemetryFile, $defaultTelemetry, $defaultHistory) {
    if ($pdo) {
        try {
            // Get current telemetry row
            $stmt = $pdo->query("SELECT * FROM telemetry LIMIT 1");
            $telemetry = $stmt->fetch();
            
            if (!$telemetry) {
                // Seed telemetry
                $stmt = $pdo->prepare("INSERT INTO telemetry (temp, humidity, reservoir, solarVoltage, solarCurrent, power, co2, anomalyMode, last_updated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([
                    $defaultTelemetry['temp'], $defaultTelemetry['humidity'], $defaultTelemetry['reservoir'],
                    $defaultTelemetry['solarVoltage'], $defaultTelemetry['solarCurrent'], $defaultTelemetry['power'],
                    $defaultTelemetry['co2'], 0, $defaultTelemetry['last_updated']
                ]);
                $telemetry = $defaultTelemetry;
                $telemetry['id'] = $pdo->lastInsertId();
            }
            
            $telemetry['anomalyMode'] = (bool)$telemetry['anomalyMode'];
            
            // Get history log
            $stmt = $pdo->query("SELECT time_str as time, water, solar, temp FROM telemetry_history ORDER BY id ASC");
            $history = $stmt->fetchAll();
            
            if (empty($history)) {
                $history = $defaultHistory;
            }
            
            // Fluctuations check
            $now = time();
            if ($now - $telemetry['last_updated'] >= 3) {
                $rand = (mt_rand() / mt_getrandmax());
                $anomalyMode = $telemetry['anomalyMode'];

                $newTemp = $telemetry['temp'] + ($rand - 0.5) * 0.2;
                $newHum = $telemetry['humidity'] + ($rand - 0.5) * 0.5;
                $newRes = $telemetry['reservoir'] + ($rand - 0.5) * 0.15;
                $newVolt = $telemetry['solarVoltage'] + ($rand - 0.5) * 0.3;
                $newCurr = $telemetry['solarCurrent'] + ($rand - 0.5) * 0.1;

                if ($anomalyMode) {
                    $newTemp = min($newTemp + 0.5, 38.5);
                    $newRes = max($newRes - 0.8, 12.4);
                    $newVolt = min($newVolt + 0.8, 26.5);
                } else {
                    $newTemp = max(18.0, min($newTemp, 30.0));
                    $newHum = max(40.0, min($newHum, 85.0));
                    $newRes = max(65.0, min($newRes, 95.0));
                    $newVolt = max(12.0, min($newVolt, 21.0));
                }

                $newCurr = max(0.5, min($newCurr, 8.0));
                $newPower = round($newVolt * $newCurr, 1);

                $telemetry = [
                    "temp" => round($newTemp, 1),
                    "humidity" => round($newHum, 1),
                    "reservoir" => round($newRes, 1),
                    "solarVoltage" => round($newVolt, 1),
                    "solarCurrent" => round($newCurr, 1),
                    "power" => $newPower,
                    "co2" => max(380, min($telemetry['co2'] + round(($rand - 0.5) * 4), 480)),
                    "anomalyMode" => $anomalyMode,
                    "last_updated" => $now
                ];

                // Update row in DB
                $stmt = $pdo->prepare("UPDATE telemetry SET temp=?, humidity=?, reservoir=?, solarVoltage=?, solarCurrent=?, power=?, co2=?, last_updated=? WHERE id=1");
                $stmt->execute([
                    $telemetry['temp'], $telemetry['humidity'], $telemetry['reservoir'],
                    $telemetry['solarVoltage'], $telemetry['solarCurrent'], $telemetry['power'],
                    $telemetry['co2'], $now
                ]);

                // Insert into history
                $timeStr = date("H:i:s", $now);
                $stmt = $pdo->prepare("INSERT INTO telemetry_history (time_str, water, solar, temp) VALUES (?, ?, ?, ?)");
                $stmt->execute([$timeStr, $telemetry['reservoir'], $telemetry['power'], $telemetry['temp']]);

                // Clean history to keep last 8 rows
                $historyCount = $pdo->query("SELECT COUNT(*) FROM telemetry_history")->fetchColumn();
                if ($historyCount > 8) {
                    $diff = $historyCount - 8;
                    $pdo->exec("DELETE FROM telemetry_history ORDER BY id ASC LIMIT $diff");
                }

                // Retrieve updated history
                $stmt = $pdo->query("SELECT time_str as time, water, solar, temp FROM telemetry_history ORDER BY id ASC");
                $history = $stmt->fetchAll();
            }

            return ["telemetry" => $telemetry, "history" => $history];
        } catch (\PDOException $e) {
            error_log("Telemetry SQL error, falling back to JSON: " . $e->getMessage());
        }
    }

    // JSON FALLBACK
    if (!file_exists($telemetryFile)) {
        $data = ["telemetry" => $defaultTelemetry, "history" => $defaultHistory];
        file_put_contents($telemetryFile, json_encode($data, JSON_PRETTY_PRINT));
        return $data;
    }

    $data = json_decode(file_get_contents($telemetryFile), true);
    if (!$data || !isset($data['telemetry'])) {
        $data = ["telemetry" => $defaultTelemetry, "history" => $defaultHistory];
        file_put_contents($telemetryFile, json_encode($data, JSON_PRETTY_PRINT));
        return $data;
    }

    $telemetry = $data['telemetry'];
    $history = $data['history'];
    $lastUpdated = isset($telemetry['last_updated']) ? $telemetry['last_updated'] : 0;
    $now = time();

    if ($now - $lastUpdated >= 3) {
        $rand = (mt_rand() / mt_getrandmax());
        $anomalyMode = isset($telemetry['anomalyMode']) ? $telemetry['anomalyMode'] : false;

        $newTemp = $telemetry['temp'] + ($rand - 0.5) * 0.2;
        $newHum = $telemetry['humidity'] + ($rand - 0.5) * 0.5;
        $newRes = $telemetry['reservoir'] + ($rand - 0.5) * 0.15;
        $newVolt = $telemetry['solarVoltage'] + ($rand - 0.5) * 0.3;
        $newCurr = $telemetry['solarCurrent'] + ($rand - 0.5) * 0.1;

        if ($anomalyMode) {
            $newTemp = min($newTemp + 0.5, 38.5);
            $newRes = max($newRes - 0.8, 12.4);
            $newVolt = min($newVolt + 0.8, 26.5);
        } else {
            $newTemp = max(18.0, min($newTemp, 30.0));
            $newHum = max(40.0, min($newHum, 85.0));
            $newRes = max(65.0, min($newRes, 95.0));
            $newVolt = max(12.0, min($newVolt, 21.0));
        }

        $newCurr = max(0.5, min($newCurr, 8.0));
        $newPower = round($newVolt * $newCurr, 1);

        $telemetry = [
            "temp" => round($newTemp, 1),
            "humidity" => round($newHum, 1),
            "reservoir" => round($newRes, 1),
            "solarVoltage" => round($newVolt, 1),
            "solarCurrent" => round($newCurr, 1),
            "power" => $newPower,
            "co2" => max(380, min($telemetry['co2'] + round(($rand - 0.5) * 4), 480)),
            "anomalyMode" => $anomalyMode,
            "last_updated" => $now
        ];

        $timeStr = date("H:i:s", $now);
        $history[] = [
            "time" => $timeStr,
            "water" => $telemetry['reservoir'],
            "solar" => $telemetry['power'],
            "temp" => $telemetry['temp']
        ];
        if (count($history) > 8) {
            array_shift($history);
        }

        $data = ["telemetry" => $telemetry, "history" => $history];
        file_put_contents($telemetryFile, json_encode($data, JSON_PRETTY_PRINT));
    }

    return $data;
}

// 2. Manage Reports (MySQL or JSON fallback)
function getReports($pdo, $reportsFile, $initialReports) {
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT id, category, description, location, reporter, status, date_str as date FROM reports ORDER BY id DESC");
            return $stmt->fetchAll();
        } catch (\PDOException $e) {
            error_log("Reports SQL error, falling back to JSON: " . $e->getMessage());
        }
    }

    if (!file_exists($reportsFile)) {
        file_put_contents($reportsFile, json_encode($initialReports, JSON_PRETTY_PRINT));
        return $initialReports;
    }
    $reports = json_decode(file_get_contents($reportsFile), true);
    return is_array($reports) ? $reports : $initialReports;
}

// 3. Manage Uploaded Files (MySQL or JSON fallback)
function getUploads($pdo, $uploadsFile, $initialUploads) {
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT name, date_str as date, status, role FROM uploads ORDER BY id DESC");
            return $stmt->fetchAll();
        } catch (\PDOException $e) {
            error_log("Uploads SQL error, falling back to JSON: " . $e->getMessage());
        }
    }

    if (!file_exists($uploadsFile)) {
        file_put_contents($uploadsFile, json_encode($initialUploads, JSON_PRETTY_PRINT));
        return $initialUploads;
    }
    $uploads = json_decode(file_get_contents($uploadsFile), true);
    return is_array($uploads) ? $uploads : $initialUploads;
}

// 4. Manage Teachers (MySQL or JSON fallback)
function getTeachers($pdo, $teachersFile, $initialTeachers) {
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT id, name, title, department, email, avatar, scholar, orcid, scopus, bio FROM teachers ORDER BY id ASC");
            return $stmt->fetchAll();
        } catch (\PDOException $e) {
            error_log("Teachers SQL error, falling back to JSON: " . $e->getMessage());
        }
    }

    if (!file_exists($teachersFile)) {
        file_put_contents($teachersFile, json_encode($initialTeachers, JSON_PRETTY_PRINT));
        return $initialTeachers;
    }
    $teachers = json_decode(file_get_contents($teachersFile), true);
    return is_array($teachers) ? $teachers : $initialTeachers;
}

// ROUTING
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'telemetry':
        echo json_encode(getTelemetry($pdo, $telemetryFile, $defaultTelemetry, $defaultHistory));
        break;

    case 'set_anomaly':
        $data = json_decode(file_get_contents('php://input'), true);
        $anomalyMode = isset($data['anomalyMode']) ? (bool)$data['anomalyMode'] : false;
        
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("UPDATE telemetry SET anomalyMode=?, last_updated=? WHERE id=1");
                $stmt->execute([(int)$anomalyMode, time()]);
                echo json_encode(getTelemetry($pdo, $telemetryFile, $defaultTelemetry, $defaultHistory));
                break;
            } catch (\PDOException $e) {
                error_log("Set Anomaly SQL error, falling back to JSON: " . $e->getMessage());
            }
        }

        $state = getTelemetry(null, $telemetryFile, $defaultTelemetry, $defaultHistory);
        $state['telemetry']['anomalyMode'] = $anomalyMode;
        $state['telemetry']['last_updated'] = time();
        
        file_put_contents($telemetryFile, json_encode($state, JSON_PRETTY_PRINT));
        echo json_encode($state);
        break;

    case 'reports':
        echo json_encode(getReports($pdo, $reportsFile, $initialReports));
        break;

    case 'create_report':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['description']) || !isset($data['reporter']) || !isset($data['location'])) {
            sendError("Datos incompletos.");
        }

        $newReportId = round(microtime(true) * 1000);
        $category = isset($data['category']) ? $data['category'] : 'water';
        $description = $data['description'];
        $location = $data['location'];
        $reporter = $data['reporter'];
        $status = "pending";
        $dateStr = date("d M Y");

        if ($pdo) {
            try {
                $stmt = $pdo->prepare("INSERT INTO reports (id, category, description, location, reporter, status, date_str) VALUES (?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([$newReportId, $category, $description, $location, $reporter, $status, $dateStr]);
                echo json_encode([
                    "id" => $newReportId,
                    "category" => $category,
                    "description" => $description,
                    "location" => $location,
                    "reporter" => $reporter,
                    "status" => $status,
                    "date" => $dateStr
                ]);
                break;
            } catch (\PDOException $e) {
                error_log("Create Report SQL error, falling back to JSON: " . $e->getMessage());
            }
        }

        $reports = getReports(null, $reportsFile, $initialReports);
        $newReport = [
            "id" => $newReportId,
            "category" => $category,
            "description" => $description,
            "location" => $location,
            "reporter" => $reporter,
            "status" => $status,
            "date" => $dateStr
        ];

        array_unshift($reports, $newReport);
        file_put_contents($reportsFile, json_encode($reports, JSON_PRETTY_PRINT));
        echo json_encode($newReport);
        break;

    case 'update_report_status':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['id']) || !isset($data['status'])) {
            sendError("ID o estado faltantes.");
        }

        if ($pdo) {
            try {
                $stmt = $pdo->prepare("UPDATE reports SET status=? WHERE id=?");
                $stmt->execute([$data['status'], $data['id']]);
                echo json_encode(["success" => true, "id" => $data['id'], "status" => $data['status']]);
                break;
            } catch (\PDOException $e) {
                error_log("Update Report Status SQL error, falling back to JSON: " . $e->getMessage());
            }
        }

        $reports = getReports(null, $reportsFile, $initialReports);
        $found = false;
        foreach ($reports as &$report) {
            if ($report['id'] == $data['id']) {
                $report['status'] = $data['status'];
                $found = true;
                break;
            }
        }

        if (!$found) {
            sendError("Reporte no encontrado.");
        }

        file_put_contents($reportsFile, json_encode($reports, JSON_PRETTY_PRINT));
        echo json_encode(["success" => true, "id" => $data['id'], "status" => $data['status']]);
        break;

    case 'delete_report':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['id'])) {
            sendError("ID faltante.");
        }

        if ($pdo) {
            try {
                $stmt = $pdo->prepare("DELETE FROM reports WHERE id=?");
                $stmt->execute([$data['id']]);
                echo json_encode(["success" => true, "id" => $data['id']]);
                break;
            } catch (\PDOException $e) {
                error_log("Delete Report SQL error, falling back to JSON: " . $e->getMessage());
            }
        }

        $reports = getReports(null, $reportsFile, $initialReports);
        $newReports = [];
        $found = false;
        foreach ($reports as $report) {
            if ($report['id'] == $data['id']) {
                $found = true;
            } else {
                $newReports[] = $report;
            }
        }

        if (!$found) {
            sendError("Reporte no encontrado.");
        }

        file_put_contents($reportsFile, json_encode($newReports, JSON_PRETTY_PRINT));
        echo json_encode(["success" => true, "id" => $data['id']]);
        break;

    case 'uploads':
        echo json_encode(getUploads($pdo, $uploadsFile, $initialUploads));
        break;

    case 'upload_file':
        if (!isset($_FILES['file'])) {
            sendError("No se recibió ningún archivo.");
        }
        $file = $_FILES['file'];
        $role = isset($_POST['role']) ? $_POST['role'] : 'student';

        if ($file['error'] !== UPLOAD_ERR_OK) {
            sendError("Error al cargar el archivo.");
        }

        $fileName = basename($file['name']);
        $fileName = preg_replace('/[^a-zA-Z0-9_.-]/', '_', $fileName);
        $targetPath = $uploadsDir . '/' . $fileName;

        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            $dateStr = date("d M Y");
            if ($pdo) {
                try {
                    $stmt = $pdo->prepare("INSERT INTO uploads (name, date_str, status, role) VALUES (?, ?, ?, ?)");
                    $stmt->execute([$fileName, $dateStr, 'pending', $role]);
                    echo json_encode([
                        "name" => $fileName,
                        "date" => $dateStr,
                        "status" => "pending",
                        "role" => $role
                    ]);
                    break;
                } catch (\PDOException $e) {
                    error_log("Upload File SQL error, falling back to JSON: " . $e->getMessage());
                }
            }

            $uploads = getUploads(null, $uploadsFile, $initialUploads);
            $newUpload = [
                "name" => $fileName,
                "date" => $dateStr,
                "status" => "pending",
                "role" => $role
            ];
            array_unshift($uploads, $newUpload);
            file_put_contents($uploadsFile, json_encode($uploads, JSON_PRETTY_PRINT));
            echo json_encode($newUpload);
        } else {
            sendError("No se pudo guardar el archivo en el servidor.");
        }
        break;

    case 'update_upload_status':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['name']) || !isset($data['status'])) {
            sendError("Nombre o estado faltantes.");
        }

        if ($pdo) {
            try {
                $stmt = $pdo->prepare("UPDATE uploads SET status=? WHERE name=?");
                $stmt->execute([$data['status'], $data['name']]);
                echo json_encode(["success" => true, "name" => $data['name'], "status" => $data['status']]);
                break;
            } catch (\PDOException $e) {
                error_log("Update Upload Status SQL error, falling back to JSON: " . $e->getMessage());
            }
        }

        $uploads = getUploads(null, $uploadsFile, $initialUploads);
        $found = false;
        foreach ($uploads as &$up) {
            if ($up['name'] === $data['name']) {
                $up['status'] = $data['status'];
                $found = true;
                break;
            }
        }
        if (!$found) {
            sendError("Archivo no encontrado.");
        }
        file_put_contents($uploadsFile, json_encode($uploads, JSON_PRETTY_PRINT));
        echo json_encode(["success" => true, "name" => $data['name'], "status" => $data['status']]);
        break;

    case 'delete_upload':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['name'])) {
            sendError("Nombre faltante.");
        }

        if ($pdo) {
            try {
                $stmt = $pdo->prepare("DELETE FROM uploads WHERE name=?");
                $stmt->execute([$data['name']]);
                echo json_encode(["success" => true, "name" => $data['name']]);
                break;
            } catch (\PDOException $e) {
                error_log("Delete Upload SQL error, falling back to JSON: " . $e->getMessage());
            }
        }

        $uploads = getUploads(null, $uploadsFile, $initialUploads);
        $newUploads = [];
        $found = false;
        foreach ($uploads as $up) {
            if ($up['name'] === $data['name']) {
                $found = true;
                $physicalPath = $uploadsDir . '/' . $up['name'];
                if (file_exists($physicalPath)) {
                    unlink($physicalPath);
                }
            } else {
                $newUploads[] = $up;
            }
        }
        if (!$found) {
            sendError("Archivo no encontrado.");
        }
        file_put_contents($uploadsFile, json_encode($newUploads, JSON_PRETTY_PRINT));
        echo json_encode(["success" => true, "name" => $data['name']]);
        break;

    case 'teachers':
        echo json_encode(getTeachers($pdo, $teachersFile, $initialTeachers));
        break;

    case 'create_teacher':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['name']) || !isset($data['title']) || !isset($data['email'])) {
            sendError("Datos incompletos.");
        }

        $newId = round(microtime(true) * 1000);
        $name = $data['name'];
        $title = $data['title'];
        $department = isset($data['department']) ? $data['department'] : 'telecom';
        $email = $data['email'];
        $avatar = isset($data['avatar']) ? $data['avatar'] : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
        $scholar = isset($data['scholar']) ? $data['scholar'] : 'https://scholar.google.com/';
        $orcid = isset($data['orcid']) ? $data['orcid'] : 'https://orcid.org/';
        $scopus = isset($data['scopus']) ? $data['scopus'] : 'https://www.scopus.com/';
        $bio = isset($data['bio']) ? $data['bio'] : '';

        if ($pdo) {
            try {
                $stmt = $pdo->prepare("INSERT INTO teachers (id, name, title, department, email, avatar, scholar, orcid, scopus, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([$newId, $name, $title, $department, $email, $avatar, $scholar, $orcid, $scopus, $bio]);
                echo json_encode([
                    "id" => $newId,
                    "name" => $name,
                    "title" => $title,
                    "department" => $department,
                    "email" => $email,
                    "avatar" => $avatar,
                    "scholar" => $scholar,
                    "orcid" => $orcid,
                    "scopus" => $scopus,
                    "bio" => $bio
                ]);
                break;
            } catch (\PDOException $e) {
                error_log("Create Teacher SQL error, falling back to JSON: " . $e->getMessage());
            }
        }

        $teachers = getTeachers(null, $teachersFile, $initialTeachers);
        $newTeacher = [
            "id" => $newId,
            "name" => $name,
            "title" => $title,
            "department" => $department,
            "email" => $email,
            "avatar" => $avatar,
            "scholar" => $scholar,
            "orcid" => $orcid,
            "scopus" => $scopus,
            "bio" => $bio
        ];
        $teachers[] = $newTeacher;
        file_put_contents($teachersFile, json_encode($teachers, JSON_PRETTY_PRINT));
        echo json_encode($newTeacher);
        break;

    case 'delete_teacher':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['id'])) {
            sendError("ID faltante.");
        }

        if ($pdo) {
            try {
                $stmt = $pdo->prepare("DELETE FROM teachers WHERE id=?");
                $stmt->execute([$data['id']]);
                echo json_encode(["success" => true, "id" => $data['id']]);
                break;
            } catch (\PDOException $e) {
                error_log("Delete Teacher SQL error, falling back to JSON: " . $e->getMessage());
            }
        }

        $teachers = getTeachers(null, $teachersFile, $initialTeachers);
        $newTeachers = [];
        $found = false;
        foreach ($teachers as $t) {
            if ($t['id'] == $data['id']) {
                $found = true;
            } else {
                $newTeachers[] = $t;
            }
        }
        if (!$found) {
            sendError("Docente no encontrado.");
        }
        file_put_contents($teachersFile, json_encode($newTeachers, JSON_PRETTY_PRINT));
        echo json_encode(["success" => true, "id" => $data['id']]);
        break;

    default:
        sendError("Acción no válida.", 404);
        break;
}
}
