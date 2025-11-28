import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, X, MapPin, Bus, Download, RotateCcw, Search, Phone, Edit2, Lock, LogOut, EyeOff, Crown, FileText, Users, GraduationCap, ListFilter, Save, ShieldAlert, CreditCard, Hash } from 'lucide-react';

// --- CONFIGURACIÓN DE SUPABASE ---
const SUPABASE_URL = 'https://fgzegoflnkwkcztivila.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnemVnb2Zsbmt3a2N6dGl2aWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMzQyOTYsImV4cCI6MjA3OTkxMDI5Nn0.-u-NUiR5Eqitf4-zqvAAZhTKHc1_Cj3OKHAhGRHl8Xs';

// --- LISTA OFICIAL COMPLETA (NO BORRAR NADA) ---
const OFFICIAL_LIST = [
  { name: "Joseph Yancarlo Avalos Canales", phone: "3171325247", code: "225519213", amount: 480, nss: "5251056577", parent: "Lenis Alejandra Canales Castro", parentPhone: "3171048798" },
  { name: "Daira Athziri Saldaña Dávila", phone: "3171284644", code: "225521072", amount: 480, nss: "4927321887", parent: "María Luisa Dávila Muñoz", parentPhone: "3171146753" },
  { name: "Fernanda Saraly Garcia Lopez", phone: "3171066092", code: "225517318", amount: 480, nss: "4109019556", parent: "Rosario Guadalupe López Guerrero", parentPhone: "3171046130" },
  { name: "Axel Yael Anguiano Ramirez", phone: "3171089872", code: "225517423", amount: 480, nss: "52241073510", parent: "Isaura Ramírez Cortes", parentPhone: "3173875541" },
  { name: "Danniel Santiago Martinez Mendoza", phone: "3171051172", code: "225517431", amount: 480, nss: "45058351331", parent: "Daniela Guadalupe Mendoza Casillas", parentPhone: "3171064715" },
  { name: "Karla Joselyn Delgadillo Lizaola", phone: "3178731763", code: "223440318", amount: 480, nss: "60230824843", parent: "Sergio Emanuel Garibaldo Delgadillo", parentPhone: "3171285349" },
  { name: "Jose Armando Mejia Capacete", phone: "3326321025", code: "224080293", amount: 480, nss: "N/A", parent: "Maria Elena Capacete Chavez", parentPhone: "3171066215" },
  { name: "Kamila Zohemi Soto Ramos", phone: "3171002497", code: "224079929", amount: 480, nss: "19230886418", parent: "Iliana arina Ramos Dávila", parentPhone: "3173831730" },
  { name: "Jose de Jesús Orozco Garcia", phone: "3171041595", code: "N/A", amount: 480, nss: "4038697407", parent: "Karla Gisela Garcia Flores", parentPhone: "3171231595" },
  { name: "Sofia Guadalupe Delgadillo Barbosa", phone: "3173895711", code: "225517784", amount: 480, nss: "4967734775", parent: "Maria Guadalupe Barbosa Soltero", parentPhone: "3178735048" },
  { name: "Brittany Celeste Ortega Aguilar", phone: "3171078377", code: "225079589", amount: 480, nss: "3230814679", parent: "Maria Gabriela Aguilar Garcia", parentPhone: "3171281861" },
  { name: "Britany Guadalupe Horta Fuentes", phone: "3171213307", code: "224082423", amount: 480, nss: "58230870931", parent: "Juleitti Guadalupe Fuentes Bañuelos", parentPhone: "3171209722" },
  { name: "Priscila Gomez Nuñes", phone: "3171124221", code: "224079775", amount: 480, nss: "60230863734", parent: "Humberto Gomez Cisneros", parentPhone: "3173871279" },
  { name: "Donovan Eduardo Borbon Michel", phone: "3171082695", code: "223443937", amount: 480, nss: "2210867210", parent: "Hector Alejandro Borbon Torres", parentPhone: "3171203250" },
  { name: "Andrei Alexander Cuellar Ponce", phone: "3171050219", code: "224079562", amount: 480, nss: "19230868986", parent: "Alicia Abigail Ponce Ambriz", parentPhone: "3171074358" },
  { name: "Edwin Javier Robles Torres", phone: "3171126265", code: "223443325", amount: 480, nss: "N/A", parent: "Mariela Torres Pelayo", parentPhone: "3173873538" },
  { name: "Vanessa Guzman Zarazua", phone: "3171125243", code: "223442213", amount: 480, nss: "60230868287", parent: "German Guzman Sanchez", parentPhone: "3171078068" },
  { name: "Kimberly Lorena Gutierrez Tovar", phone: "3171094446", code: "223441101", amount: 480, nss: "19230891814", parent: "Dalia Morayma Tovar Iglesias", parentPhone: "3171121633" },
  { name: "Melanie Kamila Diaz Rios", phone: "3173833120", code: "224079279", amount: 480, nss: "404863075", parent: "Max Fernando Diaz Medina", parentPhone: "3171035612" },
  { name: "Jonathan Victor Hugo Lopez Montaño", phone: "3171296534", code: "224080765", amount: 480, nss: "3230829370", parent: "Marisol Montaño Ortega", parentPhone: "3171075014" },
  { name: "Ariadna Martinez Martinez", phone: "3171318301", code: "223441926", amount: 300, nss: "58230869834", parent: "Karla Janeth Martinez Castillo", parentPhone: "3171035583" },
  { name: "Alfonso Hueso Vidrio", phone: "3171361187", code: "224082121", amount: 480, nss: "5823086794", parent: "Ofelia Vidrio Guzman", parentPhone: "3173884314" },
  { name: "Kevin Nahir Zamora Martinez", phone: "3211134655", code: "224429776", amount: 480, nss: "17240998512", parent: "Silvestre Zamora Duran", parentPhone: "3173851523" },
  { name: "Oscar Daniel Gomez Melendez", phone: "3344335726", code: "223441128", amount: 480, nss: "19230895609", parent: "Daniel Gomez Carreño", parentPhone: "3171160665" },
  { name: "Kenya Mariana Dominguez Ramos", phone: "3171115887", code: "223442884", amount: 480, nss: "8392771293-1", parent: "Jose Luis Dominguez Ruiz", parentPhone: "3173883215" },
  { name: "Brisa Guadalupe Guerrero Buenrostro", phone: "3171111049", code: "224429393", amount: 480, nss: "18240990004", parent: "Luis Octavio Guerrero Rodriguez", parentPhone: "3171111049" },
  { name: "Rosa Camila Garcia Caloca", phone: "3171070658", code: "552217385", amount: 480, nss: "N/A", parent: "Maria del Rosario Garcia Caloca", parentPhone: "3173883392" },
  { name: "Evelyn Marlen Ruiz Solano", phone: "3171286183", code: "224427625", amount: 480, nss: "5240996602", parent: "Rosy Janeth Solano Rodriguez", parentPhone: "3171160255" },
  { name: "Kevin Alfonso Perez Cardenas", phone: "3171127866", code: "224430057", amount: 480, nss: "38250960770", parent: "Cesar Perez Oliva", parentPhone: "3171001456" },
  { name: "Jazmin Elizabeth Savalza Gonzalez", phone: "3171085894", code: "224427544", amount: 300, nss: "5240908011", parent: "Elisa Gonzalez Jimenez", parentPhone: "3171054594" },
  { name: "Alexa Fernanda Maldonado Gutierrez", phone: "3332527487", code: "224429547", amount: 300, nss: "17240976989", parent: "Claudia Yesenia Gutierrez Torres", parentPhone: "3411389939" },
  { name: "Ana Yatziry Lopez Preciado", phone: "3171132231", code: "225200381", amount: 480, nss: "3250990383", parent: "Karla Liliana Preciado Guzman", parentPhone: "3171118799" },
  { name: "Angel Uriel Pelayo Gutierrez", phone: "3171048425", code: "224428079", amount: 480, nss: "0325093452-2", parent: "Christian Ulises Pelayo Almanza", parentPhone: "3171011621" },
  { name: "Alejandra Estefania Yañez Fernandez", phone: "3171013245", code: "224011964", amount: 480, nss: "N/A", parent: "Mayra Yanuaria Fernandez Lopez", parentPhone: "3171219835" },
  { name: "Cristhian Martin Ramirez Jimenez", phone: "3171083416", code: "223444171", amount: 300, nss: "N/A", parent: "Esmeralda del Carmen Jimenez Lopez", parentPhone: "3171064911" },
  { name: "Teresa Madeleine Garcia Viramontes", phone: "3171059501", code: "N/A", amount: 480, nss: "5180386913", parent: "Everardo Garcia Rubalcaba", parentPhone: "3171436810" },
  { name: "Luna Renata Sanchez Benitez", phone: "3173882461", code: "225520653", amount: 480, nss: "3251039651", parent: "Adali Carolina Benitez Garcia", parentPhone: "3171203411" },
  { name: "Andrea Monserrat Galarza Benavides", phone: "3171195178", code: "225201361", amount: 480, nss: "N/A", parent: "Eva Josefina Benavides Hernandez", parentPhone: "3173830633" },
  { name: "Maria José Castillo Barreto", phone: "3171113312", code: "N/A", amount: 480, nss: "Pendiente", parent: "Pendiente", parentPhone: "Pendiente" },
  { name: "Ricardo Daniel Madrigal Trujillo", phone: "3171076126", code: "N/A", amount: 300, nss: "5210658802", parent: "Kenia Marina Trujillo Rodriguez", parentPhone: "3171072221" },
  { name: "Ricardo Ponce Orellana", phone: "3171121197", code: "224429563", amount: 480, nss: "18240985046", parent: "Berta Alicia Gonzalez Sevilla", parentPhone: "3171133752" },
  { name: "Carolina Trinidad Orozco", phone: "3171211500", code: "225520491", amount: 300, nss: "Pendiente", parent: "Pendiente", parentPhone: "Pendiente" },
  { name: "Aldo Ivan Lepe Figueroa", phone: "3171071964", code: "225200217", amount: 480, nss: "Pendiente", parent: "Pendiente", parentPhone: "Pendiente" },
  { name: "Arturo Pioquinto Alanis Avioneda", phone: "3171312596", code: "22519865", amount: 480, nss: "5240959782", parent: "Alejandra Avianeda Gutierrez", parentPhone: "3171237127" }
];

