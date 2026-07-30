import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

export default function EstudiantePanel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const fetchUploads = async () => {
    const data = await api.getUploads();
    setUploadedFiles(data.filter(u => u.role === 'student' || !u.role));
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    setProgress(30);

    // Direct API Upload
    const result = await api.uploadFile(selectedFile, 'student');
    setProgress(100);

    setTimeout(() => {
      if (result) {
        setUploadedFiles(prev => [result, ...prev]);
        setSelectedFile(null);
      }
      setUploading(false);
      setProgress(0);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="text-left">
        <h2 className="text-xl font-bold text-slate-900 font-display">Portal del Estudiante</h2>
        <p className="text-xs text-slate-650">Carga evidencias de vinculación comunitaria y consulta el estado de tus informes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left">
        {/* Upload Form */}
        <div className="glass p-6 rounded-xl space-y-4 bg-white/60 border border-slate-250 shadow-sm">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Cargar Nueva Evidencia / Informe</h3>
          
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div className="border-2 border-dashed border-slate-300 hover:border-slate-400 bg-slate-50/50 rounded-xl p-6 text-center cursor-pointer transition-colors relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploading}
              />
              <Upload className="h-8 w-8 text-teal-600 mx-auto mb-2" />
              <p className="text-xs text-slate-700 font-semibold">
                {selectedFile ? `Archivo: ${selectedFile.name}` : 'Haz clic o arrastra tu archivo PDF/ZIP'}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Máx. 10 MB (Formatos admitidos: PDF, ZIP, DOCX)</p>
            </div>

            {selectedFile && !uploading && (
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-teal-600 text-white font-bold text-xs uppercase hover:bg-teal-700 transition-all shadow-sm"
              >
                Subir Informe
              </button>
            )}

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-600 font-bold">
                  <span>Subiendo archivo...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 border border-slate-200">
                  <div className="bg-teal-600 h-1.5 rounded-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Uploaded History */}
        <div className="glass p-6 rounded-xl space-y-4 bg-white/60 border border-slate-250 shadow-sm">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Historial de Entregas</h3>
          
          <div className="space-y-3">
            {uploadedFiles.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-slate-400 shrink-0" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-slate-800 truncate max-w-[160px] sm:max-w-xs">{file.name}</p>
                    <p className="text-[10px] text-slate-450 font-mono font-bold">{file.date}</p>
                  </div>
                </div>
                {file.status === 'approved' ? (
                  <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-150">
                    <CheckCircle2 className="h-3 w-3" /> Aprobado
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-[9px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-150 animate-pulse">
                    <AlertCircle className="h-3 w-3" /> Revisión
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
