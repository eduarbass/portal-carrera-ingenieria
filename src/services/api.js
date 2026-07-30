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
  },

  async updateUploadStatus(name, status) {
    const res = await safeFetch(`${API_BASE}?action=update_upload_status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, status })
    });
    if (res && res.success) {
      return true;
    }
    // Fallback
    const saved = await this.getUploads();
    const updated = saved.map(u => u.name === name ? { ...u, status } : u);
    localStorage.setItem('vergeles_uploads', JSON.stringify(updated));
    return true;
  },

  async deleteUpload(name) {
    const res = await safeFetch(`${API_BASE}?action=delete_upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (res && res.success) {
      return true;
    }
    // Fallback
    const saved = await this.getUploads();
    const updated = saved.filter(u => u.name !== name);
    localStorage.setItem('vergeles_uploads', JSON.stringify(updated));
    return true;
  },

  // Docentes Services
  async getTeachers() {
    const res = await safeFetch(`${API_BASE}?action=teachers`);
    if (res && Array.isArray(res)) {
      return res;
    }
    // Fallback
    const saved = localStorage.getItem('vergeles_teachers');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('vergeles_teachers', JSON.stringify(INITIAL_TEACHERS));
    return INITIAL_TEACHERS;
  },

  async createTeacher(teacherData) {
    const res = await safeFetch(`${API_BASE}?action=create_teacher`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacherData)
    });
    if (res && res.id) {
      return res;
    }
    // Fallback
    const saved = await this.getTeachers();
    const newTeacher = {
      id: Date.now(),
      ...teacherData,
      avatar: teacherData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    };
    const updated = [...saved, newTeacher];
    localStorage.setItem('vergeles_teachers', JSON.stringify(updated));
    return newTeacher;
  },

  async deleteTeacher(id) {
    const res = await safeFetch(`${API_BASE}?action=delete_teacher`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res && res.success) {
      return true;
    }
    // Fallback
    const saved = await this.getTeachers();
    const updated = saved.filter(t => t.id !== id);
    localStorage.setItem('vergeles_teachers', JSON.stringify(updated));
    return true;
  }
};

const INITIAL_TEACHERS = [
  {
    id: 1,
    name: 'Dr. Alejandro Rivas',
    title: 'Ph.D. en Telecomunicaciones',
    department: 'telecom',
    email: 'arivas@universidad.edu.ec',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    scholar: 'https://scholar.google.com/',
    orcid: 'https://orcid.org/',
    scopus: 'https://www.scopus.com/',
    bio: 'Especialista en redes inalámbricas de baja potencia (LPWAN) y modelamiento de canales de propagación para entornos rurales.',
  },
  {
    id: 2,
    name: 'M.Sc. Beatriz Castro',
    title: 'Máster en Sistemas Embebidos',
    department: 'hardware',
    email: 'bcastro@universidad.edu.ec',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    scholar: 'https://scholar.google.com/',
    orcid: 'https://orcid.org/',
    scopus: 'https://www.scopus.com/',
    bio: 'Investigadora en diseño de hardware de bajo consumo y optimización de firmware para sensores agrícolas autónomos.',
  },
  {
    id: 3,
    name: 'Dr. Carlos Mendoza',
    title: 'Ph.D. en Ciencias de la Computación',
    department: 'software',
    email: 'cmendoza@universidad.edu.ec',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    scholar: 'https://scholar.google.com/',
    orcid: 'https://orcid.org/',
    scopus: 'https://www.scopus.com/',
    bio: 'Líder del grupo de computación en la nube e inteligencia artificial para la predicción de fluctuaciones en recursos hídricos.',
  },
  {
    id: 4,
    name: 'M.Sc. Diana Paredes',
    title: 'Máster en IoT e Industria 4.0',
    department: 'telecom',
    email: 'dparedes@universidad.edu.ec',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    scholar: 'https://scholar.google.com/',
    orcid: 'https://orcid.org/',
    scopus: 'https://www.scopus.com/',
    bio: 'Consultora en automatización de fábricas, integración de protocolos Modbus/MQTT y robótica colaborativa.',
  }
];