const COORDINATOR = {
  name: "Samuel Méndez Vidrio",
  phone: "3125950081",
  code: "223440784",
  role: "Encargado del Camión 1"
};

const App = () => {
  // --- TÍTULO DE LA PESTAÑA ---
  useEffect(() => {
    document.title = "Unión Estudiantil - FIL 2025";
  }, []);

  // --- AUTENTICACIÓN COORDINADOR ---
  const [isCoordinator, setIsCoordinator] = useState(() => {
    return localStorage.getItem('fil2025_auth') === 'true';
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUser === '223440784' && loginPass === 'samumv367') {
      setIsCoordinator(true);
      setShowLoginModal(false);
      localStorage.setItem('fil2025_auth', 'true');
      setLoginError('');
      setLoginUser(''); setLoginPass('');
    } else {
      setLoginError('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    setIsCoordinator(false);
    localStorage.removeItem('fil2025_auth');
  };

  const triggerLogin = () => {
    setShowLoginModal(true);
    setLoginError('');
  };

  // --- LÓGICA DE DATOS CON SUPABASE (Script Injection) ---
  const [supabase, setSupabase] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // 1. Cargar el script de Supabase
  useEffect(() => {
    if (window.supabase) {
      const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      setSupabase(client);
      return;
    }

    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    script.async = true;
    script.onload = () => {
      if (window.supabase) {
        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        setSupabase(client);
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup opcional
    };
  }, []);

  // 2. Usar Supabase cuando esté listo
  useEffect(() => {
    if (!supabase) return;

    fetchPassengers();
    const channel = supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'passengers' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setPassengers((prev) => [...prev, payload.new]);
          } else if (payload.eventType === 'DELETE') {
            setPassengers((prev) => prev.filter((p) => p.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setPassengers((prev) => prev.map((p) => (p.id === payload.new.id ? payload.new : p)));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const fetchPassengers = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('passengers')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error cargando:', error);
      alert("Error conectando a Supabase. ¿Desactivaste RLS? Mira la consola.");
    } else {
      setPassengers(data);
    }
    setLoading(false);
  };

  // --- FUNCIÓN DE EMERGENCIA PARA CARGAR LISTA ---
  const handleRestoreList = async () => {
    if(!isCoordinator) {
        triggerLogin();
        return;
    }
    if (!supabase) return alert("Supabase aún no carga");

    if(!window.confirm("¿ESTÁS SEGURO? Esto subirá la lista oficial de 43 estudiantes a la base de datos. Solo hazlo si la lista está vacía.")) return;

    setUploading(true);
    const records = OFFICIAL_LIST.map(p => ({
      name: p.name,
      phone: p.phone,
      code: p.code,
      amount: p.amount,
      nss: p.nss || 'N/A',
      parent: p.parent || 'N/A',
      parent_phone: p.parentPhone || 'N/A',
      checks: [false, false, false],
      times: [null, null, null]
    }));

    const { error } = await supabase.from('passengers').insert(records);
    
    if (error) {
        alert("Error al subir: " + error.message + ". ¿Seguro que desactivaste RLS?");
    } else {
        alert("¡Lista restaurada con éxito!");
        fetchPassengers();
    }
    setUploading(false);
  };

  // --- UI STATE ---
  const [filterLeg, setFilterLeg] = useState(null);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newNss, setNewNss] = useState('');
  const [newParent, setNewParent] = useState('');
  const [newParentPhone, setNewParentPhone] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const legs = [
    { id: 0, label: "Salida Autlán", sub: "→ FIL", icon: <Bus size={14} />, short: "Ida" },
    { id: 1, label: "Salida FIL", sub: "→ Plaza", icon: <MapPin size={14} />, short: "Inter" },
    { id: 2, label: "Regreso Plaza", sub: "→ Autlán", icon: <RotateCcw size={14} />, short: "Regreso" }
  ];

  // --- ACTIONS ---

  const addPassenger = async (e) => {
    e.preventDefault();
    if (!isCoordinator) { triggerLogin(); return; }
    if (!supabase) return;
    if (!newName.trim()) return;

    const newPassenger = {
      name: newName.trim(),
      phone: newPhone.trim() || 'N/A',
      code: newCode.trim() || 'N/A',
      amount: newAmount ? parseFloat(newAmount) : 0,
      nss: newNss.trim() || 'N/A',
      parent: newParent.trim() || 'N/A',
      parent_phone: newParentPhone.trim() || 'N/A',
      checks: [false, false, false],
      times: [null, null, null]
    };

    await supabase.from('passengers').insert([newPassenger]);
    setNewName(''); setNewPhone(''); setNewCode(''); setNewAmount(''); setNewNss(''); setNewParent(''); setNewParentPhone('');
    setShowAddForm(false);
  };

  const removePassenger = async (id) => {
    if (!isCoordinator) { triggerLogin(); return; }
    if (!supabase) return;
    if (window.confirm('¿Seguro que quieres eliminar a esta persona?')) {
      await supabase.from('passengers').delete().eq('id', id);
    }
  };

  const toggleDetails = (id) => {
    if (!isCoordinator) { triggerLogin(); return; }
    setPassengers(passengers.map(p => 
      p.id === id ? { ...p, showDetails: !p.showDetails } : p
    ));
  };

  const handleEditClick = (passenger) => {
    if (!isCoordinator) { triggerLogin(); return; }
    setEditingId(passenger.id);
    setEditFormData({ ...passenger });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: name === 'amount' ? parseFloat(value) || 0 : value });
  };

  const handleSaveEdit = async () => {
    if (!supabase) return;
    const { id, showDetails, ...dataToUpdate } = editFormData;
    await supabase.from('passengers').update(dataToUpdate).eq('id', id);
    setEditingId(null);
  };
   
  const handleCancelEdit = () => setEditingId(null);

  const toggleCheck = async (id, legIndex) => {
    if (!isCoordinator) { triggerLogin(); return; }
    if (!supabase) return;
    
    const passenger = passengers.find(p => p.id === id);
    if (!passenger) return;

    const isChecking = !passenger.checks[legIndex];
    const newChecks = [...passenger.checks];
    newChecks[legIndex] = isChecking;
    
    const newTimes = [...(passenger.times || [null, null, null])];
    if (isChecking) {
      const now = new Date();
      newTimes[legIndex] = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    } else {
      newTimes[legIndex] = null;
    }

    await supabase.from('passengers').update({ checks: newChecks, times: newTimes }).eq('id', id);
  };

  // --- RENDER ---
  const filteredPassengers = passengers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || (p.code && p.code.includes(searchTerm));
    const matchesFilter = filterLeg === null || !p.checks[filterLeg]; 
    return matchesSearch && matchesFilter;
  });

  const getStats = (legIndex) => {
    const count = passengers.filter(p => p.checks && p.checks[legIndex]).length;
    const total = passengers.length;
    return { count, total, percent: total === 0 ? 0 : (count / total) * 100 };
  };

  const totalPaidFull = passengers.filter(p => p.amount >= 480).length;
  const totalAdvance = passengers.filter(p => p.amount > 0 && p.amount < 480).length;
  const totalPending = passengers.filter(p => p.amount === 0).length;
  const totalMoney = passengers.reduce((sum, p) => sum + (p.amount || 0), 0);

  const exportToCSV = () => {
    if (!isCoordinator) { triggerLogin(); return; }
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Nombre,Monto,Teléfono,Código,NSS,Tutor,Tel. Tutor,Autlan->FIL (Hora),FIL->Plaza (Hora),Plaza->Autlan (Hora)\n";
    passengers.forEach(p => {
      const c1 = p.checks[0] ? `SI (${p.times[0]})` : 'NO';
      const c2 = p.checks[1] ? `SI (${p.times[1]})` : 'NO';
      const c3 = p.checks[2] ? `SI (${p.times[2]})` : 'NO';
      const row = `${p.name.replace(/,/g, '')},${p.amount||0},${p.phone||'N/A'},${p.code||'N/A'},${p.nss||'N/A'},${p.parent ? p.parent.replace(/,/g, '') : 'N/A'},${p.parent_phone||'N/A'},${c1},${c2},${c3}`;
      csvContent += row + "\n";
    });
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "asistencia_fil_2025.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-orange-50 text-orange-600 font-bold">Cargando datos...</div>;

  return (
    <div className="min-h-screen bg-orange-50/40 font-sans pb-24 text-gray-800">
      
      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-orange-200">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                 <Lock className="text-orange-500" /> Acceso Coordinador
               </h3>
               <button onClick={() => setShowLoginModal(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X size={20}/></button>
             </div>
             
             <form onSubmit={handleLogin} className="space-y-4">
                {loginError && <div className="p-3 bg-red-100 text-red-700 rounded-xl text-sm font-bold text-center">{loginError}</div>}
                <div>
                   <label className="text-xs font-bold text-gray-500 ml-1">USUARIO</label>
                   <input type="number" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Código" />
                </div>
                <div>
                   <label className="text-xs font-bold text-gray-500 ml-1">CONTRASEÑA</label>
                   <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 outline-none" placeholder="••••••" />
                </div>
                <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-orange-700 transition-colors">Iniciar Sesión</button>
             </form>
          </div>
        </div>
      )}
      
      {/* HEADER */}
      <div className="bg-gradient-to-br from-orange-700 via-orange-600 to-yellow-500 text-white p-6 pb-12 shadow-xl rounded-b-[2.5rem] relative z-20 transition-all">
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-orange-100/80 mb-1">Planilla</span>
                <div className="flex flex-col">
                    <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 drop-shadow-sm">Unión Estudiantil</h1>
                    <span className="text-sm font-bold text-orange-100 opacity-90 -mt-1">FIL 2025 (Supabase)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-orange-50 font-medium mt-2">
                    <div className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Bus size={12} className="text-yellow-300"/> Camión 1
                    </div>
                    {isCoordinator && (
                        <div className="bg-green-500/80 backdrop-blur-sm px-2 py-0.5 rounded-md flex items-center gap-1 text-white">
                            <Lock size={10} /> Coord. Activo
                        </div>
                    )}
                </div>
            </div>
            
            <div className="flex gap-2">
                <button onClick={isCoordinator ? handleLogout : triggerLogin} className={`p-2 rounded-2xl backdrop-blur-md border border-white/10 shadow-sm transition-all ${isCoordinator ? 'bg-red-500/80 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'}`}>
                    {isCoordinator ? <LogOut size={20} /> : <Lock size={20} />}
                </button>
                <span className="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl text-white font-bold border border-white/10 shadow-sm flex items-center">
                    {passengers.length} Pax
                </span>
            </div>
            </div>

            {/* Resumen Asistencia */}
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-3 mt-4 text-center text-xs">
            {legs.map((leg, idx) => {
                const stats = getStats(idx);
                return (
                <div key={idx} className="bg-black/10 backdrop-blur-sm rounded-2xl p-2.5 flex flex-col items-center border border-white/10 shadow-inner group transition-all hover:bg-black/20 col-span-1 md:col-span-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-orange-200/80 mb-0.5">{leg.sub.replace('→ ', '')}</span>
                    <div className="flex items-baseline justify-center gap-0.5 mb-1">
                        <span className={`text-3xl font-black tracking-tighter leading-none ${stats.count === stats.total && stats.total > 0 ? 'text-green-300 drop-shadow-[0_0_8px_rgba(134,239,172,0.5)]' : 'text-white drop-shadow-md'}`}>
                            {stats.count}
                        </span>
                        <span className="text-xs font-bold text-white/50">/{stats.total}</span>
                    </div>
                    <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-700 ease-out ${stats.count === stats.total ? 'bg-green-400' : 'bg-white'}`} style={{ width: `${stats.percent}%` }}></div>
                    </div>
                </div>
                )
            })}
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-30">
        
        {/* STATS CARDS */}
        <div className={`grid gap-3 mb-6 grid-cols-3 md:grid-cols-4 lg:grid-cols-4`}>
          <div className="bg-white p-3 rounded-2xl shadow-lg border-b-4 border-green-500 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
             <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Pagados</span>
             <span className="text-xl font-black text-gray-800">{totalPaidFull}</span>
          </div>
          <div className="bg-white p-3 rounded-2xl shadow-lg border-b-4 border-yellow-400 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
             <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Anticipos</span>
             <span className="text-xl font-black text-gray-800">{totalAdvance}</span>
          </div>
          <div className="bg-white p-3 rounded-2xl shadow-lg border-b-4 border-red-500 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
             <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Pendientes</span>
             <span className="text-xl font-black text-gray-800">{totalPending}</span>
          </div>
          {isCoordinator && (
            <div className="bg-white p-3 rounded-2xl shadow-lg border-b-4 border-orange-500 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform col-span-3 md:col-span-1">
               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Total MXN</span>
               <span className="text-lg font-black text-orange-600 tracking-tight">${totalMoney.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* COORDINADOR */}
        <div className="mb-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 max-w-2xl mx-auto">
            <div className="p-4 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Crown size={16} className="text-yellow-400 fill-yellow-400 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400/90">{COORDINATOR.role}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white leading-tight">{COORDINATOR.name}</h3>
                    <div className="flex flex-row gap-3 mt-1 text-gray-400 text-xs">
                        <span className="flex items-center gap-1.5"><Phone size={12} /> {COORDINATOR.phone}</span>
                    </div>
                </div>
                <a href={`tel:${COORDINATOR.phone}`} className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-full shadow-lg shadow-green-900/50 transition-transform active:scale-95">
                    <Phone size={20} strokeWidth={2.5} />
                </a>
            </div>
        </div>

        {/* SEARCH & ACTIONS */}
        <div className="flex flex-col md:flex-row gap-3 mb-4 max-w-4xl mx-auto">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-3.5 text-orange-300 transition-colors group-focus-within:text-orange-500" size={18} />
            <input type="text" placeholder="Buscar estudiante (nombre o código)..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-white border-none rounded-2xl shadow-md text-sm font-medium focus:ring-4 focus:ring-orange-500/20 transition-all outline-none" />
          </div>
          <button onClick={exportToCSV} className="p-3 bg-white text-green-600 rounded-2xl shadow-md hover:bg-green-50 hover:text-green-700 transition-colors flex items-center justify-center gap-2">
            <Download size={20} strokeWidth={2.5} /> <span className="md:hidden font-bold text-sm">Descargar Excel</span>
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 px-1 no-scrollbar justify-start md:justify-center">
           <div className="bg-white p-2 rounded-full shadow-sm"><ListFilter size={16} className="text-orange-500"/></div>
           <button onClick={() => setFilterLeg(null)} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${filterLeg === null ? 'bg-gray-800 text-white scale-105 shadow-md' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>Todos</button>
           {legs.map((leg) => (
             <button key={leg.id} onClick={() => setFilterLeg(leg.id)} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${filterLeg === leg.id ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white scale-105 shadow-orange-500/30' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>
                <span className={filterLeg === leg.id ? 'text-white' : 'text-orange-400'}>{leg.icon}</span> {filterLeg === leg.id ? `Faltan ${leg.short}` : leg.short}
             </button>
           ))}
        </div>

        {/* FORMULARIO AGREGAR */}
        {showAddForm && isCoordinator && (
          <div className="mb-6 bg-white p-5 rounded-3xl shadow-xl border border-orange-100 animate-in fade-in slide-in-from-top-4 max-w-2xl mx-auto">
            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide flex items-center gap-2"><span className="w-1 h-4 bg-orange-500 rounded-full"></span> Nuevo Pasajero</h3>
            <form onSubmit={addPassenger} className="space-y-3">
              <input type="text" placeholder="Nombre completo" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-medium"/>
              <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30 active:scale-95 transition-transform">Guardar Estudiante</button>
            </form>
          </div>
        )}

        {/* LISTA DE PASAJEROS (LISTA SIMPLE) */}
        <div className="grid grid-cols-1 gap-4 pb-10 max-w-lg mx-auto">
          {filteredPassengers.length === 0 ? (
            <div className="col-span-full text-center py-12 px-6 bg-white/50 rounded-3xl border border-dashed border-gray-300 mt-4">
               {filterLeg !== null ? (
                 <>
                   <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner"><Check size={32} className="text-green-600" strokeWidth={3} /></div>
                   <h3 className="text-lg font-bold text-gray-800">¡Zona Completada!</h3>
                 </>
               ) : (
                 <><Search size={40} className="mx-auto mb-3 text-gray-300" /><p className="text-gray-400 font-medium">No se encontraron resultados</p></>
               )}
            </div>
          ) : (
            filteredPassengers.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-orange-50/50 overflow-hidden transition-all duration-300 group relative flex flex-col">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 to-yellow-400"></div>
                
                <div className="p-4 relative z-10 pl-5 flex-1">
                  <div className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-sm ${p.amount >= 480 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                      ${p.amount}
                  </div>

                  {editingId === p.id && isCoordinator ? (
                    <div className="space-y-3 pt-1 animate-in fade-in">
                      <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-wider mb-2 border-b pb-1"><Edit2 size={12}/> Editando Información</div>
                      
                      {/* Campos Generales */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Estudiante</label>
                        <input name="name" value={editFormData.name} onChange={handleEditChange} className="w-full p-2 bg-orange-50/50 rounded-lg text-sm font-bold text-gray-800 border-none focus:ring-2 focus:ring-orange-200 placeholder:text-gray-300" placeholder="Nombre completo"/>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="relative">
                                <Phone size={12} className="absolute left-2 top-2.5 text-gray-400"/>
                                <input name="phone" placeholder="Teléfono" value={editFormData.phone} onChange={handleEditChange} className="w-full pl-6 p-2 bg-gray-50 rounded-lg text-xs font-medium"/>
                            </div>
                            <div className="relative">
                                <CreditCard size={12} className="absolute left-2 top-2.5 text-gray-400"/>
                                <input name="amount" placeholder="Monto $" type="number" value={editFormData.amount} onChange={handleEditChange} className="w-full pl-6 p-2 bg-gray-50 rounded-lg text-xs font-medium"/>
                            </div>
                            <div className="relative">
                                <Hash size={12} className="absolute left-2 top-2.5 text-gray-400"/>
                                <input name="code" placeholder="Código UDG" value={editFormData.code} onChange={handleEditChange} className="w-full pl-6 p-2 bg-gray-50 rounded-lg text-xs font-medium"/>
                            </div>
                        </div>
                      </div>

                      {/* Campos Confidenciales */}
                      <div className="space-y-2 pt-1 border-t border-dashed">
                        <label className="text-[10px] font-bold text-red-400 uppercase flex items-center gap-1"><ShieldAlert size={10}/> Datos Confidenciales</label>
                        <input name="nss" placeholder="NSS (Seguro Social)" value={editFormData.nss} onChange={handleEditChange} className="w-full p-2 bg-red-50/50 border border-red-100 rounded-lg text-xs text-gray-700"/>
                        <input name="parent" placeholder="Nombre del Tutor" value={editFormData.parent} onChange={handleEditChange} className="w-full p-2 bg-red-50/50 border border-red-100 rounded-lg text-xs text-gray-700"/>
                        <input name="parent_phone" placeholder="Teléfono Tutor" value={editFormData.parent_phone} onChange={handleEditChange} className="w-full p-2 bg-red-50/50 border border-red-100 rounded-lg text-xs text-gray-700"/>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button onClick={handleSaveEdit} className="flex-1 bg-green-500 text-white py-2 rounded-lg text-xs font-bold shadow-md hover:bg-green-600 transition-colors flex items-center justify-center gap-1"><Save size={14}/> Guardar</button>
                        <button onClick={handleCancelEdit} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors">Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <div className="pr-2">
                        <h3 onClick={() => isCoordinator && toggleDetails(p.id)} className={`font-bold text-sm leading-tight mb-2 transition-colors ${isCoordinator ? 'cursor-pointer hover:text-orange-600 text-gray-800' : 'text-gray-800'}`}>
                            {p.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-[10px] text-gray-500 mb-3">
                            <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md border border-orange-100/50"><Phone size={10} className="text-orange-500" /><span className="font-medium">{p.phone}</span></div>
                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100/50"><GraduationCap size={12} className="text-gray-400" /><span>{p.code}</span></div>
                        </div>

                        <div className="flex gap-3 pt-2 border-t border-gray-100/50 min-h-[24px] items-center justify-between">
                             {isCoordinator ? (
                                 <>
                                    <button onClick={() => handleEditClick(p)} className="flex items-center gap-1 text-[10px] font-bold uppercase text-blue-500 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded-md transition-colors"><Edit2 size={12} /> Editar</button>
                                    <button onClick={() => removePassenger(p.id)} className="flex items-center gap-1 text-[10px] font-bold uppercase text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition-colors"><Trash2 size={12} /> Eliminar</button>
                                 </>
                             ) : (
                                 <span className="text-[10px] text-gray-300 font-medium italic flex items-center gap-1"><EyeOff size={12}/> Info privada</span>
                             )}
                        </div>

                        {p.showDetails && isCoordinator && (
                            <div className="mt-3 bg-white p-3 rounded-xl border border-orange-200 text-xs animate-in fade-in zoom-in-95 shadow-[0_0_15px_rgba(251,146,60,0.1)] relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-1 bg-orange-100 rounded-bl-lg"><Lock size={10} className="text-orange-400"/></div>
                                <div className="space-y-2 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-orange-50 p-1 rounded-full shadow-sm"><FileText size={10} className="text-orange-500"/></div>
                                        <span className="text-gray-500 font-medium">NSS:</span> <span className="text-gray-800 font-bold select-all">{p.nss}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="bg-orange-50 p-1 rounded-full shadow-sm mt-0.5"><Users size={10} className="text-orange-500"/></div>
                                        <div><span className="text-gray-500 font-medium block">Tutor:</span> <span className="text-gray-800 font-bold">{p.parent}</span></div>
                                    </div>
                                    <div className="flex items-center gap-2 pt-1">
                                         <a href={`tel:${p.parent_phone}`} className="w-full bg-gradient-to-r from-green-50 to-white border border-green-200 text-green-700 py-1.5 rounded-lg flex items-center justify-center gap-2 font-bold shadow-sm hover:from-green-100 transition-all active:scale-95">
                                             <Phone size={12} fill="currentColor" /> {p.parent_phone}
                                         </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                  )}
                </div>

                {editingId !== p.id && (
                  <div className="grid grid-cols-3 divide-x divide-gray-100 bg-gray-50/30 relative z-10 border-t border-gray-100 mt-auto">
                    {legs.map((leg, idx) => (
                      <button key={idx} onClick={() => toggleCheck(p.id, idx)} className={`relative flex flex-col items-center justify-center py-3 transition-all duration-300 group/btn hover:bg-white ${p.checks && p.checks[idx] ? 'bg-green-500/5 text-green-700' : 'text-gray-400'}`}>
                        <div className={`mb-1 p-1.5 rounded-full transition-all duration-300 shadow-sm ${p.checks && p.checks[idx] ? 'bg-green-500 text-white scale-110 shadow-green-500/40' : 'bg-white text-gray-300 group-hover/btn:text-orange-400 shadow-sm border border-gray-100'}`}>
                           {p.checks && p.checks[idx] ? <Check size={14} strokeWidth={4} /> : leg.icon}
                        </div>
                        {p.checks && p.checks[idx] ? (
                            <div className="flex flex-col items-center animate-in zoom-in">
                                <span className="text-[10px] font-black uppercase tracking-wider text-green-600">Abordó</span>
                                <span className="text-[9px] font-medium opacity-80">{p.times?.[idx]}</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 group-hover/btn:text-orange-500/70 transition-colors">{idx === 0 ? 'IDA' : idx === 1 ? 'INTER' : 'REGR'}</span>
                            </div>
                        )}
                        {p.checks && p.checks[idx] && <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-t-full"></div>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
        {/* BOTONES FLOTANTES */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
            {/* BOTÓN RESTAURAR LISTA (Visible si está vacío o si es Coord) */}
            {isCoordinator && passengers.length === 0 && (
                <button 
                    onClick={handleRestoreList} 
                    disabled={uploading}
                    className="bg-red-600 text-white p-3 rounded-full shadow-2xl shadow-red-900/40 hover:scale-105 active:scale-95 transition-all border-2 border-white flex items-center gap-2 font-bold text-xs"
                >
                    {uploading ? 'Subiendo...' : '⚠️ RESTAURAR LISTA OFICIAL'}
                </button>
            )}

            <button onClick={isCoordinator ? () => setShowAddForm(true) : triggerLogin} className="bg-gray-900 text-white p-4 rounded-full shadow-2xl shadow-gray-900/40 hover:scale-105 active:scale-95 transition-all border-4 border-white/20">
                {isCoordinator ? <Plus size={24} strokeWidth={3} /> : <Lock size={24} />}
            </button>
        </div>

      </div>
    </div>
  );
};

export default App;
  );
};

export default App;
