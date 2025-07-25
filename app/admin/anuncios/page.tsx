'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from "@/components/dashboardPrincipal/layout";

interface Announcement {
  id: number;
  title: string;
  url: string;
}

interface UserData {
  rol: string;
}

export default function AnnouncementsPage() {
  const [images, setImages] = useState<Announcement[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    file: null as File | null,
    preview: '',
  });

  const [isLoading, setIsLoading] = useState({
    fetch: false,
    submit: false,
    delete: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
    setUserData({ rol: 'admin' }); // Simulación de usuario admin
  }, []);

  useEffect(() => {
    const fetchAnuncios = async () => {
      setIsLoading(prev => ({ ...prev, fetch: true }));

      try {
        if (!token) {
          setError('Token no encontrado');
          return;
        }

        const res = await fetch('https://projectdesarrollo.onrender.com/administrador/traer_anuncios', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Error al obtener los anuncios');
        }

        const anuncios: Announcement[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          url: item.url,
        }));

        setImages(anuncios);
      } catch (err: any) {
        setError(err.message || 'Ocurrió un error al cargar los anuncios');
      } finally {
        setIsLoading(prev => ({ ...prev, fetch: false }));
      }
    };

    if (token) fetchAnuncios();
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const extension = file.name.split('.').pop()?.toLowerCase();
    const mimeValid = allowedMimeTypes.includes(file.type);
    const extValid = extension && allowedExtensions.includes(extension);

    if (!mimeValid || !extValid) {
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

    if (!token) {
      setError('Token no encontrado');
      setIsLoading(prev => ({ ...prev, submit: false }));
      return;
    }

    try {
      const imageForm = new FormData();
      imageForm.append('image', formData.file);

      const uploadRes = await fetch('https://api.imgbb.com/1/upload?key=857ec7f15f183d816cb1aa3e258115d3', {
        method: 'POST',
        body: imageForm,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        throw new Error('Error al subir la imagen a ImgBB');
      }

      const imageUrl = uploadData.data.url;

      const res = await fetch('https://projectdesarrollo.onrender.com/administrador/subir_anuncio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          url: imageUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al subir el anuncio');

      const newAnnouncement: Announcement = {
        id: Math.max(0, ...images.map(i => i.id)) + 1, // Solo local
        title: formData.title,
        url: imageUrl,
      };

      setImages(prev => [newAnnouncement, ...prev]);
      setSuccess('Anuncio subido exitosamente');
      setTimeout(() => setSuccess(null), 5000);

      setFormData({
        title: '',
        file: null,
        preview: '',
      });

    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al subir el anuncio');
    } finally {
      setIsLoading(prev => ({ ...prev, submit: false }));
    }
  };

  // ✅ CORREGIDO: id por query param
  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este anuncio?')) return;

    if (!token) {
      setError('Token no encontrado');
      return;
    }

    setIsLoading(prev => ({ ...prev, delete: true }));
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`https://projectdesarrollo.onrender.com/administrador/borrar_anuncio?id=${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al eliminar el anuncio');
      }

      setImages(prev => prev.filter(img => img.id !== id));
      setSuccess('Anuncio eliminado exitosamente');
      setTimeout(() => setSuccess(null), 5000);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al eliminar el anuncio');
    } finally {
      setIsLoading(prev => ({ ...prev, delete: false }));
    }
  };

  if (!userData) return null;

  return (
    <AdminLayout activeLink="/admin/anuncios" title="Gestión de Anuncios" pageTitle="Panel de Anuncios">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 mb-4">{success}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Subir nuevo anuncio</h2>

            <label className="block mb-2 text-sm">Título *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <label className="block mb-2 text-sm">Anuncio *</label>
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

          <div className="bg-white p-6 rounded shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Anuncios subidos</h2>
            {isLoading.fetch ? (
              <p>Cargando anuncios...</p>
            ) : images.length === 0 ? (
              <p className="text-center text-gray-500">No hay anuncios subidos</p>
            ) : (
              <div className="space-y-4">
                {images.map(img => (
                  <div key={`${img.id}-${img.url}`} className="border p-4 rounded flex items-center gap-4">
                    <img src={img.url} alt={img.title} className="w-52 h-36 object-cover rounded border" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{img.title}</h3>
                    </div>
                    <button
                      onClick={() => handleDelete(img.id)}
                      disabled={isLoading.delete}
                      className="text-red-600 hover:text-red-800"
                    >
                      {isLoading.delete ? '' : '🗑'}
                    </button>
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
