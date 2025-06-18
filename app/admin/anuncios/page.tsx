'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from "@/components/dashboardPrincipal/layout";

interface AnnouncementFromBackend {
  id: number;
  title: string;
  url: string;
  created_at: string;
}

interface UserData {
  rol: string;
}

export default function AnnouncementsPage() {
  const [images, setImages] = useState<AnnouncementFromBackend[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    file: null as File | null,
    preview: '',
    created_at: new Date().toISOString(),
  });

  const [isLoading, setIsLoading] = useState({
    fetch: false,
    submit: false,
    delete: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    setUserData({ rol: 'admin' });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Solo se permiten archivos JPG o PNG');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('El archivo no debe exceder los 5MB');
      return;
    }

    setError(null);
    setFormData(prev => ({
      ...prev,
      file,
      preview: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(prev => ({ ...prev, submit: true }));

    if (!formData.title.trim()) {
      setError('El título no puede estar vacío');
      setIsLoading(prev => ({ ...prev, submit: false }));
      return;
    }

    if (!formData.file) {
      setError('Debes seleccionar un archivo');
      setIsLoading(prev => ({ ...prev, submit: false }));
      return;
    }

    setTimeout(() => {
      const newImage: AnnouncementFromBackend = {
        id: Math.max(0, ...images.map(i => i.id)) + 1,
        title: formData.title,
        url: formData.preview,
        created_at: formData.created_at,
      };

      setImages(prev => [newImage, ...prev]);
      setSuccess('Imagen subida exitosamente');
      setTimeout(() => setSuccess(null), 5000);
      setFormData({
        title: '',
        file: null,
        preview: '',
        created_at: new Date().toISOString(),
      });
      setIsLoading(prev => ({ ...prev, submit: false }));
    }, 1000);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta anuncio?')) return;

    setIsLoading(prev => ({ ...prev, delete: true }));
    setTimeout(() => {
      const imgToDelete = images.find(img => img.id === id);
      if (imgToDelete) URL.revokeObjectURL(imgToDelete.url);
      setImages(prev => prev.filter(img => img.id !== id));
      setSuccess('Anuncio eliminado exitosamente');

      setTimeout(() => setSuccess(null), 5000);

      setIsLoading(prev => ({ ...prev, delete: false }));
    }, 800);
  };

  useEffect(() => {
    setIsLoading(prev => ({ ...prev, fetch: true }));
    setTimeout(() => {
      setImages([]);
      setIsLoading(prev => ({ ...prev, fetch: false }));
    }, 1000);

    return () => {
      images.forEach(image => URL.revokeObjectURL(image.url));
    };
  }, []);

  if (!userData) return null;

  if (!userData || userData.rol !== 'admin') {
    return (
      <div className="p-4 text-red-600">⚠️ No tienes permisos para acceder a esta sección</div>
    );
  }

  return (
    <AdminLayout
      activeLink="/admin/anuncios"
      title="Gestión de Anuncios"
      pageTitle="Panel de Anuncios"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 mb-4">{success}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Subir nueva anuncio</h2>

            <label className="block mb-2 text-sm">Título *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <label className="block mb-2 text-sm">Archivo *</label>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="w-full mb-4"
              required
            />

            {formData.preview && (
              <div className="mb-4">
                <label className="block text-sm mb-1">Vista previa</label>
                <img src={formData.preview} alt="preview" className="max-h-60 rounded border" />
              </div>
            )}

            <label className="block mb-2 text-sm">Fecha *</label>
            <input
              type="date"
              name="created_at"
              value={formData.created_at.split('T')[0]}
              onChange={e => setFormData(prev => ({
                ...prev,
                created_at: new Date(e.target.value).toISOString()
              }))}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <button
              type="submit"
              disabled={isLoading.submit}
              className={`px-4 py-2 text-white rounded ${
                isLoading.submit ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading.submit ? 'Subiendo...' : 'Subir Anuncio'}
            </button>
          </form>

          {/* Lista de imágenes */}
          <div className="bg-white p-6 rounded shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Anuncios subidos</h2>
            {isLoading.fetch ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="animate-pulse flex items-center gap-4 border p-4 rounded">
                    <div className="bg-gray-300 w-40 h-28 rounded" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-1/2" />
                      <div className="h-3 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : images.length === 0 ? (
              <p className="text-center text-gray-500">No hay anuncios subidos</p>
            ) : (
              <div className="space-y-4">
                {images.map(img => (
                  <div key={img.id} className="border p-4 rounded">
                    <div className="flex items-center gap-4">
                      <img src={img.url} alt={img.title} className="w-52 h-36 object-cover rounded border" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{img.title}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(img.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(img.id)}
                        disabled={isLoading.delete}
                        className="text-red-600 hover:text-red-800"
                      >
                        {isLoading.delete ? '' : '🗑️'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
