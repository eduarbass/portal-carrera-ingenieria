// API client helper that coordinates with the cPanel PHP backend, with graceful fallback to localStorage / local simulation
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'https://carrera.mawil.us/api.php'
  : '/api.php';

// Safe wrapper for fetch that catches errors and resolves them, returning null or error detail
async function safeFetch(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.warn(`HTTP error! status: ${response.status}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.warn("API request failed, falling back to local simulation:", error);
    return null;
  }
}

// Simulated Telemetry (Fallback)
const defaultTelemetry = {
  temp: 24.2,
  humidity: 62.4,
  reservoir: 78.5,
  solarVoltage: 18.4,
  solarCurrent: 3.2,
  power: 58.8,
  co2: 412,
  anomalyMode: false
};

const defaultHistory = [
  { time: '10:00', water: 72, solar: 45, temp: 22 },
  { time: '10:05', water: 73, solar: 48, temp: 22.5 },
  { time: '10:10', water: 74, solar: 50, temp: 23 },
  { time: '10:15', water: 75, solar: 52, temp: 23.4 },
  { time: '10:20', water: 77, solar: 55, temp: 23.8 },
  { time: '10:25', water: 78, solar: 58.8, temp: 24.2 }
];

const INITIAL_REPORTS = [
  {
    id: 101,
    category: 'water',
    description: 'Baja presión detectada en la acometida norte de la escuela de Los Vergeles.',
    location: 'Sector Escuela Comunitaria',
    reporter: 'Sr. Manuel Guamán (Líder Vecinal)',
    status: 'progress',
    date: 'Julio 27, 2026',
  },
  {
    id: 102,
    category: 'energy',
    description: 'Fluctuaciones de voltaje intermitentes en el banco de inversores solares secundarios.',
    location: 'Estación de Baterías Norte',
    reporter: 'Ing. Alejandro Rivas',
    status: 'pending',
    date: 'Julio 28, 2026',
  },
  {
    id: 103,
    category: 'telecom',
    description: 'Reemplazo y calibración del nodo gateway LoRaWAN principal finalizado con éxito.',
    location: 'Torre de Transmisión del Aula Tecnológica',
    reporter: 'M.Sc. Diana Paredes',
    status: 'resolved',
    date: 'Julio 24, 2026',
  },
];

const INITIAL_UPLOADS = [
  { name: 'Informe_Final_Practicas_Vergeles_Velasco.pdf', date: 'Julio 10, 2026', status: 'approved', role: 'student' },
  { name: 'Firma_Asistencia_Tutor_Alejandro.pdf', date: 'Julio 12, 2026', status: 'approved', role: 'student' },
];

export const api = {
  // Telemetry Services
  async getTelemetry() {
    const res = await safeFetch(`${API_BASE}?action=telemetry`);
    if (res && res.telemetry) {
      return res;
    }
    // Fallback: Generate local simulation values
    const rand = Math.random();
    const prevMode = JSON.parse(localStorage.getItem(' Vergeles_anomalyMode')) || false;
    let temp = 24.2 + (rand - 0.5) * 0.4;
    let reservoir = 78.5 + (rand - 0.5) * 0.3;
    if (prevMode) {
      temp = 35.4;
      reservoir = 15.2;
    }
    const simulatedTelemetry = {
      ...defaultTelemetry,
      temp: parseFloat(temp.toFixed(1)),
      reservoir: parseFloat(reservoir.toFixed(1)),
      anomalyMode: prevMode
    };
    return { telemetry: simulatedTelemetry, history: defaultHistory };
  },

  async setAnomaly(anomalyMode) {
    localStorage.setItem(' Vergeles_anomalyMode', JSON.stringify(anomalyMode));
    const res = await safeFetch(`${API_BASE}?action=set_anomaly`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ anomalyMode })
    });
    return res !== null;
  },

  // Community Reports Services
  async getReports() {
    const res = await safeFetch(`${API_BASE}?action=reports`);
    if (res && Array.isArray(res)) {
      return res;
    }
    // Fallback: Use LocalStorage
    const saved = localStorage.getItem('vergeles_reports');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('vergeles_reports', JSON.stringify(INITIAL_REPORTS));
    return INITIAL_REPORTS;
  },

  async createReport(reportData) {
    const res = await safeFetch(`${API_BASE}?action=create_report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData)
    });
    if (res && res.id) {
      return res;
    }
    // Fallback: LocalStorage append
    const saved = await this.getReports();
    const newReport = {
      id: Date.now(),
      ...reportData,
      status: 'pending',
      date: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    const updated = [newReport, ...saved];
    localStorage.setItem('vergeles_reports', JSON.stringify(updated));
    return newReport;
  },

  async updateReportStatus(id, status) {
    const res = await safeFetch(`${API_BASE}?action=update_report_status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    if (res && res.success) {
      return true;
    }
    // Fallback: LocalStorage update
    const saved = await this.getReports();
    const updated = saved.map(r => r.id === id ? { ...r, status } : r);
    localStorage.setItem('vergeles_reports', JSON.stringify(updated));
    return true;
  },

  async deleteReport(id) {
    const res = await safeFetch(`${API_BASE}?action=delete_report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res && res.success) {
      return true;
    }
    // Fallback: LocalStorage delete
    const saved = await this.getReports();
    const updated = saved.filter(r => r.id !== id);
    localStorage.setItem('vergeles_reports', JSON.stringify(updated));
    return true;
  },

  // Student / Teacher Uploads Services
  async getUploads() {
    const res = await safeFetch(`${API_BASE}?action=uploads`);
    if (res && Array.isArray(res)) {
      return res;
    }
    // Fallback: Use LocalStorage
    const saved = localStorage.getItem('vergeles_uploads');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('vergeles_uploads', JSON.stringify(INITIAL_UPLOADS));
    return INITIAL_UPLOADS;
  },

  async uploadFile(file, role = 'student') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('role', role);

    const res = await safeFetch(`${API_BASE}?action=upload_file`, {
      method: 'POST',
      body: formData
    });

    if (res && res.name) {
      return res;
    }

    // Fallback: LocalStorage mock
    const saved = await this.getUploads();
    const newUpload = {
      name: file.name,
      date: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: 'pending',
      role: role
    };
    const updated = [newUpload, ...saved];
    localStorage.setItem('vergeles_uploads', JSON.stringify(updated));
    return newUpload;
  }
};
