"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { 
  Plus, Edit2, Trash2, Loader2, X, CheckCircle2, MapPin, Clock,
  LayoutDashboard, Ticket, Globe, LogOut, Map 
} from 'lucide-react';

export default function TourManager() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', id: '', tag: '', tagline: '', price: '', duration: '',
    overview: '', img: '', inclusions: '', exclusions: '', itinerary: ''
  });

  const [imageFile, setImageFile] = useState(null);

  // 1. Listen for Firebase Auth State (Security)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Only allow actual email users into the admin
      if (currentUser && !currentUser.isAnonymous) {
        setUser(currentUser);
      } else {
        router.push('/admin'); // Redirect to login if not authenticated
      }
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, [router]);

  // 2. Fetch Tours
  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'tours'));
      const toursData = querySnapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
      setTours(toursData);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) fetchTours();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openModal = (tour = null) => {
    if (tour) {
      setCurrentId(tour.firebaseId);
      setFormData({
        title: tour.title || '',
        id: tour.id || '',
        tag: tour.tag || '',
        tagline: tour.tagline || '',
        price: tour.price || '',
        duration: tour.duration || '',
        overview: tour.overview || '',
        img: tour.img || '',
        inclusions: tour.inclusions?.join('\n') || '',
        exclusions: tour.exclusions?.join('\n') || '',
        itinerary: tour.itinerary?.join('\n') || ''
      });
    } else {
      setCurrentId(null);
      setFormData({ title: '', id: '', tag: '', tagline: '', price: '', duration: '', overview: '', img: '', inclusions: '', exclusions: '', itinerary: '' });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const saveTour = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let finalImageUrl = formData.img || '';

    // Upload to Vercel Blob
    if (imageFile) {
      try {
        const response = await fetch(`/api/upload?filename=${encodeURIComponent(imageFile.name)}`, {
          method: 'POST',
          body: imageFile,
        });
        if (!response.ok) throw new Error("Upload failed");
        const blob = await response.json();
        finalImageUrl = blob.url;
      } catch (err) {
        console.error("Image upload failed:", err);
        alert("Failed to upload image.");
        setIsSubmitting(false);
        return;
      }
    }

    const formattedData = {
      ...formData,
      img: finalImageUrl,
      price: Number(formData.price),
      inclusions: formData.inclusions.split('\n').filter(item => item.trim() !== ''),
      exclusions: formData.exclusions.split('\n').filter(item => item.trim() !== ''),
      itinerary: formData.itinerary.split('\n').filter(item => item.trim() !== '')
    };

    try {
      if (currentId) {
        await updateDoc(doc(db, 'tours', currentId), formattedData);
      } else {
        await addDoc(collection(db, 'tours'), formattedData);
      }
      await fetchTours();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving tour:", error);
      alert("Failed to save tour.");
    }
    setIsSubmitting(false);
  };

  const deleteTour = async (firebaseId) => {
    if (window.confirm("Are you sure you want to delete this tour? This cannot be undone.")) {
      try {
        await deleteDoc(doc(db, 'tours', firebaseId));
        fetchTours();
      } catch (error) {
        console.error("Error deleting tour:", error);
      }
    }
  };

  if (loadingAuth) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin text-[#125D66]" /></div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row animate-in fade-in duration-500 absolute inset-0 z-[1000000]">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-[#0C3136] text-white flex flex-col shadow-2xl z-20 shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-[#F8A41E] p-2 rounded-lg"><LayoutDashboard className="w-5 h-5 text-[#0C3136]" /></div>
          <div><h2 className="font-black text-sm tracking-widest uppercase text-[#F8A41E]">Admin Panel</h2><p className="text-[10px] text-slate-400">Niagara Travels</p></div>
        </div>
        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            <li>
              <Link href="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all">
                <Ticket className="w-4 h-4" /> Bookings
              </Link>
            </li>
            <li>
              {/* Active State for Tours */}
              <Link href="/admin/tours" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-sm font-bold text-white transition-all">
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

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white px-8 py-5 flex items-center justify-between border-b border-slate-200 shadow-sm shrink-0">
          <h1 className="text-xl font-black text-[#0C3136]">Tour Management</h1>
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-[#125D66] font-black">A</div>
        </header>

        <div className="p-8 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-black text-[#0C3136]">All Tours</h2>
                <p className="text-slate-500 font-medium mt-1">Create, update, and publish tours to the live website.</p>
              </div>
              <button onClick={() => openModal()} className="bg-[#125D66] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0C3136] transition-all shadow-sm">
                <Plus size={20} /> Add New Tour
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#125D66]" size={48} /></div>
            ) : (
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-200">
                      <th className="p-5">Tour Name</th>
                      <th className="p-5">Price</th>
                      <th className="p-5">Duration</th>
                      <th className="p-5">Tag</th>
                      <th className="p-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                    {tours.map((tour) => (
                      <tr key={tour.firebaseId} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-5 font-bold text-[#0C3136]">
                          <div className="flex items-center gap-4">
                            {tour.img ? (
                              <img src={tour.img} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm" />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300 border border-slate-200"><MapPin size={20}/></div>
                            )}
                            {tour.title}
                          </div>
                        </td>
                        <td className="p-5 font-black text-[#0C3136]">CAD ${tour.price}</td>
                        <td className="p-5 font-bold text-slate-500">{tour.duration}</td>
                        <td className="p-5"><span className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-widest">{tour.tag}</span></td>
                        <td className="p-5 text-right">
                           <div className="flex justify-end gap-2">
                            <button onClick={() => openModal(tour)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18} /></button>
                            <button onClick={() => deleteTour(tour.firebaseId)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                    {tours.length === 0 && (
                      <tr><td colSpan="5" className="p-10 text-center text-slate-400 font-bold">No tours found. Click "Add New Tour" to start.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ADD/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[10000000] p-4 animate-in fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-slate-100 p-8 flex justify-between items-center z-10">
              <h2 className="text-2xl font-black text-[#0C3136]">{currentId ? 'Edit Tour Details' : 'Create New Tour'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"><X size={20} /></button>
            </div>
            
            <form onSubmit={saveTour} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tour Title</label>
                <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border-2 border-slate-50 outline-none focus:border-[#F8A41E] rounded-2xl font-bold text-sm transition-all" placeholder="Premium Wine & Falls Experience" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">URL Slug (ID)</label>
                <input required name="id" value={formData.id} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border-2 border-slate-50 outline-none focus:border-[#F8A41E] rounded-2xl font-bold text-sm transition-all" placeholder="premium-wine-falls" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tour Image</label>
                <div className="w-full p-2 bg-slate-50 border-2 border-slate-50 focus-within:border-[#F8A41E] rounded-2xl transition-all">
                  <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full text-sm font-bold text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-[#125D66] file:text-white hover:file:bg-[#0C3136] file:transition-colors file:cursor-pointer cursor-pointer" />
                </div>
                {formData.img && !imageFile && (
                  <p className="text-[10px] text-emerald-600 font-bold ml-1 flex items-center gap-1 mt-2"><CheckCircle2 size={12}/> Current image active</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Price (CAD)</label>
                <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border-2 border-slate-50 outline-none focus:border-[#F8A41E] rounded-2xl font-bold text-sm transition-all" placeholder="149" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Duration</label>
                <input required name="duration" value={formData.duration} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border-2 border-slate-50 outline-none focus:border-[#F8A41E] rounded-2xl font-bold text-sm transition-all" placeholder="10-11 Hours" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tag (Badge)</label>
                <input name="tag" value={formData.tag} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border-2 border-slate-50 outline-none focus:border-[#F8A41E] rounded-2xl font-bold text-sm transition-all" placeholder="TOP RATED" />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tagline / Short Desc</label>
                <input name="tagline" value={formData.tagline} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border-2 border-slate-50 outline-none focus:border-[#F8A41E] rounded-2xl font-bold text-sm transition-all" placeholder="Savor the finest local wines..." />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Overview</label>
                <textarea rows="3" name="overview" value={formData.overview} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border-2 border-slate-50 outline-none focus:border-[#F8A41E] rounded-2xl font-medium text-sm transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Inclusions (One per line)</label>
                <textarea rows="5" name="inclusions" value={formData.inclusions} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border-2 border-slate-50 outline-none focus:border-[#F8A41E] rounded-2xl font-medium text-sm transition-all leading-relaxed" placeholder="Round-trip Transport&#10;Wine Tastings" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Exclusions (One per line)</label>
                <textarea rows="5" name="exclusions" value={formData.exclusions} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border-2 border-slate-50 outline-none focus:border-[#F8A41E] rounded-2xl font-medium text-sm transition-all leading-relaxed" placeholder="Gratuities&#10;Meals" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Step-by-Step Itinerary (One step per line)</label>
                <textarea rows="6" name="itinerary" value={formData.itinerary} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border-2 border-slate-50 outline-none focus:border-[#F8A41E] rounded-2xl font-medium text-sm transition-all leading-relaxed" placeholder="Morning departure from Toronto...&#10;Scenic drive..." />
              </div>

              <div className="md:col-span-2 pt-8 mt-2 flex justify-end gap-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-[#125D66] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#0C3136] transition-all shadow-lg disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />} SAVE & PUBLISH
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}