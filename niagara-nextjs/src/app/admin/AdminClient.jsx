"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { 
  LayoutDashboard, Loader2, ChevronLeft, Ticket, Globe, LogOut, 
  DollarSign, Clock, Search, CheckCircle, XCircle, Trash2, Users, Map // <-- Added Map here
} from 'lucide-react';

export default function AdminClient() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [bookings, setBookings] = useState([]);
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard State
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Listen for Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Only allow actual email users (not anonymous checkout users) into the admin
      if (currentUser && !currentUser.isAnonymous) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch Live Bookings if Logged In
  useEffect(() => {
    if (!user) return;
    
    const bookingsRef = collection(db, 'bookings');
    const unsubscribe = onSnapshot(bookingsRef, 
      (snapshot) => {
        const loadedBookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        loadedBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBookings(loadedBookings);
      },
      (err) => console.error("Firestore error:", err)
    );
    
    return () => unsubscribe();
  }, [user]);

  // 3. Handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Invalid admin credentials.');
    }
    setIsLoggingIn(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const updateBookingStatus = async (id, newStatus) => {
    try { await updateDoc(doc(db, 'bookings', id), { status: newStatus }); } 
    catch (e) { console.error(e); }
  };

  const handleDeleteBooking = async (id) => {
    if(window.confirm('Delete this booking forever?')) {
      try { await deleteDoc(doc(db, 'bookings', id)); } 
      catch (e) { console.error(e); }
    }
  };

  if (loadingAuth) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin text-[#125D66]" /></div>;
  }

  // --- LOGIN SCREEN ---
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 animate-in fade-in duration-500">
        <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl border border-slate-100 p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#0C3136]/5 text-[#F8A41E] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-[#0C3136]">Admin Access</h2>
            <p className="text-sm text-slate-500 font-medium mt-2">Enter your credentials to manage bookings.</p>
          </div>
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 text-center">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Admin Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] transition-all" required />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] transition-all" required />
            </div>
            <button type="submit" disabled={isLoggingIn} className="w-full bg-[#0C3136] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-[#125D66] transition-all flex justify-center items-center">
              {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : 'SECURE LOGIN'}
            </button>
          </form>
          <div className="mt-8 text-center">
            <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#F8A41E] flex items-center justify-center gap-1">
              <ChevronLeft className="w-3 h-3" /> Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD SCREEN ---
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status !== 'Cancelled' ? b.total : 0), 0);
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const filteredBookings = bookings.filter(b => 
    b.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row animate-in fade-in duration-500 absolute inset-0 z-[1000000]">
      <aside className="w-full md:w-64 bg-[#0C3136] text-white flex flex-col shadow-2xl z-20 shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-[#F8A41E] p-2 rounded-lg"><LayoutDashboard className="w-5 h-5 text-[#0C3136]" /></div>
          <div><h2 className="font-black text-sm tracking-widest uppercase text-[#F8A41E]">Admin Panel</h2><p className="text-[10px] text-slate-400">Niagara Travels</p></div>
        </div>
<nav className="p-4 flex-1">
          <ul className="space-y-2">
            <li>
              <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-sm font-bold text-white transition-all">
                <Ticket className="w-4 h-4" /> Bookings
              </Link>
            </li>
            <li>
              <Link href="/admin/tours" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all">
                <Map className="w-4 h-4" /> Tours
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
           <Link href="/" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all"><Globe className="w-4 h-4" /> View Live Site</Link>
           <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 rounded-xl text-sm font-bold text-red-400 hover:text-red-300 transition-all text-left"><LogOut className="w-4 h-4" /> Secure Logout</button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white px-8 py-5 flex items-center justify-between border-b border-slate-200 shadow-sm shrink-0">
          <h1 className="text-xl font-black text-[#0C3136]">Dashboard Overview</h1>
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-[#125D66] font-black">A</div>
        </header>

        <div className="p-8 flex-1 overflow-y-auto">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
                 <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><DollarSign className="w-7 h-7" /></div>
                 <div><p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Revenue</p><h3 className="text-3xl font-black text-[#0C3136]">CAD ${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3></div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
                 <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Ticket className="w-7 h-7" /></div>
                 <div><p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Bookings</p><h3 className="text-3xl font-black text-[#0C3136]">{bookings.length}</h3></div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
                 <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"><Clock className="w-7 h-7" /></div>
                 <div><p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Pending</p><h3 className="text-3xl font-black text-[#0C3136]">{pendingBookings}</h3></div>
              </div>
           </div>

           <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <h2 className="text-lg font-black text-[#0C3136]">Recent Bookings</h2>
                 <div className="relative">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Search ID or Name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold w-full md:w-64 focus:outline-none focus:border-[#F8A41E] transition-colors" />
                 </div>
              </div>
              
              <div className="overflow-x-auto flex-1">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-200">
                          <th className="p-5">Booking ID</th><th className="p-5">Customer</th><th className="p-5">Tour Details</th><th className="p-5">Date</th><th className="p-5">Total</th><th className="p-5">Status</th><th className="p-5 text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                       {filteredBookings.length === 0 ? (
                         <tr><td colSpan="7" className="p-10 text-center text-slate-400 font-bold">No bookings found.</td></tr>
                       ) : (
                         filteredBookings.map(b => (
                           <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-5 font-black text-[#0C3136]">{b.id}</td>
                              <td className="p-5"><div className="font-bold text-[#0C3136]">{b.customerName}</div><div className="text-xs text-slate-400 mt-0.5">{b.email}</div></td>
                              <td className="p-5"><div className="font-bold">{b.tourName}</div><div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1"><Users className="w-3 h-3"/> {b.adults}A, {b.children}C</div></td>
                              <td className="p-5 font-bold">{b.date}</td>
                              <td className="p-5 font-black text-[#0C3136]">CAD ${b.total.toFixed(2)}</td>
                              <td className="p-5">
                                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center w-max gap-1 ${b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : b.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                    {b.status === 'Confirmed' && <CheckCircle size={12} />}
                                    {b.status === 'Pending' && <Clock size={12} />}
                                    {b.status === 'Cancelled' && <XCircle size={12} />}
                                    {b.status}
                                 </span>
                              </td>
                              <td className="p-5 text-right">
                                 <div className="flex items-center justify-end gap-2">
                                    {b.status !== 'Confirmed' && b.status !== 'Cancelled' && (
                                       <button onClick={() => updateBookingStatus(b.id, 'Confirmed')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><CheckCircle size={18} /></button>
                                    )}
                                    {b.status !== 'Cancelled' && (
                                       <button onClick={() => updateBookingStatus(b.id, 'Cancelled')} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"><XCircle size={18} /></button>
                                    )}
                                    <button onClick={() => handleDeleteBooking(b.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                                 </div>
                              </td>
                           </tr>
                         ))
                       )}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}