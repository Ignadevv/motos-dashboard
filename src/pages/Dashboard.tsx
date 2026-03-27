import React, { useState, useEffect, useRef } from 'react';
import { getMotos, addMoto, deleteMoto, Moto, getUserRole } from '../utils/storage';
import { auth, db } from '../utils/firebase';
import { signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Trash2, Plus, ArrowLeft, Upload, Bike, LogOut, Users, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [motosLoading, setMotosLoading] = useState(true);
  const [savingMoto, setSavingMoto] = useState(false);
  
  const [name, setName] = useState('');
  const [cilindrada, setCilindrada] = useState('');
  const [peso, setPeso] = useState('');
  const [caracteristicas, setCaracteristicas] = useState<{name: string, value: string}[]>([]);
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'motos' | 'users'>('motos');
  const [role, setRole] = useState<string>('empleado');
  const [adminLoading, setAdminLoading] = useState(true);
  
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('empleado');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    loadMotos();
    checkRole();
  }, []);

  const checkRole = async () => {
    if (auth.currentUser) {
      const userRole = await getUserRole(auth.currentUser.uid);
      setRole(userRole);
    }
    setAdminLoading(false);
  };

  const loadMotos = async () => {
    setMotosLoading(true);
    const data = await getMotos();
    setMotos(data);
    setMotosLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Dimensiones máximas de 800px para que pese muy poco y quepa en Firestore Text limits (1MB)
          const MAX_DIMENSION = 800;
          if (width > height && width > MAX_DIMENSION) {
            height *= MAX_DIMENSION / width;
            width = MAX_DIMENSION;
          } else if (height > MAX_DIMENSION) {
            width *= MAX_DIMENSION / height;
            height = MAX_DIMENSION;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) ctx.drawImage(img, 0, 0, width, height);
          
          // Comprimir a un formato JPEG ligero (calidad 60%)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
          setImage(compressedBase64);
          setPreview(compressedBase64);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !cilindrada || !peso || !image) {
      alert("Por favor completa todos los campos y sube una imagen.");
      return;
    }

    setSavingMoto(true);
    try {
      const validCaracteristicas = caracteristicas.filter(c => c.name.trim() !== '' && c.value.trim() !== '');
      await addMoto({ name, cilindrada, peso, image, caracteristicas: validCaracteristicas });
      await loadMotos();
      
      setName('');
      setCilindrada('');
      setPeso('');
      setCaracteristicas([]);
      setImage('');
      setPreview('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
       alert("Error al guardar la moto. Asegúrate de iniciar la DB en modo prueba.");
    } finally {
      setSavingMoto(false);
    }
  };

  const handleDeleteMoto = async (moto: Moto) => {
    if (window.confirm(`¿Seguro que deseas eliminar el modelo ${moto.name}?`)) {
      try {
        await deleteMoto(moto);
        await loadMotos();
      } catch (err) {
        alert("Error al eliminar el modelo.");
      }
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role !== 'admin') return;
    
    setCreatingUser(true);
    setUserMsg('');
    try {
      if (window.confirm("Aviso Firebase: Al registrar al empleado se cerrará temporalmente tu sesión de Admin y tendrás que volver a iniciarla. ¿Proceder?")) {
          const userCredential = await createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword);
          const newUid = userCredential.user.uid;
          
          await setDoc(doc(db, 'users', newUid), {
              role: newUserRole,
              email: newUserEmail,
              createdAt: Date.now()
          });
          
          setUserMsg('Usuario creado con éxito. Redirigiendo al login...');
          setTimeout(() => {
              navigate('/login');
          }, 3000);
      }
    } catch (err: any) {
        console.error(err);
        setUserMsg('Error: ' + err.message);
    } finally {
        setCreatingUser(false);
    }
  };

  if (adminLoading) return <div className="min-h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a5f]"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Bike className="w-8 h-8 text-[#1e3a5f]" />
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">PANEL ADMIN — GDN Motors</h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
              Rol: {role}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Ver sitio
            </Link>
            <button 
              onClick={handleLogout}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Salir
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {role === 'admin' && (
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab('motos')}
              className={`py-3 px-6 font-bold text-sm transition-colors border-b-2 ${activeTab === 'motos' ? 'border-[#1e3a5f] text-[#1e3a5f]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
            >
              <span className="flex items-center gap-2"><Bike className="w-4 h-4"/> Gestión de Motos</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-3 px-6 font-bold text-sm transition-colors border-b-2 ${activeTab === 'users' ? 'border-[#1e3a5f] text-[#1e3a5f]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
            >
               <span className="flex items-center gap-2"><Users className="w-4 h-4"/> Personal y Accesos</span>
            </button>
          </div>
        )}

        {/* Motos Tab Content */}
        {activeTab === 'motos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 lg:col-span-1 h-fit">
              <h2 className="text-xl font-extrabold mb-6 flex items-center gap-2 text-gray-800 border-b pb-4">
                <Plus className="w-6 h-6 text-[#1e3a5f]" />
                Agregar Nuevo Modelo
              </h2>
              
              <form onSubmit={handleAddMoto} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-700">Nombre del Modelo</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 border-transparent focus:ring-orange-500 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-700">Cilindrada</label>
                  <input 
                    type="text" 
                    value={cilindrada}
                    onChange={(e) => setCilindrada(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 border-transparent focus:ring-orange-500 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-700">Peso</label>
                  <input 
                    type="text" 
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 border-transparent focus:ring-orange-500 focus:bg-white transition-colors"
                  />
                </div>

                <div className="border border-gray-200 p-4 rounded bg-gray-50">
                   <div className="flex justify-between items-center mb-3">
                     <label className="text-sm font-bold text-gray-700">Características Adicionales (Opc.')</label>
                     <button type="button" onClick={() => setCaracteristicas([...caracteristicas, {name: '', value: ''}])} className="text-xs font-bold text-orange-600 bg-orange-100 hover:bg-orange-200 px-2 py-1 rounded transition-colors">+ Añadir Dato</button>
                   </div>
                   {caracteristicas.length === 0 && <p className="text-xs text-gray-500">Ej: Color, Frenos, Transmisión...</p>}
                   <div className="space-y-2">
                     {caracteristicas.map((carac, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input type="text" placeholder="Ej: Color" value={carac.name} onChange={e => {
                            const newCarac = [...caracteristicas];
                            newCarac[index].name = e.target.value;
                            setCaracteristicas(newCarac);
                          }} className="w-1/3 px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-orange-500"/>
                          <input type="text" placeholder="Ej: Rojo perlado" value={carac.value} onChange={e => {
                            const newCarac = [...caracteristicas];
                            newCarac[index].value = e.target.value;
                            setCaracteristicas(newCarac);
                          }} className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-orange-500"/>
                          <button type="button" onClick={() => {
                            setCaracteristicas(caracteristicas.filter((_, i) => i !== index));
                          }} className="text-red-500 hover:text-red-700 p-2 font-black font-sans flex-shrink-0 text-xl leading-none">×</button>
                        </div>
                     ))}
                   </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Imagen de la moto</label>
                  <div 
                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors relative cursor-pointer" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="space-y-2 text-center">
                      {preview ? (
                        <div className="relative">
                          <img src={preview} alt="Preview" className="mx-auto h-32 object-cover rounded shadow-sm" />
                        </div>
                      ) : (
                        <Upload className="mx-auto h-10 w-10 text-gray-400" />
                      )}
                      <div className="flex text-sm text-gray-600 justify-center">
                        <span className="relative cursor-pointer bg-transparent rounded-md font-bold text-orange-600 hover:text-orange-500 focus-within:outline-none">
                          <span>{preview ? 'Cambiar imagen' : 'Seleccionar desde tu equipo'}</span>
                          <input 
                            ref={fileInputRef}
                            id="file-upload" 
                            type="file" 
                            accept="image/*"
                            className="sr-only" 
                            onChange={handleImageUpload}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={savingMoto}
                  className="w-full bg-[#1e3a5f] hover:bg-[#162d4a] text-white font-black py-4 px-4 rounded transition-colors mt-8 shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {savingMoto ? 'Subiendo a la nube...' : <><Plus className="w-5 h-5"/> PUBLICAR MODELO</>}
                </button>
              </form>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
              <h2 className="text-xl font-extrabold mb-6 flex items-center justify-between text-gray-800 border-b pb-4">
                <span className="flex items-center gap-2">
                  <Bike className="w-6 h-6 text-gray-500" />
                  Base de Datos Activa
                </span>
                <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm">
                  Total Registros
                </span>
              </h2>

              {motosLoading ? (
                 <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e3a5f]"></div></div>
              ) : motos.length === 0 ? (
                <div className="text-center py-16 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                  <p className="font-bold text-lg text-gray-600">No hay modelos registrados aún.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {motos.map((moto) => (
                    <div key={moto.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-xl shadow-sm hover:border-orange-400 hover:shadow-md transition-all group bg-white relative items-center">
                      <div className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                        <img src={moto.image} alt={moto.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h3 className="font-black text-gray-900 text-lg mb-1 truncate w-full" title={moto.name}>{moto.name}</h3>
                        <p className="text-sm text-gray-600 font-medium">Cil: {moto.cilindrada} • Peso: {moto.peso}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteMoto(moto)}
                        className="absolute sm:relative top-2 right-2 sm:top-0 sm:right-0 text-red-400 hover:text-red-600 bg-white sm:bg-red-50 sm:hover:bg-red-100 p-2 sm:p-3 shadow-md sm:shadow-none rounded-full transition-colors"
                        title="Eliminar modelo"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users Tab Content (Admin Only) */}
        {activeTab === 'users' && role === 'admin' && (
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 max-w-2xl">
              <h2 className="text-xl font-extrabold mb-6 flex items-center gap-2 text-gray-800 border-b pb-4">
                <Settings className="w-6 h-6 text-gray-500" />
                Registrar Nuevo Empleado
              </h2>
              
              <div className="mb-6 text-sm text-gray-600 bg-blue-50 border border-blue-200 p-4 rounded-md">
                 <strong>Nota del flujo de Firebase Frontend:</strong> Registrar una nueva cuenta cerrará automáticamente tu sesión actual de Admin. Una vez creada la cuenta del empleado, tendrás que volver a loguearte con tu correo de Admin.
              </div>

              {userMsg && (
                 <div className="mb-6 text-sm font-bold text-white bg-green-500 p-4 rounded-md">
                     {userMsg}
                 </div>
              )}

              <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                      <label className="block text-sm font-bold mb-1 text-gray-700">Correo Electrónico</label>
                      <input 
                          type="email" 
                          required
                          value={newUserEmail}
                          onChange={e => setNewUserEmail(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded focus:ring-orange-500" 
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-bold mb-1 text-gray-700">Contraseña temporal (Min. 6 letras)</label>
                      <input 
                          type="password" 
                          required
                          minLength={6}
                          value={newUserPassword}
                          onChange={e => setNewUserPassword(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded focus:ring-orange-500" 
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-bold mb-1 text-gray-700">Rol a asignar</label>
                      <select 
                          value={newUserRole}
                          onChange={e => setNewUserRole(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded focus:ring-orange-500 font-semibold" 
                      >
                          <option value="empleado">Empleado (Solo gestión de motos)</option>
                          <option value="admin">Administrador Total (Configuración completa)</option>
                      </select>
                  </div>
                  <button type="submit" disabled={creatingUser} className="w-full mt-6 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded disabled:opacity-50 transition-colors uppercase">
                      {creatingUser ? 'Procesando en Firebase...' : 'CREAR CUENTA EN LA NUBE'}
                  </button>
              </form>
          </div>
        )}

      </div>
    </div>
  );
}
