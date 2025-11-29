import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, X, MapPin, Bus, Download, RotateCcw, Search, Phone, Edit2, Lock, LogOut, EyeOff, Crown, FileText, Users, GraduationCap, ListFilter, Save, ShieldAlert, CreditCard, Hash, User, Bell, ArrowUpDown, ArrowDownAZ, Armchair, LayoutGrid } from 'lucide-react';

// --- CONFIGURACIÓN DE SUPABASE ---
const SUPABASE_URL = 'https://fgzegoflnkwkcztivila.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnemVnb2Zsbmt3a2N6dGl2aWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMzQyOTYsImV4cCI6MjA3OTkxMDI5Nn0.-u-NUiR5Eqitf4-zqvAAZhTKHc1_Cj3OKHAhGRHl8Xs';

// --- LISTA OFICIAL COMPLETA ---
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

  // --- AUTENTICACIÓN COORDINADOR Y USUARIO ---
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('fil2025_user') || null;
  });
  
  // Si hay un usuario, es coordinador
  const isCoordinator = !!currentUser;

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Credenciales
    const isSamuel = loginUser === '223440784' && loginPass === 'samumv367';
    // Permitir "Francisco" o "francisco" (case insensitive para el nombre)
    const isFrancisco = (loginUser.toLowerCase() === 'francisco') && loginPass === 'fil2025';

    if (isSamuel) {
      const name = "Samuel M.";
      setCurrentUser(name);
      localStorage.setItem('fil2025_user', name);
      setShowLoginModal(false);
      setLoginError('');
      setLoginUser(''); setLoginPass('');
    } else if (isFrancisco) {
      const name = "Francisco P.";
      setCurrentUser(name);
      localStorage.setItem('fil2025_user', name);
      setShowLoginModal(false);
      setLoginError('');
      setLoginUser(''); setLoginPass('');
    } else {
      setLoginError('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('fil2025_user');
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
      times: [null, null, null],
      seat_number: null // Ensure seat_number is initialized
    }));

    const { error } = await supabase.from('passengers').insert(records);
    
    if (error) {
        alert("Error al subir: " + error.message + ". ¿Seguro que desactivaste RLS?");
    } else {
        showNotification("¡Lista restaurada con éxito!", 'success');
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
  
  // Sorting State
  const [sortMode, setSortMode] = useState('original'); // 'original', 'alpha', 'lastname'

  // MODAL EDIT STATE
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  // BUS MAP STATE
  const [showBusMap, setShowBusMap] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null); // The seat number user clicked on
  const [seatSearchTerm, setSeatSearchTerm] = useState(''); // NEW: Seat search

  // NOTIFICATION SYSTEM
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

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
      times: [null, null, null],
      seat_number: null
    };

    const { error } = await supabase.from('passengers').insert([newPassenger]);
    if (!error) showNotification("Pasajero agregado correctamente");
    
    setNewName(''); setNewPhone(''); setNewCode(''); setNewAmount(''); setNewNss(''); setNewParent(''); setNewParentPhone('');
    setShowAddForm(false);
  };

  const removePassenger = async (id) => {
    if (!isCoordinator) { triggerLogin(); return; }
    if (!supabase) return;
    if (window.confirm('¿Seguro que quieres eliminar a esta persona?')) {
      await supabase.from('passengers').delete().eq('id', id);
      showNotification("Pasajero eliminado", "error");
      setShowEditModal(false);
    }
  };

  const handleEditClick = (passenger) => {
    if (!isCoordinator) { triggerLogin(); return; }
    setEditFormData({ ...passenger });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: name === 'amount' ? parseFloat(value) || 0 : value });
  };

  const handleSaveEdit = async () => {
    if (!supabase) return;
    const { id, ...dataToUpdate } = editFormData;
    await supabase.from('passengers').update(dataToUpdate).eq('id', id);
    showNotification("Información actualizada");
    setShowEditModal(false);
  };

  const handleLocalAmountChange = (id, newVal) => {
    setPassengers(prev => prev.map(p => p.id === id ? { ...p, amount: newVal } : p));
  };

  const handleAmountBlur = async (id, newVal) => {
    if (!supabase) return;
    const amount = parseFloat(newVal) || 0;
    await supabase.from('passengers').update({ amount }).eq('id', id);
    showNotification(`Pago actualizado: $${amount}`);
  };
   
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

  // --- SEAT MAP ACTIONS ---
  const handleSeatClick = (seatNum) => {
    if (!isCoordinator) {
        showNotification("Solo coordinadores pueden asignar asientos", "error");
        return;
    }
    setSelectedSeat(seatNum);
    setSeatSearchTerm(''); // Clear search when selecting new seat
  };

  const assignSeat = async (passengerId, seatNum) => {
    if (!supabase) return;
    // Check if seat is already taken
    const taken = passengers.find(p => p.seat_number === seatNum);
    if (taken) {
        if(!window.confirm(`El asiento ${seatNum} ya está ocupado por ${taken.name}. ¿Deseas reemplazarlo?`)) return;
        // Unassign previous
        await supabase.from('passengers').update({ seat_number: null }).eq('id', taken.id);
    }

    // Assign new
    await supabase.from('passengers').update({ seat_number: seatNum }).eq('id', passengerId);
    showNotification(`Asiento ${seatNum} asignado`);
    setSelectedSeat(null);
  };

  const releaseSeat = async (passengerId) => {
    if (!supabase) return;
    await supabase.from('passengers').update({ seat_number: null }).eq('id', passengerId);
    showNotification("Asiento liberado");
    setSelectedSeat(null);
  };

  // --- SORTING LOGIC ---
  const getSurname = (fullName) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 4) return parts[2];
    if (parts.length === 3) return parts[1];
    return parts[0];
  };

  const formatDisplayName = (name) => {
    if (sortMode !== 'lastname') return name;
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 4) {
       return `${parts.slice(2).join(' ')} ${parts.slice(0, 2).join(' ')}`;
    }
    if (parts.length === 3) {
       return `${parts.slice(1).join(' ')} ${parts[0]}`;
    }
    if (parts.length === 2) {
       return `${parts[1]} ${parts[0]}`;
    }
    return name;
  };

  const cycleSortMode = () => {
    if (sortMode === 'original') setSortMode('alpha');
    else if (sortMode === 'alpha') setSortMode('lastname');
    else setSortMode('original');
  };

  const getSortLabel = () => {
    if (sortMode === 'alpha') return 'A-Z (Nombre)';
    if (sortMode === 'lastname') return 'A-Z (Apellido)';
    return 'Original';
  };

  const getInitials = (name) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  // --- RENDER ---
  const filteredPassengers = passengers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || (p.code && p.code.includes(searchTerm));
    const matchesFilter = filterLeg === null || !p.checks[filterLeg]; 
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sortMode === 'original') return a.id - b.id;
    if (sortMode === 'alpha') return a.name.localeCompare(b.name);
    if (sortMode === 'lastname') {
        const surnameA = getSurname(a.name);
        const surnameB = getSurname(b.name);
        return surnameA.localeCompare(surnameB);
    }
    return 0;
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
    csvContent += "Nombre,Monto,Teléfono,Código,NSS,Tutor,Tel. Tutor,Asiento,Autlan->FIL (Hora),FIL->Plaza (Hora),Plaza->Autlan (Hora)\n";
    passengers.forEach(p => {
      const c1 = p.checks[0] ? `SI (${p.times[0]})` : 'NO';
      const c2 = p.checks[1] ? `SI (${p.times[1]})` : 'NO';
      const c3 = p.checks[2] ? `SI (${p.times[2]})` : 'NO';
      const row = `${p.name.replace(/,/g, '')},${p.amount||0},${p.phone||'N/A'},${p.code||'N/A'},${p.nss||'N/A'},${p.parent ? p.parent.replace(/,/g, '') : 'N/A'},${p.parent_phone||'N/A'},${p.seat_number || 'N/A'},${c1},${c2},${c3}`;
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
      
      {/* NOTIFICATION TOAST */}
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 ease-in-out ${notification.visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl border ${notification.type === 'error' ? 'bg-white border-red-200 text-red-600' : 'bg-white border-green-200 text-green-700'}`}>
            {notification.type === 'error' ? <ShieldAlert size={20}/> : <Check size={20} className="bg-green-100 p-0.5 rounded-full"/>}
            <span className="font-bold text-sm">{notification.message}</span>
        </div>
      </div>

      {/* BUS MAP MODAL */}
      {showBusMap && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-orange-200 relative max-h-[95vh] flex flex-col overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Bus className="text-orange-500" /> Mapa del Autobús
                    </h3>
                    <button onClick={() => setShowBusMap(false)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"><X size={20}/></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-100/50">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* THE BUS */}
                        <div className="flex-1">
                            <div className="bg-white p-6 rounded-[3rem] shadow-xl border-4 border-gray-200 relative mx-auto max-w-sm">
                                {/* Driver Area */}
                                <div className="border-b-4 border-dashed border-gray-200 pb-4 mb-6 flex justify-between px-8 text-gray-300 font-bold uppercase tracking-widest text-xs">
                                    <span>Frente</span>
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200"><User size={20}/></div>
                                </div>

                                {/* Seats Grid (11 rows x 4 cols + aisle) */}
                                <div className="space-y-3">
                                    {Array.from({ length: 11 }).map((_, rowIndex) => (
                                        <div key={rowIndex} className="flex justify-between items-center gap-2 md:gap-4">
                                            {/* Left Side (Seats 1,2 - 5,6 etc) */}
                                            <div className="flex gap-2">
                                                {[1, 2].map(offset => {
                                                    const seatNum = (rowIndex * 4) + offset;
                                                    const occupant = passengers.find(p => p.seat_number === seatNum);
                                                    return (
                                                        <button 
                                                            key={seatNum}
                                                            onClick={() => handleSeatClick(seatNum)}
                                                            className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-sm transition-all transform hover:scale-110 active:scale-95 border-b-4 ${occupant ? 'bg-red-500 border-red-700 text-white' : 'bg-green-400 border-green-600 text-white hover:bg-green-500'}`}
                                                        >
                                                            {occupant ? <span className="text-xs font-bold">{getInitials(occupant.name)}</span> : <span className="text-xs font-bold opacity-50">{seatNum}</span>}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            {/* Aisle Number */}
                                            <span className="text-[10px] font-bold text-gray-300 w-4 text-center">{rowIndex + 1}</span>

                                            {/* Right Side (Seats 3,4 - 7,8 etc) */}
                                            <div className="flex gap-2">
                                                {[3, 4].map(offset => {
                                                    const seatNum = (rowIndex * 4) + offset;
                                                    const occupant = passengers.find(p => p.seat_number === seatNum);
                                                    return (
                                                        <button 
                                                            key={seatNum}
                                                            onClick={() => handleSeatClick(seatNum)}
                                                            className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-sm transition-all transform hover:scale-110 active:scale-95 border-b-4 ${occupant ? 'bg-red-500 border-red-700 text-white' : 'bg-green-400 border-green-600 text-white hover:bg-green-500'}`}
                                                        >
                                                            {occupant ? <span className="text-xs font-bold">{getInitials(occupant.name)}</span> : <span className="text-xs font-bold opacity-50">{seatNum}</span>}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* SELECTION PANEL */}
                        <div className="w-full md:w-80 flex-shrink-0">
                            {selectedSeat ? (
                                <div className="bg-white p-6 rounded-3xl shadow-lg border border-orange-100 animate-in slide-in-from-right">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-lg text-gray-800">Asiento #{selectedSeat}</h4>
                                        <button onClick={() => setSelectedSeat(null)} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
                                    </div>
                                    
                                    {passengers.find(p => p.seat_number === selectedSeat) ? (
                                        <div className="text-center py-6">
                                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 text-red-500"><User size={32}/></div>
                                            <p className="text-sm font-bold text-gray-500 uppercase mb-1">Ocupado por</p>
                                            <p className="text-lg font-bold text-gray-800 mb-4">{passengers.find(p => p.seat_number === selectedSeat).name}</p>
                                            <button onClick={() => releaseSeat(passengers.find(p => p.seat_number === selectedSeat).id)} className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-bold border border-red-200 hover:bg-red-100 w-full">Liberar Asiento</button>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Asignar a pasajero sin asiento:</p>
                                            
                                            {/* SEARCH IN SEAT SELECTION */}
                                            <div className="relative mb-2">
                                                <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
                                                <input 
                                                    type="text" 
                                                    placeholder="Buscar pasajero..." 
                                                    value={seatSearchTerm}
                                                    onChange={(e) => setSeatSearchTerm(e.target.value)}
                                                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-orange-500 outline-none"
                                                />
                                            </div>

                                            <div className="max-h-80 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                                {passengers.filter(p => !p.seat_number).length === 0 && <p className="text-center text-gray-400 text-xs py-4">Todos tienen asiento 🎉</p>}
                                                {passengers
                                                    .filter(p => !p.seat_number && (p.name.toLowerCase().includes(seatSearchTerm.toLowerCase()) || (p.code && p.code.includes(seatSearchTerm))))
                                                    .sort((a,b) => {
                                                      // Apply the selected sort mode (LastName or Alpha) to the seat assignment list as well
                                                      if (sortMode === 'lastname') {
                                                          const surnameA = getSurname(a.name);
                                                          const surnameB = getSurname(b.name);
                                                          return surnameA.localeCompare(surnameB);
                                                      }
                                                      return a.name.localeCompare(b.name);
                                                    })
                                                    .map(p => (
                                                    <button 
                                                        key={p.id} 
                                                        onClick={() => assignSeat(p.id, selectedSeat)}
                                                        className="w-full text-left p-3 rounded-xl hover:bg-orange-50 border border-transparent hover:border-orange-100 transition-all group"
                                                    >
                                                        <span className="font-bold text-xs text-gray-700 group-hover:text-orange-700 block">{formatDisplayName(p.name)}</span>
                                                        <span className="text-[10px] text-gray-400">{p.code}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-white/50 border border-dashed border-gray-300 p-8 rounded-3xl flex flex-col items-center justify-center text-center h-full text-gray-400">
                                    <Armchair size={48} className="mb-3 opacity-50"/>
                                    <p className="text-sm font-medium">Selecciona un asiento del mapa para ver detalles o asignar un pasajero.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* EDIT MODAL WINDOW */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-orange-200 relative max-h-[90vh] overflow-y-auto">
             <div className="flex justify-between items-center mb-6 border-b pb-4">
               <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                 <User className="text-orange-500" /> Ficha del Pasajero
               </h3>
               <button onClick={() => setShowEditModal(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><X size={20}/></button>
             </div>
             
             <div className="space-y-4">
                {/* General Info Section */}
                <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Información General</label>
                    <div>
                        <label className="text-xs font-bold text-gray-500 ml-1">NOMBRE COMPLETO</label>
                        <input name="name" value={editFormData.name} onChange={handleEditChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-800 focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-bold text-gray-500 ml-1">TELÉFONO</label>
                            <input name="phone" value={editFormData.phone} onChange={handleEditChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 ml-1">CÓDIGO UDG</label>
                            <input name="code" value={editFormData.code} onChange={handleEditChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 ml-1">MONTO PAGADO ($)</label>
                        <input type="number" name="amount" value={editFormData.amount} onChange={handleEditChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                </div>

                {/* Confidential Info Section */}
                <div className="bg-red-50/50 p-4 rounded-xl space-y-3 border border-red-100">
                    <label className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1 flex items-center gap-1"><ShieldAlert size={12}/> Información Confidencial</label>
                    <div>
                        <label className="text-xs font-bold text-gray-500 ml-1">NSS (SEGURO SOCIAL)</label>
                        <input name="nss" value={editFormData.nss} onChange={handleEditChange} className="w-full p-3 bg-white border border-red-100 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-red-200 outline-none" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 ml-1">NOMBRE DEL TUTOR</label>
                        <input name="parent" value={editFormData.parent} onChange={handleEditChange} className="w-full p-3 bg-white border border-red-100 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-red-200 outline-none" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 ml-1">TELÉFONO DEL TUTOR</label>
                        <div className="flex gap-2">
                            <input name="parent_phone" value={editFormData.parent_phone} onChange={handleEditChange} className="w-full p-3 bg-white border border-red-100 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-red-200 outline-none" />
                            <a href={`tel:${editFormData.parent_phone}`} className="bg-green-100 text-green-700 p-3 rounded-xl flex items-center justify-center hover:bg-green-200 transition-colors"><Phone size={20}/></a>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <button onClick={() => removePassenger(editFormData.id)} className="px-4 py-3 bg-red-100 text-red-600 rounded-xl font-bold hover:bg-red-200 transition-colors flex items-center justify-center"><Trash2 size={20}/></button>
                    <button onClick={handleSaveEdit} className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"><Save size={20}/> Guardar Cambios</button>
                </div>
             </div>
          </div>
        </div>
      )}

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
                   <input type="text" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Código o Nombre" />
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
      <div className="bg-gradient-to-br from-orange-700 via-orange-600 to-yellow-500 text-white p-6 pb-12 shadow-2xl shadow-orange-900/50 rounded-b-[2.5rem] relative z-20 transition-all overflow-hidden">
        {/* Decorative gloss/shadow for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/5 pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative">
            <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-orange-100/90 mb-1 drop-shadow-md">Planilla</span>
                <div className="flex flex-col">
                    <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 drop-shadow-xl filter">Unión Estudiantil</h1>
                    <span className="text-sm font-bold text-orange-100 opacity-90 -mt-1 drop-shadow-md">FIL 2025 (Supabase)</span>
                </div>
                
                {/* GREETING OR DEFAULT TEXT */}
                <div className="flex items-center gap-2 text-xs text-orange-50 font-medium mt-2">
                    {currentUser ? (
                        <div className="bg-yellow-400/90 text-yellow-900 px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg shadow-yellow-900/20 animate-in fade-in slide-in-from-left-2 backdrop-blur-sm border border-yellow-300/50">
                            👋 Hola {currentUser}
                        </div>
                    ) : (
                       <div className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm border border-white/10">
                           <Bus size={12} className="text-yellow-300 drop-shadow-sm"/> Camión 1
                       </div>
                    )}
                    {isCoordinator && (
                        <div className="bg-green-500/80 backdrop-blur-sm px-2 py-0.5 rounded-md flex items-center gap-1 text-white shadow-sm border border-green-400/30">
                            <Lock size={10} className="drop-shadow-sm" /> Coord. Activo
                        </div>
                    )}
                </div>
            </div>
            
            <div className="flex gap-2">
                <button onClick={isCoordinator ? handleLogout : triggerLogin} className={`p-2 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg transition-all ${isCoordinator ? 'bg-red-500/80 hover:bg-red-600 shadow-red-900/20' : 'bg-white/20 hover:bg-white/30 shadow-black/10'}`}>
                    {isCoordinator ? <LogOut size={20} className="drop-shadow-sm" /> : <Lock size={20} className="drop-shadow-sm" />}
                </button>
                <span className="text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl text-white font-bold border border-white/20 shadow-lg shadow-black/10 flex items-center drop-shadow-sm">
                    {passengers.length} Pax
                </span>
            </div>
            </div>

            {/* Resumen Asistencia */}
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-3 mt-4 text-center text-xs">
            {legs.map((leg, idx) => {
                const stats = getStats(idx);
                return (
                <div key={idx} className="bg-black/20 backdrop-blur-md rounded-2xl p-2.5 flex flex-col items-center border border-white/10 shadow-inner group transition-all hover:bg-black/30">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-orange-100/90 mb-0.5 drop-shadow-sm">{leg.sub.replace('→ ', '')}</span>
                    <div className="flex items-baseline justify-center gap-0.5 mb-1">
                        <span className={`text-3xl font-black tracking-tighter leading-none drop-shadow-md ${stats.count === stats.total && stats.total > 0 ? 'text-green-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]' : 'text-white'}`}>
                            {stats.count}
                        </span>
                        <span className="text-xs font-bold text-white/60 drop-shadow-sm">/{stats.total}</span>
                    </div>
                    <div className="w-full bg-black/30 h-1.5 rounded-full overflow-hidden shadow-inner">
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

        {/* FILTERS & SORT */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 px-1 no-scrollbar justify-start md:justify-center">
           <div className="bg-white p-2 rounded-full shadow-sm"><ListFilter size={16} className="text-orange-500"/></div>
           
           {/* MAP BUTTON */}
           <button onClick={() => setShowBusMap(true)} className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm bg-white text-gray-600 hover:bg-orange-50 flex items-center gap-2 border border-gray-100 hover:border-orange-200 group">
              <Armchair size={14} className="text-orange-500 group-hover:scale-110 transition-transform"/>
              <span className="group-hover:text-orange-600">Mapa</span>
           </button>

           <div className="w-px h-6 bg-gray-200 mx-1"></div>
           
           {/* SORT BUTTON */}
           <button onClick={cycleSortMode} className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm bg-white text-gray-600 hover:bg-gray-50 flex items-center gap-2 border border-gray-100">
              {sortMode === 'original' ? <ArrowUpDown size={14} className="text-gray-400"/> : <ArrowDownAZ size={14} className="text-orange-500"/>}
              {getSortLabel()}
           </button>

           <div className="w-px h-6 bg-gray-200 mx-1"></div>

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
        <div className="grid grid-cols-1 gap-4 pb-10 max-w-7xl mx-auto">
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
                
                <div className="p-4 relative z-10 pl-5 flex-1 flex justify-between items-start">
                  <div className="flex-1 pr-14"> {/* Aumentado el padding derecho para evitar solapamiento con el dinero */}
                        
                        {/* EDICIÓN RÁPIDA DE DINERO (Posicionamiento absoluto) */}
                        <div className="absolute top-3 right-3 z-20">
                            {isCoordinator ? (
                                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border shadow-sm transition-colors ${p.amount >= 480 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                                    <span className={`text-[10px] font-bold ${p.amount >= 480 ? 'text-green-700' : 'text-yellow-700'}`}>$</span>
                                    <input 
                                        type="number" 
                                        value={p.amount}
                                        onChange={(e) => handleLocalAmountChange(p.id, e.target.value)}
                                        onBlur={(e) => handleAmountBlur(p.id, e.target.value)}
                                        onKeyDown={(e) => { if(e.key === 'Enter') e.target.blur(); }}
                                        className={`w-12 text-[10px] font-bold bg-transparent outline-none text-right ${p.amount >= 480 ? 'text-green-700 placeholder-green-300' : 'text-yellow-700 placeholder-yellow-300'}`}
                                    />
                                </div>
                            ) : (
                                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-sm ${p.amount >= 480 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                                    ${p.amount}
                                </div>
                            )}
                        </div>

                        {/* NOMBRE CLICKABLE (Abre modal o Login) */}
                        <h3 onClick={() => handleEditClick(p)} className={`font-bold text-sm leading-tight mb-2 transition-colors cursor-pointer hover:text-orange-600 text-gray-800 flex items-center gap-2 group-hover:underline select-none`}>
                            {formatDisplayName(p.name)} 
                            {isCoordinator ? (
                                <Edit2 size={12} className="text-gray-300 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all"/>
                            ) : (
                                <Lock size={12} className="text-gray-300 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all"/>
                            )}
                        </h3>
                        
                        <div className="flex flex-wrap gap-2 text-[10px] text-gray-500 mb-2">
                            <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md border border-orange-100/50"><Phone size={10} className="text-orange-500" /><span className="font-medium">{p.phone}</span></div>
                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100/50"><GraduationCap size={12} className="text-gray-400" /><span>{p.code}</span></div>
                        </div>
                  </div>
                </div>

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
