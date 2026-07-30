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

$telemetryFile = $dataDir . '/telemetry.json';
$reportsFile = $dataDir . '/reports.json';
$uploadsFile = $dataDir . '/uploads.json';

// Helper function to send JSON error
function sendError($message, $code = 400) {
    http_response_code($code);
    echo json_encode(["error" => $message]);
    exit;
}

// 1. Manage Telemetry
function getTelemetry($telemetryFile) {
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

    // Simulate fluctuation if more than 3 seconds have passed
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

        // Add to history
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

// 2. Manage Reports
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

function getReports($reportsFile, $initialReports) {
    if (!file_exists($reportsFile)) {
        file_put_contents($reportsFile, json_encode($initialReports, JSON_PRETTY_PRINT));
        return $initialReports;
    }
    $reports = json_decode(file_get_contents($reportsFile), true);
    return is_array($reports) ? $reports : $initialReports;
}

// 3. Manage Student / Teacher Uploaded Files
$initialUploads = [
    ["name" => "Informe_Final_Practicas_Vergeles_Velasco.pdf", "date" => "Julio 10, 2026", "status" => "approved", "role" => "student"],
    ["name" => "Firma_Asistencia_Tutor_Alejandro.pdf", "date" => "Julio 12, 2026", "status" => "approved", "role" => "student"]
];

function getUploads($uploadsFile, $initialUploads) {
    if (!file_exists($uploadsFile)) {
        file_put_contents($uploadsFile, json_encode($initialUploads, JSON_PRETTY_PRINT));
        return $initialUploads;
    }
    $uploads = json_decode(file_get_contents($uploadsFile), true);
    return is_array($uploads) ? $uploads : $initialUploads;
}

// ROUTING
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'telemetry':
        echo json_encode(getTelemetry($telemetryFile));
        break;

    case 'set_anomaly':
        $data = json_decode(file_get_contents('php://input'), true);
        $anomalyMode = isset($data['anomalyMode']) ? (bool)$data['anomalyMode'] : false;
        
        $state = getTelemetry($telemetryFile);
        $state['telemetry']['anomalyMode'] = $anomalyMode;
        $state['telemetry']['last_updated'] = time(); // force update
        
        file_put_contents($telemetryFile, json_encode($state, JSON_PRETTY_PRINT));
        echo json_encode($state);
        break;

    case 'reports':
        echo json_encode(getReports($reportsFile, $initialReports));
        break;

    case 'create_report':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['description']) || !isset($data['reporter']) || !isset($data['location'])) {
            sendError("Datos incompletos.");
        }

        $reports = getReports($reportsFile, $initialReports);
        $newReport = [
            "id" => round(microtime(true) * 1000),
            "category" => isset($data['category']) ? $data['category'] : 'water',
            "description" => $data['description'],
            "location" => $data['location'],
            "reporter" => $data['reporter'],
            "status" => "pending",
            "date" => date("d M Y")
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

        $reports = getReports($reportsFile, $initialReports);
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

        $reports = getReports($reportsFile, $initialReports);
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
        echo json_encode(getUploads($uploadsFile, $initialUploads));
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
        // Clean filename a bit
        $fileName = preg_replace('/[^a-zA-Z0-9_.-]/', '_', $fileName);
        $targetPath = $uploadsDir . '/' . $fileName;

        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            $uploads = getUploads($uploadsFile, $initialUploads);
            $newUpload = [
                "name" => $fileName,
                "date" => date("d M Y"),
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

    default:
        sendError("Acción no válida.", 404);
        break;
}
