import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Plus, Trash2, Check, X, MapPin, Bus, Download, RotateCcw, Search, Phone, Edit2, Lock, LogOut, EyeOff, Crown, FileText, Users, GraduationCap, ListFilter, Save, ShieldAlert, CreditCard, Hash, User, Bell, ArrowUpDown, ArrowDownAZ, Armchair, LayoutGrid, UserPlus, Bath, Upload, FileCheck, Ticket, ExternalLink, Unlock, AlertTriangle, Eye, KeyRound, FileWarning, Clock, Zap, Loader2, Calendar, Coffee, ShoppingBag, Milestone } from 'lucide-react';

// --- CONFIGURACIÓN DE SUPABASE ---
const SUPABASE_URL = 'https://fgzegoflnkwkcztivila.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnemVnb2Zsbmt3a2N6dGl2aWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMzQyOTYsImV4cCI6MjA3OTkxMDI5Nn0.-u-NUiR5Eqitf4-zqvAAZhTKHc1_Cj3OKHAhGRHl8Xs';

// --- FECHA DE SALIDA ---
const DEPARTURE_DATE = '2025-12-04T04:30:00'; 

// --- DATOS DEL ITINERARIO ACTUALIZADOS ---
const TRIP_ITINERARY = [
    { time: "04:10 AM", title: "Cita de Encuentro", icon: Users, desc: "Favor de estar 20 minutos antes de la salida.", location: "Estacionamiento Farmacias GDL (Frente a CUCSur)" },
    { time: "04:30 AM", title: "Salida de Autlán", icon: Bus, desc: "Salida puntual del autobús.", location: "Autlán de Navarro" },
    { time: "07:00 AM", title: "Refrigerio", icon: Coffee, desc: "Breve parada para alimentos/baño.", location: "Tecolotlán" },
    { time: "09:00 AM", title: "Llegada a GDL", icon: MapPin, desc: "Arribo a la zona de la Expo.", location: "Expo Guadalajara" },
    { time: "09:15 AM", title: "Entrada a FIL", icon: Ticket, desc: "Ingreso al recinto ferial.", location: "FIL Guadalajara" },
    { time: "13:00 PM", title: "Salida de FIL", icon: LogOut, desc: "Reunión para abordar el autobús.", location: "Punto de Encuentro FIL" },
    { time: "13:30 PM", title: "Llegada a Plaza", icon: ShoppingBag, desc: "Tiempo para comer y pasear.", location: "Plaza La Perla" },
    { time: "16:30 PM", title: "Opción: Plaza Galerías", icon: Milestone, desc: "Visita a Galerías Santa Anita (A consideración de tiempo de todos).", location: "Santa Anita" },
    { time: "18:30 PM", title: "Encuentro Regreso", icon: Users, desc: "Reunión final para lista de asistencia.", location: "Punto de Reunión Acordado" },
    { time: "19:00 PM", title: "Regreso a Autlán", icon: RotateCcw, desc: "Salida de regreso a casa.", location: "Rumbo a CUCSur" }
];

