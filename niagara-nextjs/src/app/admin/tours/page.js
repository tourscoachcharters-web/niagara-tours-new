"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Plus, Edit2, Trash2, Loader2, X, CheckCircle2, MapPin, Clock } from 'lucide-react';

export default function TourManager() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', id: '', tag: '', tagline: '', price: '', duration: '',
    overview: '', img: '', inclusions: '', exclusions: '', itinerary: '' // Added 'img' here
  });

  const [imageFile, setImageFile] = useState(null);

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
    fetchTours();
  }, []);

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
        img: tour.img || '', // Keep track of existing image
        // Convert arrays back to comma-separated strings for easy editing
        inclusions: tour.inclusions?.join('\n') || '',
        exclusions: tour.exclusions?.join('\n') || '',
        itinerary: tour.itinerary?.join('\n') || ''
      });
    } else {
      setCurrentId(null);
      setFormData({ title: '', id: '', tag: '', tagline: '', price: '', duration: '', overview: '', img: '', inclusions: '', exclusions: '', itinerary: '' });
    }
    setImageFile(null); // Reset the file picker
    setIsModalOpen(true);
  };

  const saveTour = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let finalImageUrl = formData.img || '';

    // 1. Upload to Vercel Blob if a new image was selected
    if (imageFile) {
      try {
        const response = await fetch(`/api/upload?filename=${encodeURIComponent(imageFile.name)}`, {
          method: 'POST',
          body: imageFile,
        });
        
        if (!response.ok) throw new Error("Upload failed");
        
        const blob = await response.json();
        finalImageUrl = blob.url; // Get the live Vercel CDN URL
      } catch (err) {
        console.error("Image upload failed:", err);
        alert("Failed to upload image. Please check your Vercel Blob setup.");
        setIsSubmitting(false);
        return;
      }
    }

    // 2. Format the data: split multiline strings into arrays for the frontend
    const formattedData = {
      ...formData,
      img: finalImageUrl, // Attach the new (or existing) image URL
      price: Number(formData.price),
      inclusions: formData.inclusions.split('\n').filter(item => item.trim() !== ''),
      exclusions: formData.exclusions.split('\n').filter(item => item.trim() !== ''),
      itinerary: formData.itinerary.split('\n').filter(item => item.trim() !== '')
    };

    // 3. Save to Firebase
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

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#0C3136]">Tour Management</h1>
          <p className="text-slate-500 font-medium mt-1">Create, update, and publish tours to the live website.</p>
        </div>
        <button onClick={() => openModal()} className="bg-[#125D66] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0C3136] transition-all">
          <Plus size={20} /> Add New Tour
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#125D66]" size={48} /></div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 border-b">Tour Name</th>
                <th className="p-4 border-b">Price</th>
                <th className="p-4 border-b">Duration</th>
                <th className="p-4 border-b">Tag</th>
                <th className="p-4 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour.firebaseId} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-b font-bold text-[#0C3136]">
                    <div className="flex items-center gap-3">
                      {tour.img && <img src={tour.img} alt="" className="w-8 h-8 rounded object-cover" />}
                      {tour.title}
                    </div>
                  </td>
                  <td className="p-4 border-b text-slate-600">CAD ${tour.price}</td>
                  <td className="p-4 border-b text-slate-600">{tour.duration}</td>
                  <td className="p-4 border-b"><span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-black">{tour.tag}</span></td>
                  <td className="p-4 border-b text-right space-x-3">
                    <button onClick={() => openModal(tour)} className="text-blue-500 hover:text-blue-700"><Edit2 size={18} /></button>
                    <button onClick={() => deleteTour(tour.firebaseId)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
              {tours.length === 0 && (
                <tr><td colSpan="5" className="p-8 text-center text-slate-400 font-bold">No tours found. Click "Add New Tour" to start.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex justify-between items-center z-10">
              <h2 className="text-2xl font-black text-[#0C3136]">{currentId ? 'Edit Tour' : 'Create New Tour'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            
            <form onSubmit={saveTour} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400">Tour Title</label>
                <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border rounded-xl font-bold" placeholder="Premium Wine & Falls Experience" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400">URL Slug (ID)</label>
                <input required name="id" value={formData.id} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border rounded-xl font-bold" placeholder="premium-wine-falls" />
              </div>
              
              {/* IMAGE UPLOAD FIELD */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400">Tour Image</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setImageFile(e.target.files[0])} 
                  className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-sm" 
                />
                {formData.img && !imageFile && (
                  <p className="text-[10px] text-emerald-600 font-bold mt-1">✓ Current image active (Leave empty to keep)</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400">Price (CAD)</label>
                <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border rounded-xl font-bold" placeholder="149" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400">Duration</label>
                <input required name="duration" value={formData.duration} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border rounded-xl font-bold" placeholder="10-11 Hours" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400">Tag (Badge)</label>
                <input name="tag" value={formData.tag} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border rounded-xl font-bold" placeholder="TOP RATED" />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase text-slate-400">Tagline / Short Desc</label>
                <input name="tagline" value={formData.tagline} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border rounded-xl font-bold" placeholder="Savor the finest local wines..." />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase text-slate-400">Full Overview</label>
                <textarea rows="3" name="overview" value={formData.overview} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border rounded-xl font-medium" />
              </div>

              {/* LIST ARRAYS */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400">Inclusions (One per line)</label>
                <textarea rows="5" name="inclusions" value={formData.inclusions} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border rounded-xl font-medium text-sm" placeholder="Round-trip Transport&#10;Wine Tastings" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400">Exclusions (One per line)</label>
                <textarea rows="5" name="exclusions" value={formData.exclusions} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border rounded-xl font-medium text-sm" placeholder="Gratuities&#10;Meals" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase text-slate-400">Step-by-Step Itinerary (One step per line)</label>
                <textarea rows="6" name="itinerary" value={formData.itinerary} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border rounded-xl font-medium text-sm" placeholder="Morning departure from Toronto...&#10;Scenic drive..." />
              </div>

              <div className="md:col-span-2 pt-6 border-t flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-100">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-[#125D66] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#0C3136] transition-all disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <CheckCircle2 />} SAVE & PUBLISH
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}