// --- COMPONENTE DE CONFETI ---
const Confetti = () => {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 5 + Math.random() * 10,
      rotation: Math.random() * 360,
      duration: 1 + Math.random() * 2,
      delay: Math.random() * 0.5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((p) => (
        <div key={p.id} className="absolute animate-fall" style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, backgroundColor: p.color, transform: `rotate(${p.rotation}deg)`, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`, animationName: 'fall' }} />
      ))}
      <style>{`@keyframes fall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } } .animate-fall { animation-timing-function: linear; animation-fill-mode: forwards; }`}</style>
    </div>
  );
};

// --- COMPONENTE CUENTA REGRESIVA ---
const Countdown = ({ onComplete }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(DEPARTURE_DATE) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        seg: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const tl = calculateTimeLeft();
      setTimeLeft(tl);
      const difference = +new Date(DEPARTURE_DATE) - +new Date();
      if (difference <= 0 && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          if (onComplete) onComplete();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [onComplete]);

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    timerComponents.push(
      <div key={interval} className="flex flex-col items-center mx-1 md:mx-3">
        <span className="text-xl md:text-3xl font-black tabular-nums tracking-tight leading-none">{timeLeft[interval] !== undefined ? timeLeft[interval].toString().padStart(2, '0') : '00'}</span>
        <span className="text-[8px] md:text-[10px] uppercase font-bold text-white/60 tracking-wider mt-1">{interval}</span>
      </div>
    );
  });

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl py-3 px-4 md:px-8 shadow-inner animate-in fade-in zoom-in duration-700">
        <div className="flex items-center gap-2 mb-2 md:mb-0 md:mr-4 md:flex-col md:items-start md:gap-0">
            <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full w-fit animate-pulse">PRÓXIMA SALIDA</div>
            <div className="text-xs font-medium text-white/80 flex items-center gap-1"><Clock size={12}/> 4:30 AM</div>
        </div>
        <div className="flex divide-x divide-white/10">
            {timerComponents.length ? timerComponents : <span className="font-bold text-xl animate-bounce">¡ES HOY! 🚌💨</span>}
        </div>
    </div>
  );
};

// --- LISTAS OFICIALES ---
const OFFICIAL_LIST_C1 = [ { name: "Joseph Yancarlo Avalos Canales", phone: "3171325247", code: "225519213", amount: 480, nss: "5251056577", parent: "Lenis Alejandra Canales Castro", parentPhone: "3171048798" }, { name: "Daira Athziri Saldaña Dávila", phone: "3171284644", code: "225521072", amount: 480, nss: "4927321887", parent: "María Luisa Dávila Muñoz", parentPhone: "3171146753" }, /* ... */ ]; 
const OFFICIAL_LIST_C2 = [ { name: "Ian Raphael Aguilar Gonzales", phone: "3171281276", code: "1A matutino", amount: 480, nss: "4047901592", parent: "Antonia González franco", parentPhone: "3173836225" }, /* ... */ ];
const OFFICIAL_LIST_C3 = [ { name: "Akeimy Yeraldi Mancilla Isidro", phone: "3171067689", amount: 480, code: "225519169", nss: "26251059940", parent: "Martha Angélica Isidro Medina", parentPhone: "3173877188" }, /* ... */ ];

// --- CONSTANTE ANIMACIÓN ---
const ANIMATION_DURATION = 300;

const App = () => {
  // --- BUSES DATA ---
  const BUSES = useMemo(() => [
    { id: 1, label: "Camión 1", color: "from-orange-500 to-orange-700", text: "text-orange-600", bg: "bg-orange-100", primary: "orange", coordinator: { name: "Samuel Méndez Vidrio", phone: "3125950081" }, list: OFFICIAL_LIST_C1 }, 
    { id: 2, label: "Camión 2", color: "from-green-500 to-yellow-600", text: "text-green-700", bg: "bg-green-100", primary: "green", coordinator: { name: "Aylin R. Ramos Mejía", phone: "3171282184" }, list: OFFICIAL_LIST_C2 },
    { id: 3, label: "Camión 3", color: "from-red-500 to-pink-600", text: "text-red-700", bg: "bg-red-100", primary: "red", coordinator: { name: "Iker S Soltero Rodríguez", phone: "3171041444" }, list: OFFICIAL_LIST_C3 }
  ], []);

  // --- LEGS ---
  const legs = useMemo(() => [
    { id: 0, label: "Salida Autlán", sub: "→ FIL", Icon: Bus, short: "Ida" },
    { id: 1, label: "Salida FIL", sub: "→ Plaza", Icon: MapPin, short: "Inter" },
    { id: 2, label: "Regreso Plaza", sub: "→ Autlán", Icon: RotateCcw, short: "Regreso" }
  ], []);

  useEffect(() => { document.title = "Unión Estudiantil - FIL 2025"; }, []);

  // --- AUTH & STATE ---
  const [currentUser, setCurrentUser] = useState(() => localStorage.getItem('fil2025_user') || null);
  const [userBusAccess, setUserBusAccess] = useState(() => { const stored = localStorage.getItem('fil2025_bus_access'); return stored ? parseInt(stored) : null; });
  const isCoordinator = !!currentUser;

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTargetId, setAuthTargetId] = useState(null);
  const [authCodeInput, setAuthCodeInput] = useState('');
  const [authPhoneInput, setAuthPhoneInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const [documentToDelete, setDocumentToDelete] = useState(null); 
  const [currentBus, setCurrentBus] = useState(1);
  const [mapListMode, setMapListMode] = useState('unassigned'); 
  
  const [exitingModal, setExitingModal] = useState(null); 
  const [showLoader, setShowLoader] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  // --- NEW: ITINERARY MODAL STATE ---
  const [showItinerary, setShowItinerary] = useState(false);

  useEffect(() => { if (isCoordinator && userBusAccess) setCurrentBus(userBusAccess); }, [isCoordinator, userBusAccess]);
  
  const closeAnimated = (modalName, setShowState) => {
      setExitingModal(modalName);
      setTimeout(() => { setShowState(false); setExitingModal(null); }, ANIMATION_DURATION);
  };

  const triggerConfetti = () => { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 5000); };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: '', phone: '', code: '', amount: 0, nss: '', parent: '', parent_phone: '' });

  // --- LOGIN HANDLER ---
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true); 
    setLoginError('');
    setTimeout(() => {
        let name = ''; let accessLevel = null; let valid = false;
        if (loginUser === '223440784' && loginPass === 'samumv367') { name = "Samuel M."; accessLevel = 1; valid = true; }
        else if (loginUser === '221430749' && loginPass === 'Prinsess123') { name = "Aylin R."; accessLevel = 2; valid = true; }
        else if (loginUser === '221003476' && loginPass === 'Iker0202') { name = "Iker S."; accessLevel = 3; valid = true; }
        else if (loginUser.toLowerCase() === 'francisco' && loginPass === 'fil2025') { name = "Francisco P."; accessLevel = 1; valid = true; }

        if (valid) {
            setCurrentUser(name); setUserBusAccess(accessLevel);
            localStorage.setItem('fil2025_user', name); localStorage.setItem('fil2025_bus_access', accessLevel);
            closeAnimated('login', setShowLoginModal); setLoginError(''); setLoginUser(''); setLoginPass('');
            setCurrentBus(accessLevel); showNotification(`Bienvenido, ${name}. Acceso al Camión ${accessLevel}`);
            setTimeout(() => setIsLoggingIn(false), ANIMATION_DURATION);
        } else { setLoginError('Credenciales incorrectas'); setIsLoggingIn(false); }
    }, 800);
  };

  const handleLogout = () => { setCurrentUser(null); setUserBusAccess(null); localStorage.removeItem('fil2025_user'); localStorage.removeItem('fil2025_bus_access'); };
  const triggerLogin = () => { setShowLoginModal(true); setLoginError(''); };
  const canEdit = (targetBusId) => { if (!isCoordinator) return false; if (userBusAccess && userBusAccess !== (targetBusId || 1)) return false; return true; };
  const verifyPermissionAction = (targetBusId) => { if (!canEdit(targetBusId)) { showNotification(`Solo tienes permiso para editar el Camión ${userBusAccess}`, 'error'); return false; } return true; };

  // --- SUPABASE ---
  const [supabase, setSupabase] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // UI FILTER STATES
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
  const [sortMode, setSortMode] = useState('original');
  const [showBusMap, setShowBusMap] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seatSearchTerm, setSeatSearchTerm] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

  useEffect(() => { if (!loading) { const timer = setTimeout(() => { setShowLoader(false); }, ANIMATION_DURATION); return () => clearTimeout(timer); } }, [loading]);

  const parseDocuments = (letterUrl) => {
      if (!letterUrl) return [];
      try { const docs = typeof letterUrl === 'string' ? JSON.parse(letterUrl) : letterUrl; return Array.isArray(docs) ? docs : []; } 
      catch (e) { return typeof letterUrl === 'string' && letterUrl.startsWith('http') ? [{ name: 'Documento Antiguo', url: letterUrl, legacy: true }] : []; }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    script.async = true;
    script.onload = () => { if (window.supabase) { const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); setSupabase(client); } };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    fetchPassengers();
    const channel = supabase.channel('table-db-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'passengers' }, (payload) => {
        let updatedPassenger = payload.new;
        if (updatedPassenger && updatedPassenger.letter_url !== undefined) { updatedPassenger.documents = parseDocuments(updatedPassenger.letter_url); }
        if (payload.eventType === 'INSERT') { setPassengers((prev) => [...prev, updatedPassenger]); } 
        else if (payload.eventType === 'DELETE') { setPassengers((prev) => prev.filter((p) => p.id !== payload.old.id)); } 
        else if (payload.eventType === 'UPDATE') {
            const localSeats = JSON.parse(localStorage.getItem('fil2025_local_seats') || '{}');
            if (updatedPassenger.seat_number === null && localSeats[updatedPassenger.id]) { updatedPassenger.seat_number = localSeats[updatedPassenger.id]; }
            setPassengers((prev) => prev.map((p) => (p.id === payload.new.id ? updatedPassenger : p)));
        }
    }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [supabase]);

  const fetchPassengers = async () => {
    if (!supabase) return;
    const { data, error } = await supabase.from('passengers').select('*').order('id', { ascending: true });
    if (!error) {
      const localSeats = JSON.parse(localStorage.getItem('fil2025_local_seats') || '{}');
      setPassengers(data.map(p => ({ ...p, seat_number: p.seat_number !== null ? p.seat_number : (localSeats[p.id] || null), documents: parseDocuments(p.letter_url) })));
    }
    setLoading(false);
  };

  // --- ACTIONS ---
  const showNotification = (message, type = 'success') => { setNotification({ message, type, visible: true }); setTimeout(() => { setNotification(prev => ({ ...prev, visible: false })); }, 3000); };
  const saveLocalSeat = (passengerId, seatNum) => { const localSeats = JSON.parse(localStorage.getItem('fil2025_local_seats') || '{}'); if (seatNum === null) delete localSeats[passengerId]; else localSeats[passengerId] = seatNum; localStorage.setItem('fil2025_local_seats', JSON.stringify(localSeats)); };
  
  const addPassenger = async (e) => { e.preventDefault(); if (!isCoordinator) { triggerLogin(); return; } if (!verifyPermissionAction(currentBus)) return; if (!supabase) return; if (!newName.trim()) { showNotification("El nombre del pasajero es obligatorio.", "error"); return; } const newPassenger = { name: newName.trim(), phone: newPhone.trim() || 'N/A', code: newCode.trim() || 'N/A', amount: newAmount ? parseFloat(newAmount) : 0, nss: newNss.trim() || 'N/A', parent: newParent.trim() || 'N/A', parent_phone: newParentPhone.trim() || 'N/A', checks: [false, false, false], times: [null, null, null], letter_url: JSON.stringify([]), ticket_released: false, bus_id: currentBus }; const { error } = await supabase.from('passengers').insert([newPassenger]); if (!error) showNotification(`Pasajero agregado al Camión ${currentBus}`); setNewName(''); setNewPhone(''); setNewCode(''); setNewAmount(''); setNewNss(''); setNewParent(''); setNewParentPhone(''); closeAnimated('add_form', setShowAddForm); };
  const handleCancelAdd = () => { setNewName(''); setNewPhone(''); setNewCode(''); setNewAmount(''); setNewNss(''); setNewParent(''); setNewParentPhone(''); closeAnimated('add_form', setShowAddForm); };
  const removePassenger = async (id) => { if (!isCoordinator) { triggerLogin(); return; } const passenger = passengers.find(p => p.id === id); if (!passenger || !verifyPermissionAction(passenger.bus_id || 1)) return; if (!supabase) return; if (window.confirm('¿Seguro que quieres eliminar a esta persona?')) { await supabase.from('passengers').delete().eq('id', id); showNotification("Pasajero eliminado", "error"); closeAnimated('edit', setShowEditModal); } };
  const handleEditClick = (passenger) => { if (!isCoordinator) { showNotification("Acceso denegado. Solo coordinadores.", "error"); return; } if (!canEdit(passenger.bus_id)) { showNotification(`Solo tienes permiso para editar el Camión ${userBusAccess}`, 'error'); } setEditFormData({ ...passenger, letter_url: JSON.stringify(passenger.documents || []) }); setShowEditModal(true); };
  const handleEditChange = (e) => { const { name, value } = e.target; setEditFormData({ ...editFormData, [name]: name === 'amount' ? parseFloat(value) || 0 : value }); };
  const handleSaveEdit = async () => { if (!supabase) return; const targetBus = editFormData.bus_id || 1; if (!verifyPermissionAction(targetBus)) return; const { id, seat_number, documents, ...dataToUpdate } = editFormData; await supabase.from('passengers').update(dataToUpdate).eq('id', id); showNotification("Información actualizada"); closeAnimated('edit', setShowEditModal); };
  const handleLocalAmountChange = (id, newVal) => { setPassengers(prev => prev.map(p => p.id === id ? { ...p, amount: newVal } : p)); };
  const handleAmountBlur = async (id, newVal) => { if (!supabase) return; const passenger = passengers.find(p => p.id === id); if (!passenger) return; if (!verifyPermissionAction(passenger.bus_id || 1)) { fetchPassengers(); return; } const amount = parseFloat(newVal) || 0; await supabase.from('passengers').update({ amount }).eq('id', id); showNotification(`Pago actualizado: $${amount}`); };
  const toggleCheck = async (id, legIndex) => { if (!isCoordinator) { triggerLogin(); return; } if (!supabase) return; const passenger = passengers.find(p => p.id === id); if (!passenger) return; if (!verifyPermissionAction(passenger.bus_id || 1)) return; const isChecking = !passenger.checks[legIndex]; const newChecks = [...passenger.checks]; newChecks[legIndex] = isChecking; const newTimes = [...(passenger.times || [null, null, null])]; if (isChecking) { const now = new Date(); newTimes[legIndex] = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }); } else { newTimes[legIndex] = null; } await supabase.from('passengers').update({ checks: newChecks, times: newTimes }).eq('id', id); };
  
  const handleUploadLetter = async (e, passengerId) => { const files = e.target.files; if (!files || files.length === 0 || !supabase) return; if (files.length > 5) { showNotification("Límite de 5 archivos por carga.", "error"); return; } setLoading(true); const passenger = passengers.find(p => p.id === passengerId); if (!passenger) { setLoading(false); return; } let currentDocuments = passenger.documents || []; const filesToUpload = Array.from(files); let uploadedDocuments = []; for (const file of filesToUpload) { if (!file.type.match('image.*|application/pdf')) { showNotification(`Archivo ${file.name} no es una imagen o PDF.`, "error"); continue; } const fileExt = file.name.split('.').pop(); const fileName = `${passengerId}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}.${fileExt}`; const filePath = `${fileName}`; const { error: uploadError } = await supabase.storage.from('letters').upload(filePath, file); if (uploadError) { console.error(uploadError); showNotification(`Error al subir ${file.name}: ${uploadError.message}`, "error"); continue; } const { data: { publicUrl } } = supabase.storage.from('letters').getPublicUrl(filePath); uploadedDocuments.push({ name: file.name, url: publicUrl, timestamp: new Date().toISOString() }); } const newDocuments = [...currentDocuments, ...uploadedDocuments]; const newDocumentsJson = JSON.stringify(newDocuments); const { error: dbError } = await supabase.from('passengers').update({ letter_url: newDocumentsJson }).eq('id', passengerId); if (dbError) { console.error(dbError); showNotification("Error guardando enlaces en base de datos", "error"); } else { setPassengers(prev => prev.map(p => (p.id === passengerId ? { ...p, documents: newDocuments } : p))); showNotification(`${uploadedDocuments.length} documento(s) subido(s) correctamente`); } setLoading(false); };
  const confirmDeleteDocument = async () => { const docInfo = documentToDelete; if (!docInfo || !supabase) return; closeAnimated('delete', () => setDocumentToDelete(null)); const passenger = passengers.find(p => p.id === docInfo.passengerId); if (!passenger || !verifyPermissionAction(passenger.bus_id || 1)) return; const newDocuments = (passenger.documents || []).filter(doc => doc.url !== docInfo.docUrl); const newDocumentsJson = JSON.stringify(newDocuments); const { error: dbError } = await supabase.from('passengers').update({ letter_url: newDocumentsJson, ticket_released: newDocuments.length > 0 ? passenger.ticket_released : false }).eq('id', docInfo.passengerId); if(dbError) { showNotification("Error al eliminar referencia del documento", "error"); fetchPassengers(); } else { showNotification(`Documento "${docInfo.docName}" eliminado`, "error"); } };
  const toggleTicketRelease = async (passengerId, currentStatus) => { if(!isCoordinator) return; if (!supabase) return; const passenger = passengers.find(p => p.id === passengerId); if (!passenger) return; if (!verifyPermissionAction(passenger.bus_id || 1)) return; if (!currentStatus && (!passenger.documents || passenger.documents.length === 0)) { showNotification("¡No puedes liberar el boleto! No hay documentos subidos.", "error"); return; } const { error } = await supabase.from('passengers').update({ ticket_released: !currentStatus }).eq('id', passengerId); if(!error) { if (!currentStatus) triggerConfetti(); showNotification(!currentStatus ? "Boleto LIBERADO" : "Boleto BLOQUEADO"); } };
  
  const openTicketModal = (passenger) => { setTicketData(passenger); setShowTicketModal(true); };
  const handleVerifyIdentity = (e) => { e.preventDefault(); setIsVerifying(true); setAuthError(''); setTimeout(() => { const target = passengers.find(p => p.id === authTargetId); if (!target) { setIsVerifying(false); return; } const hasCode = target.code && target.code !== 'N/A' && target.code !== 'Pendiente'; let isValid = false; const phoneInputClean = authPhoneInput.replace(/\D/g, ''); const targetPhoneClean = (target.phone || '').replace(/\D/g, ''); if (hasCode) { const codeMatch = authCodeInput.trim().toLowerCase() === target.code.trim().toLowerCase(); const phoneMatch = phoneInputClean.length > 6 && phoneInputClean === targetPhoneClean; if (codeMatch && phoneMatch) isValid = true; else { setAuthError("Datos Incorrectos"); setIsVerifying(false); return; } } else { if (phoneInputClean.length > 6 && phoneInputClean === targetPhoneClean) isValid = true; else { setAuthError("Datos Incorrectos"); setIsVerifying(false); return; } } if (isValid) { closeAnimated('auth', setShowAuthModal); triggerConfetti(); setTicketData(target); setShowTicketModal(true); showNotification(`¡Bienvenido ${target.name.split(' ')[0]}!`); setAuthCodeInput(''); setAuthPhoneInput(''); setAuthError(''); setTimeout(() => setIsVerifying(false), ANIMATION_DURATION); } else { setAuthError("Datos Incorrectos"); setIsVerifying(false); } }, 800); };
  const openAuthModal = (id) => { setAuthTargetId(id); setAuthCodeInput(''); setAuthPhoneInput(''); setAuthError(''); setShowAuthModal(true); };
  const handleSeatClick = (seatNum) => { const occupant = passengers.find(p => (p.bus_id || 1) === currentBus && p.seat_number === seatNum); if (!occupant && !isCoordinator) { showNotification("Solo coordinadores pueden asignar asientos", "error"); triggerLogin(); return; } if (!occupant && !canEdit(currentBus)) { showNotification(`Solo el encargado del Camión ${currentBus} puede asignar.`, 'error'); return; } setSelectedSeat(seatNum); setSeatSearchTerm(''); };
  const assignSeat = async (passengerId, seatNum) => { if (!supabase) return; if (!isCoordinator) return; if (!verifyPermissionAction(currentBus)) return; const previousPassengers = [...passengers]; setPassengers(prev => { return prev.map(p => { if ((p.bus_id || 1) !== currentBus) return p; if (p.seat_number == seatNum) return { ...p, seat_number: null }; if (p.id === passengerId) return { ...p, seat_number: seatNum }; return p; }); }); try { const taken = previousPassengers.find(p => (p.bus_id || 1) === currentBus && p.seat_number == seatNum); if (taken) { const { error: errorClear } = await supabase.from('passengers').update({ seat_number: null }).eq('id', taken.id); if (errorClear) throw errorClear; } const { error: errorAssign } = await supabase.from('passengers').update({ seat_number: seatNum }).eq('id', passengerId); if (errorAssign) throw errorAssign; showNotification(`Asiento ${seatNum} asignado (C${currentBus})`); } catch (error) { console.warn("Fallo guardado en nube, guardando localmente...", error); const taken = previousPassengers.find(p => (p.bus_id || 1) === currentBus && p.seat_number == seatNum); if(taken) saveLocalSeat(taken.id, null); saveLocalSeat(passengerId, seatNum); showNotification(`Asiento ${seatNum} guardado localmente`, 'success'); } setSelectedSeat(null); setSeatSearchTerm(''); };
  const releaseSeat = async (passengerId) => { if (!supabase) return; if (!isCoordinator) return; if (!verifyPermissionAction(currentBus)) return; setPassengers(prev => prev.map(p => p.id === passengerId ? { ...p, seat_number: null } : p)); try { const { error } = await supabase.from('passengers').update({ seat_number: null }).eq('id', passengerId); if (error) throw error; showNotification("Asiento liberado (Nube)"); } catch(error) { saveLocalSeat(passengerId, null); showNotification("Asiento liberado (Local)", 'success'); } setSelectedSeat(null); };
  const handleRestoreList = async () => { if(!isCoordinator) { triggerLogin(); return; } const busToRestore = currentBus; if(!verifyPermissionAction(busToRestore)) return; if (!supabase) return; if(!window.confirm(`¿ESTÁS SEGURO? Esto subirá la lista oficial del Camión ${busToRestore} a la base de datos.`)) return; const busConfig = BUSES.find(b => b.id === busToRestore); if (!busConfig || busConfig.list.length === 0) { showNotification(`No hay lista oficial definida para el Camión ${busToRestore}`, 'error'); return; } setUploading(true); const records = busConfig.list.map(p => ({ name: p.name, phone: p.phone, code: p.code, amount: p.amount, nss: p.nss || 'N/A', parent: p.parent || 'N/A', parent_phone: p.parentPhone || 'N/A', checks: [false, false, false], times: [null, null, null], letter_url: JSON.stringify([]), ticket_released: false, bus_id: busToRestore })); const { error } = await supabase.from('passengers').insert(records); if (error) { showNotification("Error al restaurar lista: " + error.message, "error"); } else { showNotification("¡Lista restaurada con éxito!", 'success'); fetchPassengers(); } setUploading(false); };
  const addCoordinatorIfMissing = async () => { if (!supabase || !isCoordinator) return; const targetBus = userBusAccess || 1; const meName = currentUser === "Samuel M." ? "Samuel Méndez Vidrio" : (currentUser === "Aylin R." ? "Aylin R. Ramos Mejía" : "Iker S Soltero Rodríguez"); const exists = passengers.find(p => p.name === meName && (p.bus_id || 1) === targetBus); if (!exists) { if(window.confirm(`Tu usuario (${meName}) no está en la lista del Camión ${targetBus}. ¿Quieres agregarte?`)) { const newPassenger = { name: meName, phone: "N/A", code: "ADMIN", amount: 480, nss: "N/A", parent: "N/A", parent_phone: "N/A", checks: [false, false, false], times: [null, null, null], seat_number: null, letter_url: JSON.stringify([]), ticket_released: false, bus_id: targetBus }; const { error } = await supabase.from('passengers').insert([newPassenger]); if (!error) showNotification("Te has agregado a la lista correctamente"); } } else { showNotification(`Ya estás en la lista del C${targetBus}.`); } };

  // ... sorting and formatting helpers remain the same ...
  const getSurname = (fullName) => { if (!fullName) return ''; const parts = fullName.trim().split(/\s+/); const len = parts.length; if (len <= 2) return parts[len - 1] || ''; return parts[len - 2]; };
  const formatDisplayName = (name) => { if (sortMode !== 'lastname') return name; if (!name) return ''; const parts = name.trim().split(/\s+/); const len = parts.length; if (len <= 2) { if (len === 2) return `${parts[1]} ${parts[0]}`; return name; } const surnames = parts.slice(len - 2).join(' '); const names = parts.slice(0, len - 2).join(' '); return `${surnames} ${names}`; };
  const cycleSortMode = () => { if (sortMode === 'original') setSortMode('alpha'); else if (sortMode === 'alpha') setSortMode('lastname'); else setSortMode('original'); };
  const getSortLabel = () => { if (sortMode === 'alpha') return 'A-Z (Nombre)'; if (sortMode === 'lastname') return 'A-Z (Apellido)'; return 'Original'; };
  const getFirstName = (name) => { const parts = name.trim().split(/\s+/); return parts[0]; };
  const currentBusInfo = BUSES.find(b => b.id === currentBus);
  const currentBusColorClass = currentBusInfo ? currentBusInfo.color : "from-gray-500 to-gray-600";
  const getPrimaryButtonClass = (busId) => { const bus = BUSES.find(b => b.id === busId); const baseColor = bus && bus.primary ? bus.primary : 'indigo'; return `bg-${baseColor}-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-${baseColor}-700 transition-colors shadow-lg shadow-${baseColor}-500/30 active:scale-95`; };
  const currentBusPassengers = passengers.filter(p => (p.bus_id || 1) === currentBus);
  const filteredPassengers = currentBusPassengers.filter(p => { const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || (p.code && p.code.includes(searchTerm)); let matchesFilter = true; if (filterLeg === 'pending') { matchesFilter = (p.documents && p.documents.length > 0) && !p.ticket_released; } else if (filterLeg === 'reviewed') { matchesFilter = (p.documents && p.documents.length > 0) && p.ticket_released; } else if (filterLeg === 'seated') { matchesFilter = p.seat_number !== null; } else if (filterLeg === 'no_docs') { matchesFilter = (!p.documents || p.documents.length === 0); } else if (filterLeg !== null) { matchesFilter = !p.checks[filterLeg]; } return matchesSearch && matchesFilter; }).sort((a, b) => { if (sortMode === 'original') return a.id - b.id; if (sortMode === 'alpha') return a.name.localeCompare(b.name); if (sortMode === 'lastname') { const surnameA = getSurname(a.name); const surnameB = getSurname(b.name); return surnameA.localeCompare(surnameB); } return 0; });
  const getStats = (legIndex) => { const count = currentBusPassengers.filter(p => p.checks && p.checks[legIndex]).length; const total = currentBusPassengers.length; return { count, total, percent: total === 0 ? 0 : (count / total) * 100 }; };
  const totalPaidFull = currentBusPassengers.filter(p => p.amount >= 480).length; const totalAdvance = currentBusPassengers.filter(p => p.amount > 0 && p.amount < 480).length; const totalPending = currentBusPassengers.filter(p => p.amount === 0).length; const totalMoney = currentBusPassengers.reduce((sum, p) => sum + (p.amount || 0), 0);
  const countPendingCards = currentBusPassengers.filter(p => p.documents && p.documents.length > 0 && !p.ticket_released).length; const countReviewedCards = currentBusPassengers.filter(p => p.documents && p.documents.length > 0 && p.ticket_released).length; const countSeated = currentBusPassengers.filter(p => p.seat_number).length; const countNoDocs = currentBusPassengers.filter(p => !p.documents || p.documents.length === 0).length;
  const getAnimationClasses = (modalName) => { const baseClass = "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out"; if (exitingModal === modalName) { return `${baseClass} animate-leave`; } return `${baseClass} animate-enter`; };

  const exportToCSV = () => {
    if (!isCoordinator) { triggerLogin(); return; }
    
    // Helper para escapar comas y comillas para CSV válido
    const escapeCsv = (val) => {
        if (val === null || val === undefined) return 'N/A';
        const str = String(val);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };

    const headers = ["Camion", "Nombre", "Monto", "Teléfono", "Código", "NSS", "Tutor", "Tel. Tutor", "Asiento", "Documentos URL", "Boleto Liberado", "Autlan->FIL (Hora)", "FIL->Plaza (Hora)", "Plaza->Autlan (Hora)"];
    
    const rows = passengers
        .sort((a,b) => (a.bus_id||1) - (b.bus_id||1))
        .map(p => {
            const c1 = p.checks?.[0] ? `SI (${p.times?.[0] || ''})` : 'NO';
            const c2 = p.checks?.[1] ? `SI (${p.times?.[1] || ''})` : 'NO';
            const c3 = p.checks?.[2] ? `SI (${p.times?.[2] || ''})` : 'NO';
            const docUrls = (p.documents || []).map(d => d.url).join(' | '); 

            return [
                `C${p.bus_id||1}`,
                escapeCsv(p.name),
                p.amount || 0,
                escapeCsv(p.phone),
                escapeCsv(p.code),
                escapeCsv(p.nss),
                escapeCsv(p.parent),
                escapeCsv(p.parent_phone),
                escapeCsv(p.seat_number),
                escapeCsv(docUrls),
                p.ticket_released ? 'SI' : 'NO',
                escapeCsv(c1),
                escapeCsv(c2),
                escapeCsv(c3)
            ].join(',');
        });

    const csvContent = [headers.join(','), ...rows].join('\n');
    
    // Usar Blob con BOM para UTF-8 (importante para acentos en Excel)
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "asistencia_fil_2025_completo.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-24 text-gray-800 overflow-x-hidden w-full max-w-[100vw]">
      <style>{`@keyframes enter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } @keyframes leave { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.95); } } .animate-enter { animation: enter 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; } .animate-leave { animation: leave 0.3s ease-in forwards; }`}</style>

      {/* --- LOADER OVERLAY --- */}
      {showLoader && (
        <div className={`fixed inset-0 z-[100] bg-orange-50 flex flex-col items-center justify-center w-screen h-screen overflow-hidden ${!loading ? 'animate-leave' : ''}`}>
            <div className="relative mb-6">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-orange-200 border-t-orange-600 shadow-xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Bus size={24} className="text-orange-500/50" />
                </div>
            </div>
            <div className="text-center animate-in fade-in zoom-in duration-500 px-6">
                <h2 className="text-3xl font-black text-orange-600 mb-1 tracking-tighter">UNIÓN ESTUDIANTIL</h2>
                <p className="text-orange-400 font-bold text-xs uppercase tracking-[0.3em] animate-pulse">Cargando Sistema...</p>
            </div>
        </div>
      )}

      {showConfetti && <Confetti />}
      
      {/* NOTIFICATION TOAST */}
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 ease-in-out ${notification.visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl border ${notification.type === 'error' ? 'bg-white border-red-200 text-red-600' : 'bg-white border-green-200 text-green-700'}`}>
            {notification.type === 'error' ? <ShieldAlert size={20}/> : <Check size={20} className="bg-green-100 p-0.5 rounded-full"/>}
            <span className="font-bold text-sm">{notification.message}</span>
        </div>
      </div>

      {/* --- ITINERARY MODAL (NUEVO) --- */}
      {(showItinerary || exitingModal === 'itinerary') && (
        <div className={getAnimationClasses('itinerary')}>
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-orange-100 relative flex flex-col overflow-hidden max-h-[90vh]">
                <div className={`p-6 ${currentBusColorClass} bg-gradient-to-r text-white`}>
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-black flex items-center gap-2"><Calendar size={24}/> Itinerario de Viaje</h3>
                        <button onClick={() => closeAnimated('itinerary', setShowItinerary)} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"><X size={20}/></button>
                    </div>
                    <p className="text-sm font-medium opacity-90 mt-1">Cronograma oficial para el Jueves 4 de Diciembre.</p>
                </div>
                
                <div className="p-6 overflow-y-auto bg-gray-50">
                    <div className="space-y-0 relative">
                        {/* Vertical line */}
                        <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gray-200"></div>

                        {TRIP_ITINERARY.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div key={idx} className="relative flex gap-6 mb-8 last:mb-0 group">
                                    <div className={`w-16 flex-shrink-0 flex flex-col items-end text-right ${idx === 0 ? 'text-orange-600' : 'text-gray-500'}`}>
                                        <span className="text-xs font-black">{item.time.split(' ')[0]}</span>
                                        <span className="text-[10px] font-bold uppercase opacity-60">{item.time.split(' ')[1]}</span>
                                    </div>
                                    
                                    <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${idx === 0 ? 'bg-orange-500 text-white' : 'bg-white text-gray-400 border-2 border-gray-100'}`}>
                                        <Icon size={20} strokeWidth={idx === 0 ? 3 : 2} />
                                    </div>
                                    
                                    <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group-hover:border-orange-200 transition-colors">
                                        <h4 className={`text-sm font-bold ${idx === 0 ? 'text-gray-800' : 'text-gray-700'}`}>{item.title}</h4>
                                        <div className="flex items-start gap-1.5 mt-1 text-xs text-gray-500">
                                            <MapPin size={12} className="mt-0.5 flex-shrink-0 text-orange-400"/> 
                                            <span className="font-medium">{item.location}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="p-4 bg-white border-t border-gray-100 text-center text-[10px] text-gray-400">
                    * Los horarios son aproximados y pueden variar por tráfico o logística.
                </div>
            </div>
        </div>
      )}

      {/* ... (MODALS: Delete, Auth, Login - same as before, using closeAnimated) ... */}
      {(documentToDelete || exitingModal === 'delete') && (
        <div className={getAnimationClasses('delete')}>
           <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-red-100 text-center">
               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500"><Trash2 size={32}/></div>
               <h3 className="text-xl font-bold text-gray-800 mb-2">¿Eliminar documento?</h3>
               <p className="text-sm text-gray-500 mb-3 font-bold truncate">"{documentToDelete?.docName || '...'} "</p>
               <div className="flex gap-3"><button onClick={() => closeAnimated('delete', () => setDocumentToDelete(null))} className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200">Cancelar</button><button onClick={confirmDeleteDocument} className="flex-1 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30">Sí, eliminar</button></div>
           </div>
        </div>
      )}

      {(showAuthModal || exitingModal === 'auth') && (
        <div className={getAnimationClasses('auth')}>
           <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-orange-100 relative overflow-hidden">
                <button onClick={() => closeAnimated('auth', setShowAuthModal)} className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 p-2 rounded-full text-white z-10"><X size={20}/></button>
                <div className={`bg-gradient-to-r ${currentBusColorClass} p-8 text-white text-center relative shadow-lg`}>
                    <div className="w-16 h-16 bg-white/20 border-2 border-white/50 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm shadow-xl"><ShieldAlert size={32} className="text-white drop-shadow-md" /></div>
                    <h3 className="text-2xl font-black tracking-wider drop-shadow-md">Verifica tu Identidad</h3>
                </div>
               <div className="p-6">
                   {authError && <div className="mb-4 p-3 bg-red-50 text-red-500 border border-red-100 rounded-xl font-bold text-sm flex items-center justify-center gap-2"><AlertTriangle size={16}/> {authError}</div>}
                   {(() => { const target = passengers.find(p => p.id === authTargetId); const hasCode = target && target.code && target.code !== 'N/A' && target.code !== 'Pendiente'; return ( <> {target && (<div className="text-center mb-6"><p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pasajero</p><h4 className="text-xl font-extrabold text-gray-800 leading-tight">{target.name}</h4></div>)} <p className="text-sm text-gray-500 mb-6 text-center">{hasCode ? "Por seguridad, ingresa tu Código de Estudiante y el Teléfono registrado." : "Ingresa el Número de Teléfono registrado para continuar."}</p> <form onSubmit={handleVerifyIdentity} className="space-y-4"> {hasCode && (<div><label className="text-xs font-bold text-gray-500 ml-1 flex items-center gap-1"><GraduationCap size={12}/> CÓDIGO DE ESTUDIANTE</label><input type="text" placeholder="Ingresa tu código" value={authCodeInput} onChange={(e) => { setAuthCodeInput(e.target.value); if(authError) setAuthError(''); }} className={`w-full p-4 bg-gray-50 border rounded-xl text-left font-bold text-lg focus:ring-2 focus:ring-orange-500 outline-none ${authError ? 'border-red-200 bg-red-50' : 'border-gray-200'}`} autoFocus /></div>)} <div><label className="text-xs font-bold text-gray-500 ml-1 flex items-center gap-1"><Phone size={12}/> TELÉFONO REGISTRADO</label><input type="tel" placeholder="Ej. 3171234567" value={authPhoneInput} onChange={(e) => { setAuthPhoneInput(e.target.value); if(authError) setAuthError(''); }} className={`w-full p-4 bg-gray-50 border rounded-xl text-left font-bold text-lg focus:ring-2 focus:ring-orange-500 outline-none ${authError ? 'border-red-200 bg-red-50' : 'border-gray-200'}`} autoFocus={!hasCode} /></div> <button type="submit" disabled={isVerifying} className={`w-full py-3 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 active:scale-95 flex items-center justify-center gap-2 ${isVerifying ? 'opacity-80 cursor-not-allowed' : ''}`}>{isVerifying ? <Loader2 size={20} className="animate-spin" /> : <><Ticket size={20}/> ¡Ver mi Boleto!</>}</button> </form> </> ); })()}
               </div>
           </div>
        </div>
      )}

      {/* TICKET MODAL (ACTUALIZADO CON QR REAL) */}
      {(showTicketModal || exitingModal === 'ticket') && ticketData && (
          <div className={getAnimationClasses('ticket')}>
              {(() => {
                  const p = passengers.find(p => p.id === ticketData.id) || ticketData;
                  const busId = p.bus_id || 1;
                  const busInfo = BUSES.find(b => b.id === busId);
                  // Generar URL de QR real usando API pública
                  const qrData = `FIL2025-${p.code}-${p.id}`;
                  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}&color=000000&bgcolor=ffffff`;

                  return (
                    <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                        <div className={`bg-gradient-to-br ${busInfo?.color} p-6 text-white text-center relative`}>
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-md shadow-lg border border-white/30">
                                <Ticket size={32} className="drop-shadow-md"/>
                            </div>
                            <h2 className="text-xl font-black uppercase tracking-widest drop-shadow-md">Boleto de Abordar</h2>
                            <div className="mt-2 inline-block bg-white/20 px-4 py-1 rounded-full text-xs font-bold border border-white/20 backdrop-blur-md shadow-sm">
                                {busInfo?.label} • Asiento {p.seat_number || 'N/A'}
                            </div>
                            <button onClick={() => closeAnimated('ticket', setShowTicketModal)} className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 p-2 rounded-full transition-colors"><X size={20}/></button>
                        </div>
                        
                        <div className="p-8 flex flex-col items-center gap-6 relative bg-white">
                            {/* Perforaciones */}
                            <div className="absolute -left-3 top-0 bottom-0 my-auto w-6 h-6 bg-black rounded-full"></div>
                            <div className="absolute -right-3 top-0 bottom-0 my-auto w-6 h-6 bg-black rounded-full"></div>

                            <div className="text-center w-full">
                                <h3 className="text-2xl font-bold text-gray-800 leading-tight">{p.name}</h3>
                                <p className="text-sm font-medium text-gray-400 mt-1">{p.code !== 'N/A' ? p.code : 'Estudiante'}</p>
                            </div>

                            {/* CÓDIGO QR DINÁMICO */}
                            <div className="bg-white p-2 rounded-xl border-2 border-dashed border-gray-300">
                                <img src={qrUrl} alt="QR Boleto" className="w-32 h-32 opacity-90 mix-blend-multiply" />
                            </div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold"></p>

                            <div className="w-full border-t border-gray-100"></div>
                            
                            <div className="flex justify-between w-full text-center">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Salida</p>
                                    <p className="text-lg font-black text-gray-800">4:30 AM</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Estado</p>
                                    <div className="flex items-center gap-1 text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded-lg">
                                        <Check size={14} strokeWidth={3} /> Confirmado
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  );
              })()}
          </div>
      )}

      {/* LOGIN MODAL (MEJORADO) */}
      {(showLoginModal || exitingModal === 'login') && (
        <div className={getAnimationClasses('login')}>
          <div className="bg-white rounded-[2rem] w-full max-w-sm shadow-2xl border border-gray-100 relative overflow-hidden transform transition-all">
             
             {/* HEADER VISUAL DINÁMICO */}
             <div className={`bg-gradient-to-br ${currentBusColorClass} p-10 text-white text-center relative overflow-hidden`}>
                {/* Decorative Circles */}
                <div className="absolute top-[-50%] left-[-50%] w-full h-full rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute bottom-[-50%] right-[-50%] w-full h-full rounded-full bg-black/10 blur-3xl"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 bg-white/20 border-4 border-white/30 rounded-full flex items-center justify-center mb-4 backdrop-blur-md shadow-lg ring-4 ring-white/10">
                       <Lock size={36} strokeWidth={2.5} className="text-white drop-shadow-lg" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tight drop-shadow-md">Bienvenido</h3>
                    <p className="text-sm font-medium opacity-90 mt-1 tracking-wide">Acceso exclusivo para Coordinadores</p>
                </div>

                <button onClick={() => closeAnimated('login', setShowLoginModal)} className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 p-2 rounded-full transition-all text-white/80 hover:text-white z-20 backdrop-blur-sm"><X size={20}/></button>
             </div>
             
             <div className="p-8 pt-10">
                <form onSubmit={handleLogin} className="space-y-6">
                   {loginError && (
                       <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border border-red-100 animate-in shake">
                           <AlertTriangle size={16} className="flex-shrink-0"/> {loginError}
                       </div>
                   )}
                   
                   <div className="space-y-4">
                       {/* Input Usuario */}
                       <div className="group relative">
                          <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                              <GraduationCap size={20} />
                          </div>
                          <input 
                             type="text" 
                             value={loginUser} 
                             onChange={(e) => setLoginUser(e.target.value)} 
                             className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-gray-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 placeholder:font-medium" 
                             placeholder="Código de Coordinador" 
                             autoFocus
                          />
                       </div>
                       
                       {/* Input Contraseña */}
                       <div className="group relative">
                          <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                              <KeyRound size={20} />
                          </div>
                          <input 
                             type="password" 
                             value={loginPass} 
                             onChange={(e) => setLoginPass(e.target.value)} 
                             className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-gray-700 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 placeholder:font-medium" 
                             placeholder="Contraseña de Acceso" 
                          />
                       </div>
                   </div>
                   
                   <button 
                      type="submit" 
                      disabled={isLoggingIn}
                      className={`w-full ${getPrimaryButtonClass(currentBus)} py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl transform transition-all active:scale-[0.98] hover:-translate-y-1 ${isLoggingIn ? 'opacity-80 cursor-not-allowed' : ''}`}
                   >
                      {isLoggingIn ? <Loader2 size={24} className="animate-spin" /> : <><Unlock size={24} strokeWidth={2.5}/> Iniciar Sesión</>}
                   </button>
                   
                   {/* Footer Links */}
                   <div className="text-center pt-2">
                       <button type="button" className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors">
                           ¿Olvidaste tus credenciales? Contacta a Soporte.
                       </button>
                   </div>
                </form>
             </div>
          </div>
        </div>
      )}

      {(showBusMap || exitingModal === 'map') && (
        <div className={getAnimationClasses('map')}>
            <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-orange-200 relative max-h-[95vh] flex flex-col overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Bus className="text-orange-500" /> Mapa del {BUSES.find(b => b.id === currentBus)?.label}</h3>
                    <button onClick={() => closeAnimated('map', setShowBusMap)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"><X size={20}/></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-100/50">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <div className="bg-white p-6 rounded-[3rem] shadow-xl border-4 border-gray-200 relative mx-auto max-w-sm">
                                <div className="border-b-4 border-dashed border-gray-200 pb-4 mb-6 flex justify-between px-8 text-gray-300 font-bold uppercase tracking-widest text-xs"><span>Frente</span><div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200"><User size={20}/></div></div>
                                <div className="space-y-3">
                                    {Array.from({ length: 10 }).map((_, rowIndex) => (
                                        <div key={rowIndex} className="flex justify-between items-center gap-2 md:gap-4">
                                            <div className="flex gap-2">{[1, 2].map(offset => { const seatNum = (rowIndex * 4) + offset; const occupant = currentBusPassengers.find(p => p.seat_number == seatNum); return ( <button key={seatNum} onClick={() => handleSeatClick(seatNum)} className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-sm transition-all transform hover:scale-110 active:scale-95 border-b-4 ${occupant ? 'bg-red-500 border-red-700 text-white' : 'bg-green-400 border-green-600 text-white hover:bg-green-500'}`}>{occupant ? <span className="text-[10px] font-bold leading-none overflow-hidden px-0.5">{getFirstName(occupant.name)}</span> : <span className="text-xs font-bold opacity-50">{seatNum}</span>}</button> ); })}</div>
                                            <span className="text-[10px] font-bold text-gray-300 w-4 text-center">{rowIndex + 1}</span>
                                            <div className="flex gap-2">{[3, 4].map(offset => { const seatNum = (rowIndex * 4) + offset; const occupant = currentBusPassengers.find(p => p.seat_number == seatNum); return ( <button key={seatNum} onClick={() => handleSeatClick(seatNum)} className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-sm transition-all transform hover:scale-110 active:scale-95 border-b-4 ${occupant ? 'bg-red-500 border-red-700 text-white' : 'bg-green-400 border-green-600 text-white hover:bg-green-500'}`}>{occupant ? <span className="text-[10px] font-bold leading-none overflow-hidden px-0.5">{getFirstName(occupant.name)}</span> : <span className="text-xs font-bold opacity-50">{seatNum}</span>}</button> ); })}</div>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-center gap-2 md:gap-4 border-t-2 border-dashed border-gray-100 pt-3"><div className="flex gap-2">{[41, 42].map(seatNum => { const occupant = currentBusPassengers.find(p => p.seat_number == seatNum); return ( <button key={seatNum} onClick={() => handleSeatClick(seatNum)} className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-sm transition-all transform hover:scale-110 active:scale-95 border-b-4 ${occupant ? 'bg-red-500 border-red-700 text-white' : 'bg-green-400 border-green-600 text-white hover:bg-green-500'}`}>{occupant ? <span className="text-[10px] font-bold leading-none overflow-hidden px-0.5">{getFirstName(occupant.name)}</span> : <span className="text-xs font-bold opacity-50">{seatNum}</span>}</button> ); })}</div><div className="flex gap-2 items-center justify-end flex-1"><div className="w-[104px] h-12 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400"><span className="text-xl font-black">WC</span></div></div></div>
                                    <div className="flex justify-start gap-2 md:gap-4 mt-1"><div className="flex gap-2">{[43, 44].map(seatNum => { const occupant = currentBusPassengers.find(p => p.seat_number == seatNum); return ( <button key={seatNum} onClick={() => handleSeatClick(seatNum)} className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-sm transition-all transform hover:scale-110 active:scale-95 border-b-4 ${occupant ? 'bg-red-500 border-red-700 text-white' : 'bg-green-400 border-green-600 text-white hover:bg-green-500'}`}>{occupant ? <span className="text-[10px] font-bold leading-none overflow-hidden px-0.5">{getFirstName(occupant.name)}</span> : <span className="text-xs font-bold opacity-50">{seatNum}</span>}</button> ); })}</div><div className="ml-[10px]">{[45].map(seatNum => { const occupant = currentBusPassengers.find(p => p.seat_number == seatNum); return ( <button key={seatNum} onClick={() => handleSeatClick(seatNum)} className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-sm transition-all transform hover:scale-110 active:scale-95 border-b-4 ${occupant ? 'bg-red-500 border-red-700 text-white' : 'bg-green-400 border-green-600 text-white hover:bg-green-500'}`}>{occupant ? <span className="text-[10px] font-bold leading-none overflow-hidden px-0.5">{getFirstName(occupant.name)}</span> : <span className="text-xs font-bold opacity-50">{seatNum}</span>}</button> ); })}</div></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-80 flex-shrink-0">
                            {selectedSeat ? (<div className="bg-white p-6 rounded-3xl shadow-lg border border-orange-100 animate-in slide-in-from-right"><div className="flex justify-between items-center mb-4"><h4 className="font-bold text-lg text-gray-800">Asiento #{selectedSeat}</h4><button onClick={() => setSelectedSeat(null)} className="text-gray-400 hover:text-gray-600"><X size={18}/></button></div>{currentBusPassengers.find(p => p.seat_number == selectedSeat) ? (<div className="text-center py-6"><div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 text-red-500"><User size={32}/></div><p className="text-sm font-bold text-gray-500 uppercase mb-1">Ocupado por</p><p className="text-lg font-bold text-gray-800 mb-4">{currentBusPassengers.find(p => p.seat_number == selectedSeat).name}</p>{isCoordinator && (<button onClick={() => releaseSeat(currentBusPassengers.find(p => p.seat_number == selectedSeat).id)} className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-bold border border-red-200 hover:bg-red-100 w-full">Liberar Asiento</button>)}</div>) : (<div className="space-y-2"><p className="text-xs font-bold text-gray-400 uppercase mb-2">Asignar a pasajero sin asiento:</p><div className="flex bg-gray-100 p-1 rounded-xl mb-3"><button onClick={() => setMapListMode('unassigned')} className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${mapListMode === 'unassigned' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>Sin Asiento ({currentBusPassengers.filter(p => !p.seat_number).length})</button><button onClick={() => setMapListMode('assigned')} className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${mapListMode === 'assigned' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>Con Asiento ({currentBusPassengers.filter(p => p.seat_number).length})</button></div><div className="relative mb-2"><Search className="absolute left-3 top-2.5 text-gray-400" size={14} /><input type="text" placeholder="Buscar pasajero..." value={seatSearchTerm} onChange={(e) => setSeatSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-orange-500 outline-none"/></div><div className="max-h-80 overflow-y-auto pr-2 space-y-2 custom-scrollbar">{mapListMode === 'unassigned' && currentBusPassengers.filter(p => !p.seat_number).length === 0 && <p className="text-center text-gray-400 text-xs py-4">Todos tienen asiento 🎉</p>}{mapListMode === 'assigned' && currentBusPassengers.filter(p => p.seat_number).length === 0 && <p className="text-center text-gray-400 text-xs py-4">Nadie tiene asiento aún</p>}{currentBusPassengers.filter(p => { const matchesSearch = p.name.toLowerCase().includes(seatSearchTerm.toLowerCase()) || (p.code && p.code.includes(seatSearchTerm)); const matchesMode = mapListMode === 'unassigned' ? !p.seat_number : p.seat_number; return matchesSearch && matchesMode; }).sort((a,b) => { if (sortMode === 'lastname') { const surnameA = getSurname(a.name); const surnameB = getSurname(b.name); return surnameA.localeCompare(surnameB); } return a.name.localeCompare(b.name); }).map(p => (<button key={p.id} onClick={() => assignSeat(p.id, selectedSeat)} className="w-full text-left p-3 rounded-xl hover:bg-orange-50 border border-transparent hover:border-orange-100 transition-all group"><div className="flex justify-between items-start"><div><span className="font-bold text-xs text-gray-700 group-hover:text-orange-700 block">{formatDisplayName(p.name)}</span><span className="text-[10px] text-gray-400">{p.code}</span></div>{p.seat_number && (<span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-md">#{p.seat_number}</span>)}</div></button>))}</div></div>)}</div>) : (<div className="bg-white/50 border border-dashed border-gray-300 p-8 rounded-3xl flex flex-col items-center justify-center text-center h-full text-gray-400"><Armchair size={48} className="mb-3 opacity-50"/><p className="text-sm font-medium">Selecciona un asiento del mapa para ver detalles o asignar un pasajero.</p></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* EDIT MODAL - kept compact as before */}
      {(showEditModal || exitingModal === 'edit') && (<div className={getAnimationClasses('edit')}><div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-orange-200 relative max-h-[90vh] overflow-y-auto"><div className="flex justify-between items-center mb-6 border-b pb-4"><h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><User className="text-orange-500"/> Ficha del Pasajero</h3><button onClick={() => closeAnimated('edit', setShowEditModal)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><X size={20}/></button></div><div className="space-y-4"><div className="bg-gray-50 p-4 rounded-xl space-y-3"><label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Información General</label><div><label className="text-xs font-bold text-gray-500 ml-1">NOMBRE COMPLETO</label><input name="name" value={editFormData.name} onChange={handleEditChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-800 focus:ring-2 focus:ring-orange-500 outline-none" /></div><div className="grid grid-cols-2 gap-3"><div><label className="text-xs font-bold text-gray-500 ml-1">TELÉFONO</label><input name="phone" value={editFormData.phone} onChange={handleEditChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 outline-none" /></div><div><label className="text-xs font-bold text-gray-500 ml-1">CÓDIGO UDG</label><input name="code" value={editFormData.code} onChange={handleEditChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 outline-none" /></div></div><div><label className="text-xs font-bold text-gray-500 ml-1">MONTO PAGADO ($)</label><input type="number" name="amount" value={editFormData.amount} onChange={handleEditChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-orange-500 outline-none" /></div></div><div className="bg-red-50/50 p-4 rounded-xl space-y-3 border border-red-100"><label className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1 flex items-center gap-1"><ShieldAlert size={12}/> Información Confidencial</label><div><label className="text-xs font-bold text-gray-500 ml-1">NSS (SEGURO SOCIAL)</label><input name="nss" value={editFormData.nss} onChange={handleEditChange} className="w-full p-3 bg-white border border-red-100 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-red-200 outline-none" /></div><div><label className="text-xs font-bold text-gray-500 ml-1">NOMBRE DEL TUTOR</label><input name="parent" value={editFormData.parent} onChange={handleEditChange} className="w-full p-3 bg-white border border-red-100 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-red-200 outline-none" /></div><div><label className="text-xs font-bold text-gray-500 ml-1">TELÉFONO DEL TUTOR</label><div className="flex gap-2"><input name="parent_phone" value={editFormData.parent_phone} onChange={handleEditChange} className="w-full p-3 bg-white border border-red-100 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-red-200 outline-none" /><a href={`tel:${editFormData.parent_phone}`} className="bg-green-100 text-green-700 p-3 rounded-xl flex items-center justify-center hover:bg-green-200 transition-colors"><Phone size={20}/></a></div></div></div><div className="flex gap-3 pt-2"><button onClick={() => removePassenger(editFormData.id)} className="px-4 py-3 bg-red-100 text-red-600 rounded-xl font-bold hover:bg-red-200 transition-colors flex items-center justify-center" disabled={!canEdit(editFormData.bus_id)}><Trash2 size={20}/></button><button onClick={handleSaveEdit} className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 flex items-center justify-center gap-2" disabled={!canEdit(editFormData.bus_id)}><Save size={20}/> Guardar Cambios</button></div></div></div></div>)}

      {/* HEADER */}
      <div className={`bg-gradient-to-br ${currentBusColorClass} text-white p-6 pb-12 shadow-2xl shadow-orange-900/50 rounded-b-[2.5rem] relative z-20 transition-all duration-500 overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/5 pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative">
            <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-orange-100/90 mb-1 drop-shadow-md">Planilla</span>
                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 drop-shadow-xl filter">UNIÓN ESTUDIANTIL</h1>
                        <span className="text-sm font-bold text-orange-100 opacity-90 -mt-1 drop-shadow-md">FIL 2025</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-orange-50 font-medium mt-2 flex-nowrap"> 
                        {currentUser ? (<div className="bg-yellow-400/90 text-yellow-900 px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg shadow-yellow-900/20 animate-in fade-in slide-in-from-left-2 backdrop-blur-sm border border-yellow-300/50 whitespace-nowrap">👋 Hola {currentUser}</div>) : (<div className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm border border-white/10 whitespace-nowrap"><Bus size={12} className="text-yellow-300 drop-shadow-sm"/> {BUSES.find(b => b.id === currentBus)?.label}</div>)}
                        {isCoordinator && (<div className="bg-green-500/80 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 text-white shadow-sm border border-green-400/30 whitespace-nowrap"><Lock size={10} className="drop-shadow-sm" /> Coord. Activo</div>)}
                    </div>
                </div>
            
                <div className="hidden md:flex gap-4 items-center">
                    <Countdown onComplete={triggerConfetti} />
                    <button onClick={isCoordinator ? handleLogout : triggerLogin} className={`p-2 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg transition-all ${isCoordinator ? 'bg-red-500/80 hover:bg-red-600 shadow-red-900/20' : 'bg-white/20 hover:bg-white/30 shadow-black/10'}`}>{isCoordinator ? <LogOut size={20} className="drop-shadow-sm" /> : <Lock size={20} className="drop-shadow-sm" />}</button>
                </div>
                <div className="flex md:hidden gap-2"><button onClick={isCoordinator ? handleLogout : triggerLogin} className={`p-2 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg transition-all ${isCoordinator ? 'bg-red-500/80 hover:bg-red-600 shadow-red-900/20' : 'bg-white/20 hover:bg-white/30 shadow-black/10'}`}>{isCoordinator ? <LogOut size={20} className="drop-shadow-sm" /> : <Lock size={20} className="drop-shadow-sm" />}</button></div>
            </div>

            <div className="md:hidden mb-6"><Countdown onComplete={triggerConfetti} /></div>

            <div className="flex justify-between bg-black/20 backdrop-blur-md rounded-2xl p-1 mb-6 border border-white/10 shadow-inner">
                {BUSES.map((bus) => (<button key={bus.id} onClick={() => setCurrentBus(bus.id)} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${currentBus === bus.id ? 'bg-white text-gray-800 shadow-lg scale-105' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>{bus.label}</button>))}
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-3 text-center text-xs">
            {legs.map((leg, idx) => { const stats = getStats(idx); return ( <div key={idx} className="bg-black/20 backdrop-blur-md rounded-2xl p-2.5 flex flex-col items-center border border-white/10 shadow-inner group transition-all hover:bg-black/30"><span className="text-[10px] uppercase tracking-wider font-bold text-orange-100/90 mb-0.5 drop-shadow-sm">{leg.sub.replace('→ ', '')}</span><div className="flex items-baseline justify-center gap-0.5 mb-1"><span className={`text-3xl font-black tracking-tighter leading-none drop-shadow-md ${stats.count === stats.total && stats.total > 0 ? 'text-green-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]' : 'text-white'}`}>{stats.count}</span><span className="text-xs font-bold text-white/60 drop-shadow-sm">/{stats.total}</span></div><div className="w-full bg-black/30 h-1.5 rounded-full overflow-hidden shadow-inner"><div className={`h-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-700 ease-out ${stats.count === stats.total ? 'bg-green-400' : 'bg-white'}`} style={{ width: `${stats.percent}%` }}></div></div></div> ) })}
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-30">
        
        {/* STATS CARDS - SOLO COORDINADORES */}
        {isCoordinator && (
            <div className="grid gap-3 mb-6 grid-cols-2 sm:grid-cols-4">
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
                   <span className="text-xl font-black text-gray-800">{currentBusPassengers.length - totalPaidFull - totalAdvance}</span>
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-lg border-b-4 border-orange-500 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
                   <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Total MXN</span>
                   <span className="text-lg font-black text-orange-600 tracking-tight">${totalMoney.toLocaleString()}</span>
              </div>
            </div>
        )}

        {/* ... (Coordinator Card) ... */}
        <div className="mb-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 max-w-2xl mx-auto"><div className="p-4 flex items-center justify-between"><div><div className="flex items-center gap-2 mb-1"><Crown size={16} className="text-yellow-400 fill-yellow-400 animate-pulse" /><span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400/90">{BUSES.find(b => b.id === currentBus)?.label}</span></div><h3 className="text-lg font-bold text-white leading-tight">{BUSES.find(b => b.id === currentBus)?.coordinator.name}</h3><div className="flex flex-row gap-3 mt-1 text-gray-400 text-xs"><span className="flex items-center gap-1.5"><Phone size={12} /> {BUSES.find(b => b.id === currentBus)?.coordinator.phone}</span></div></div><a href={`tel:${BUSES.find(b => b.id === currentBus)?.coordinator.phone}`} className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-full shadow-lg shadow-green-900/50 transition-transform active:scale-95"><Phone size={20} strokeWidth={2.5} /></a></div></div>

        <div className="flex flex-col md:flex-row gap-3 mb-4 max-w-4xl mx-auto">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-3.5 text-orange-300 transition-colors group-focus-within:text-orange-500" size={18} />
            <input type="text" placeholder="Buscar estudiante (nombre o código)..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-white border-none rounded-2xl shadow-md text-sm font-medium focus:ring-4 focus:ring-orange-500/20 transition-all outline-none" />
          </div>

          {/* BOTÓN ITINERARIO (NUEVO) */}
          <button 
            onClick={() => setShowItinerary(true)} 
            className="p-3 bg-white text-purple-600 rounded-2xl shadow-md hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center justify-center gap-2 border border-purple-100 px-6 group"
          >
            <Calendar size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" /> 
            <span className="font-bold text-sm whitespace-nowrap">Ver Itinerario</span>
          </button>

          <button onClick={() => setShowBusMap(true)} className="p-3 bg-white text-orange-600 rounded-2xl shadow-md hover:bg-orange-50 hover:text-orange-700 transition-colors flex items-center justify-center gap-2 border border-orange-100 px-6 group"><Armchair size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" /> <span className="font-bold text-sm whitespace-nowrap">Ver Mapa</span></button>
          
          {/* CHANGE HERE: Wrap in isCoordinator check */}
          {isCoordinator && (
            <button onClick={exportToCSV} className="p-3 bg-white text-green-600 rounded-2xl shadow-md hover:bg-green-50 hover:text-green-700 transition-colors flex items-center justify-center gap-2"><Download size={20} strokeWidth={2.5} /> <span className="md:hidden font-bold text-sm">Descargar Excel</span></button>
          )}
        </div>

        {/* ... (Filters & Sort - same as before) ... */}
        <div className="flex items-center gap-3 mb-6 w-full max-w-full overflow-x-auto pb-2 px-1 no-scrollbar justify-start"><div className="flex-shrink-0 bg-white p-2 rounded-full shadow-sm"><ListFilter size={16} className="text-orange-500"/></div><button onClick={() => setFilterLeg(null)} className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${filterLeg === null ? 'bg-gray-800 text-white scale-105 shadow-md' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>Todos</button><button onClick={cycleSortMode} className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm bg-white text-gray-600 hover:bg-gray-50 flex items-center gap-2 border border-gray-100">{sortMode === 'original' ? <ArrowUpDown size={14} className="text-gray-400"/> : <ArrowDownAZ size={14} className="text-orange-500"/>}{getSortLabel()}</button>{isCoordinator && (<><div className="flex-shrink-0 w-px h-6 bg-gray-200 mx-1"></div><button onClick={() => setFilterLeg('pending')} className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${filterLeg === 'pending' ? 'bg-yellow-500 text-white scale-105 shadow-yellow-500/30' : 'bg-white text-gray-500 hover:bg-gray-50'}`}><FileText size={14} /> Cartas Pendientes<span className="bg-white/20 px-1.5 py-0.5 rounded-md text-[10px]">{countPendingCards}</span></button><button onClick={() => setFilterLeg('reviewed')} className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${filterLeg === 'reviewed' ? 'bg-green-500 text-white scale-105 shadow-green-500/30' : 'bg-white text-gray-500 hover:bg-gray-50'}`}><FileCheck size={14} /> Cartas Revisadas<span className="bg-white/20 px-1.5 py-0.5 rounded-md text-[10px]">{countReviewedCards}</span></button><button onClick={() => setFilterLeg('no_docs')} className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${filterLeg === 'no_docs' ? 'bg-red-500 text-white scale-105 shadow-red-500/30' : 'bg-white text-gray-500 hover:bg-gray-50'}`}><FileWarning size={14} /> Sin Documentos<span className="bg-white/20 px-1.5 py-0.5 rounded-md text-[10px]">{countNoDocs}</span></button><div className="flex-shrink-0 w-px h-6 bg-gray-200 mx-1"></div>{legs.map((leg) => { const LegIcon = leg.Icon; return ( <button key={leg.id} onClick={() => setFilterLeg(leg.id)} className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${filterLeg === leg.id ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white scale-105 shadow-orange-500/30' : 'bg-white text-gray-500 hover:bg-gray-50'}`}><span className={filterLeg === leg.id ? 'text-white' : 'text-orange-400'}><LegIcon size={14} /></span> {filterLeg === leg.id ? `Faltan ${leg.short}` : leg.short}</button> )})}</>)}</div>

        {/* ... (Add Button and List - same as before) ... */}
        {/* ... (kept brief for context) ... */}
        
        {/* LISTA DE PASAJEROS (LISTA SIMPLE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20 max-w-7xl mx-auto">
          {filteredPassengers.length === 0 ? (
            <div className="col-span-full text-center py-12 px-6 bg-white/50 rounded-3xl border border-dashed border-gray-300 mt-4">
               {filterLeg !== null && filterLeg !== 'pending' && filterLeg !== 'reviewed' && filterLeg !== 'seated' && filterLeg !== 'no_docs' ? (
                 <><div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner"><Check size={32} className="text-green-600" strokeWidth={3} /></div><h3 className="text-lg font-bold text-gray-800">¡Zona Completada!</h3></>
               ) : (
                 <><Search size={40} className="mx-auto mb-3 text-gray-300" /><p className="text-gray-400 font-medium">{filterLeg === 'pending' ? 'No hay documentos pendientes de revisión' : filterLeg === 'reviewed' ? 'No hay cartas revisadas aún' : filterLeg === 'seated' ? 'Nadie ha apartado asiento aún' : filterLeg === 'no_docs' ? '¡Excelente! Todos han subido sus documentos' : 'No se encontraron resultados'}</p></>
               )}
            </div>
          ) : (
            filteredPassengers.map((p) => {
              const busInfo = BUSES.find(b => b.id === (p.bus_id || 1));
              const docCount = p.documents ? p.documents.length : 0;
              const canModify = canEdit(p.bus_id); 

              return (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-orange-50/50 overflow-hidden transition-all duration-300 group relative flex flex-col w-full mx-auto">
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${busInfo?.color}`}></div>
                <div className="p-3 relative z-10 pl-4 flex-1 flex justify-between items-start"><div className="flex-1 pr-14 min-w-0">
                        <div className="absolute top-3 right-3 z-20">{isCoordinator ? (<div className={`flex items-center gap-1 px-3 py-1 rounded-full border shadow-sm transition-colors ${p.amount >= 480 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}><span className={`text-xs font-extrabold ${p.amount >= 480 ? 'text-green-700' : 'text-yellow-700'}`}>$</span><input type="number" value={p.amount} onChange={(e) => handleLocalAmountChange(p.id, e.target.value)} onBlur={(e) => handleAmountBlur(p.id, e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter') e.target.blur(); }} className={`w-14 text-xs font-extrabold bg-transparent outline-none text-right ${p.amount >= 480 ? 'text-green-700 placeholder-green-300' : 'text-yellow-700 placeholder-yellow-300'}`} disabled={!canModify} /></div>) : (<div className={`text-xs font-extrabold px-3 py-1 rounded-full border shadow-sm ${p.amount >= 480 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>${p.amount}</div>)}</div>
                        <h3 onClick={() => handleEditClick(p)} className={`font-bold text-sm leading-tight mb-2 transition-colors cursor-pointer hover:text-orange-600 text-gray-800 flex items-center gap-2 group-hover:underline select-none truncate pr-2`}>{formatDisplayName(p.name)} {isCoordinator ? (canModify ? (<Edit2 size={12} className="text-gray-300 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"/>) : (<Eye size={12} className="text-gray-400 transition-all flex-shrink-0"/>)) : (<Lock size={12} className="text-gray-300 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"/>)}</h3>
                        <div className="flex flex-wrap gap-2 text-[10px] text-gray-500 mb-2"><div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md border border-orange-100/50"><Phone size={10} className="text-orange-500" /><span className="font-medium">{p.phone}</span></div><div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100/50"><GraduationCap size={12} className="text-gray-400" /><span>{isCoordinator ? p.code : '•••••'}</span></div>{p.seat_number && (<div className="flex items-center gap-1 bg-purple-100 px-2 py-1 rounded-md border border-purple-200 text-purple-700 font-bold"><Armchair size={10} /><span>Asiento: #{p.seat_number}</span></div>)}<div className={`flex items-center gap-1 px-2 py-1 rounded-md border border-gray-100/50 ${busInfo?.bg} ${busInfo?.text} font-bold`}><Bus size={10} /><span>C{p.bus_id || 1}</span></div></div>
                        <div className="mt-3 flex flex-col gap-2">{isCoordinator && docCount > 0 && (<div className="space-y-1">{p.documents.map((doc, index) => (<div key={index} className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium border border-gray-100 bg-gray-50"><FileText size={14} className={`text-gray-500 ${doc.name.endsWith('.pdf') ? 'text-red-500' : 'text-blue-500'}`} /><a href={doc.url} target="_blank" rel="noreferrer" className="truncate text-gray-700 hover:underline flex-1">{doc.name}</a>{canModify && (<button onClick={(e) => { e.stopPropagation(); setDocumentToDelete({ passengerId: p.id, docUrl: doc.url, docName: doc.name, }); }} className="text-red-500 hover:text-red-700 p-0.5 rounded-full hover:bg-white transition-colors" title="Eliminar este documento"><Trash2 size={12} /></button>)}{isCoordinator && !canModify && (<a href={doc.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-orange-500"><ExternalLink size={12}/></a>)}</div>))}</div>)}{docCount > 0 ? (isCoordinator ? (<div className="flex items-center gap-1.5 text-xs font-bold bg-green-50 text-green-600 px-3 py-1.5 rounded-lg border border-green-200"><FileCheck size={14}/> {docCount} Documento(s) Subido(s)</div>) : (p.ticket_released ? (<div className="flex items-center justify-center gap-1.5 text-xs font-bold bg-green-50 text-green-600 px-3 py-1.5 rounded-lg border border-green-200"><FileCheck size={14}/> Documentos Revisados</div>) : (<div className="flex items-center justify-center gap-1.5 text-xs font-bold bg-yellow-50 text-yellow-600 px-3 py-1.5 rounded-lg border border-yellow-200"><FileText size={14}/> Documentos En Revisión</div>))) : (<label className="flex items-center justify-center gap-1.5 text-xs font-bold bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer active:scale-95"><Upload size={14}/> Subir Documentos<input type="file" multiple accept="image/*,application/pdf" className="hidden" onChange={(e) => handleUploadLetter(e, p.id)} /></label>)}<div className="flex gap-2 items-center">{isCoordinator && (<button onClick={() => toggleTicketRelease(p.id, p.ticket_released)} className={`p-2 rounded-lg border transition-colors flex items-center justify-center flex-1 text-xs font-bold ${p.ticket_released ? 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200' : 'bg-red-100 border-red-300 text-red-700 hover:bg-red-200'}`} title={p.ticket_released ? "Bloquear Boleto" : "Liberar Boleto"} disabled={!canModify || (docCount === 0 && !p.ticket_released)}>{p.ticket_released ? <Unlock size={14} /> : <Lock size={14}/>} {p.ticket_released ? 'Liberado' : 'Bloqueado'}</button>)}{p.ticket_released && (<>{isCoordinator ? (<button onClick={() => openTicketModal(p)} className="flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all animate-pulse flex-1"><Ticket size={14}/> Ver Boleto</button>) : (<button onClick={() => openAuthModal(p.id)} className="flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all animate-pulse flex-1"><Ticket size={14}/> Ver Boleto</button>)}</>)}</div></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 divide-x divide-gray-100 bg-gray-50/30 relative z-10 border-t border-gray-100 mt-auto">{legs.map((leg, idx) => { const LegIcon = leg.Icon; return ( <button key={idx} onClick={() => toggleCheck(p.id, idx)} className={`relative flex flex-col items-center justify-center py-2 transition-all duration-300 group/btn hover:bg-white ${p.checks && p.checks[idx] ? 'bg-green-500/5 text-green-700' : 'text-gray-400'}`} disabled={!canModify}><div className={`mb-1 p-1.5 rounded-full transition-all duration-300 shadow-sm ${p.checks && p.checks[idx] ? 'bg-green-500 text-white scale-110 shadow-green-500/40' : 'bg-white text-gray-300 group-hover/btn:text-orange-400 shadow-sm border border-gray-100'}`}>{p.checks && p.checks[idx] ? <Check size={14} strokeWidth={4} /> : <LegIcon size={14} />}</div>{p.checks && p.checks[idx] ? (<div className="flex flex-col items-center animate-in zoom-in"><span className="text-[10px] font-black uppercase tracking-wider text-green-600">Abordó</span><span className="text-[9px] font-medium opacity-80">{p.times?.[idx]}</span></div>) : (<div className="flex flex-col items-center"><span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 group-hover/btn:text-orange-500/70 transition-colors">{idx === 0 ? 'IDA' : idx === 1 ? 'INTER' : 'REGR'}</span></div>)}{p.checks && p.checks[idx] && <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-t-full"></div>}</button>)})}</div>
              </div>
            )})
          )}
        </div>
        
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">{isCoordinator && currentBusPassengers.length === 0 && (<button onClick={handleRestoreList} disabled={uploading} className="bg-red-600 text-white p-3 rounded-full shadow-2xl shadow-red-900/40 hover:scale-105 active:scale-95 transition-all border-2 border-white flex items-center gap-2 font-bold text-xs">{uploading ? 'Subiendo...' : `⚠️ RESTAURAR LISTA C${currentBus}`}</button>)}<button onClick={isCoordinator ? () => setShowAddForm(prev => !prev) : triggerLogin} className="bg-gray-900 text-white p-4 rounded-full shadow-2xl shadow-gray-900/40 hover:scale-105 active:scale-95 transition-all border-4 border-white/20">{isCoordinator ? <Plus size={24} strokeWidth={3} /> : <Lock size={24} />}</button></div>
      </div>
    </div>
  );
};

export default App;
