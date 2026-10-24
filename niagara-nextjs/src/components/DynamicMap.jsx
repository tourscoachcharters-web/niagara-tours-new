"use client";

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Compass, Loader2 } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyAJ0nthZfylJV4cO3hWgxVnKiOHQkzERM8';

// Singleton script loader to prevent duplicate script tags
let googleMapsScriptPromise = null;
function loadGoogleMaps(apiKey = GOOGLE_MAPS_API_KEY) {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window is not available'));
  }

  if (window.google && window.google.maps) {
    return Promise.resolve(window.google.maps);
  }

  if (!googleMapsScriptPromise) {
    googleMapsScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.getElementById('google-maps-js-sdk');
      if (existingScript) {
        if (window.google && window.google.maps) {
          resolve(window.google.maps);
        } else {
          existingScript.addEventListener('load', () => resolve(window.google.maps));
          existingScript.addEventListener('error', (e) => reject(e));
        }
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-maps-js-sdk';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google && window.google.maps) {
          resolve(window.google.maps);
        } else {
          reject(new Error('Google Maps loaded without google.maps object'));
        }
      };
      script.onerror = (err) => {
        googleMapsScriptPromise = null;
        reject(err);
      };
      document.head.appendChild(script);
    });
  }

  return googleMapsScriptPromise;
}

// Custom clean map styling
const LUXURY_MAP_STYLES = [
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#cbd5e1" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c6e3e7" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#0C3136" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#e2f0d9" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#fed7aa" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#fb923c" }]
  }
];

// Helper to generate custom SVG pin data URI
function getSvgPinUrl(number, isSelected = false) {
  const bgColor = isSelected ? '#D91E1E' : '#0C3136';
  const ringColor = isSelected ? '#FFFFFF' : '#F8A41E';
  const scale = isSelected ? 1.15 : 1.0;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" viewBox="0 0 40 48" fill="none">
    <filter id="shadow" x="0" y="0" width="40" height="48" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
    <path d="M20 2C10.059 2 2 10.059 2 20C2 31.5 20 46 20 46C20 46 38 31.5 38 20C38 10.059 29.941 2 20 2Z" fill="${bgColor}" stroke="${ringColor}" stroke-width="2.5" filter="url(#shadow)"/>
    <circle cx="20" cy="18" r="10" fill="#FFFFFF"/>
    <text x="20" y="22" font-family="Arial, sans-serif" font-weight="900" font-size="12" fill="${bgColor}" text-anchor="middle" dominant-baseline="middle">${number}</text>
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

// ----------------------------------------------------------------------
// 1. StaticPointsMap: Downtown Toronto Official Pickup Hubs with Google Maps
// ----------------------------------------------------------------------
export const StaticPointsMap = ({ points = [], activeIndex = 0, onSelectPoint = null }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    loadGoogleMaps()
      .then((googleMaps) => {
        if (!isMounted || !mapContainerRef.current) return;

        const defaultCenter = { lat: 43.655, lng: -79.385 };
        const map = new googleMaps.Map(mapContainerRef.current, {
          center: defaultCenter,
          zoom: 13,
          mapTypeId: 'roadmap',
          styles: LUXURY_MAP_STYLES,
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        });

        mapInstanceRef.current = map;
        infoWindowRef.current = new googleMaps.InfoWindow();

        // Clear previous markers
        markersRef.current.forEach((m) => m.setMap(null));
        markersRef.current = [];

        const bounds = new googleMaps.LatLngBounds();

        points.forEach((p, index) => {
          const latLng = { lat: Number(p.lat), lng: Number(p.lng) };
          bounds.extend(latLng);

          const marker = new googleMaps.Marker({
            position: latLng,
            map: map,
            title: p.name,
            icon: {
              url: getSvgPinUrl(index + 1, index === activeIndex),
              scaledSize: new googleMaps.Size(38, 46),
              anchor: new googleMaps.Point(19, 46),
            },
            animation: googleMaps.Animation.DROP,
          });

          const infoContent = `
            <div style="font-family: system-ui, -apple-system, sans-serif; padding: 10px 12px; max-width: 260px; color: #0C3136;">
              <div style="font-size: 10px; font-weight: 900; letter-spacing: 0.1em; color: #F8A41E; text-transform: uppercase; margin-bottom: 3px;">
                Pickup Hub #${index + 1}
              </div>
              <div style="font-size: 14px; font-weight: 800; color: #0C3136; line-height: 1.25; margin-bottom: 4px;">
                ${p.name}
              </div>
              <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">
                ${p.sub || ''}
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 6px; border-top: 1px solid #e2e8f0;">
                <span style="font-size: 11px; font-weight: 800; background: #0C3136; color: #ffffff; padding: 2px 7px; border-radius: 6px;">
                  ⏰ ${p.time}
                </span>
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ', Toronto')}" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   style="font-size: 11px; font-weight: 700; color: #125D66; text-decoration: underline;">
                  Directions ↗
                </a>
              </div>
            </div>
          `;

          marker.addListener('click', () => {
            infoWindowRef.current.setContent(infoContent);
            infoWindowRef.current.open(map, marker);
            if (onSelectPoint) onSelectPoint(index);
          });

          markersRef.current.push(marker);
        });

        if (points.length > 1) {
          map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
        }

        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Google Maps Load Error:', err);
        if (isMounted) setLoadError(err.message);
      });

    return () => {
      isMounted = false;
    };
  }, [points]);

  // Sync active marker selection when activeIndex changes
  useEffect(() => {
    if (!window.google || !mapInstanceRef.current || !markersRef.current.length) return;
    const activePoint = points[activeIndex];
    if (!activePoint) return;

    markersRef.current.forEach((marker, idx) => {
      const isSelected = idx === activeIndex;
      marker.setIcon({
        url: getSvgPinUrl(idx + 1, isSelected),
        scaledSize: new window.google.maps.Size(isSelected ? 44 : 38, isSelected ? 52 : 46),
        anchor: new window.google.maps.Point(isSelected ? 22 : 19, isSelected ? 52 : 46),
      });

      if (isSelected) {
        mapInstanceRef.current.panTo({ lat: Number(activePoint.lat), lng: Number(activePoint.lng) });
        if (infoWindowRef.current) {
          const infoContent = `
            <div style="font-family: system-ui, -apple-system, sans-serif; padding: 10px 12px; max-width: 260px; color: #0C3136;">
              <div style="font-size: 10px; font-weight: 900; letter-spacing: 0.1em; color: #F8A41E; text-transform: uppercase; margin-bottom: 3px;">
                Selected Pickup Hub #${activeIndex + 1}
              </div>
              <div style="font-size: 14px; font-weight: 800; color: #0C3136; line-height: 1.25; margin-bottom: 4px;">
                ${activePoint.name}
              </div>
              <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">
                ${activePoint.sub || ''}
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 6px; border-top: 1px solid #e2e8f0;">
                <span style="font-size: 11px; font-weight: 800; background: #0C3136; color: #ffffff; padding: 2px 7px; border-radius: 6px;">
                  ⏰ ${activePoint.time}
                </span>
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activePoint.name + ', Toronto')}" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   style="font-size: 11px; font-weight: 700; color: #125D66; text-decoration: underline;">
                  Directions ↗
                </a>
              </div>
            </div>
          `;
          infoWindowRef.current.setContent(infoContent);
          infoWindowRef.current.open(mapInstanceRef.current, marker);
        }
      }
    });
  }, [activeIndex, points]);

  if (loadError) {
    return (
      <div className="w-full h-full bg-slate-50 border border-slate-200 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
        <MapPin className="w-8 h-8 text-amber-500 mb-2" />
        <p className="font-bold text-sm text-[#0C3136]">Google Maps temporarily unavailable</p>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">All 5 downtown Toronto pickup hubs operate on regular morning schedules.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 bg-slate-100 flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#0C3136]" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Google Maps...</span>
        </div>
      )}
      <div ref={mapContainerRef} className="w-full h-full z-0" />
    </div>
  );
};

// ----------------------------------------------------------------------
// 2. LocationMarkerMap: Interactive Drop-a-Pin Google Map for Checkout
// ----------------------------------------------------------------------
export const LocationMarkerMap = ({ onLocationSelect, initialLocation = '' }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const geocoderRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [statusMsg, setStatusMsg] = useState('Click anywhere on map to drop pin');
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    loadGoogleMaps()
      .then((googleMaps) => {
        if (!isMounted || !mapContainerRef.current) return;

        const defaultCenter = { lat: 43.655, lng: -79.385 }; // Toronto City Hall
        const map = new googleMaps.Map(mapContainerRef.current, {
          center: defaultCenter,
          zoom: 13,
          mapTypeId: 'roadmap',
          styles: LUXURY_MAP_STYLES,
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        });

        mapInstanceRef.current = map;
        geocoderRef.current = new googleMaps.Geocoder();

        // Single draggable pickup pin
        const marker = new googleMaps.Marker({
          position: defaultCenter,
          map: map,
          draggable: true,
          title: "Drag or click to choose pickup location",
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="54" viewBox="0 0 44 54" fill="none">
                <filter id="p-shadow" x="0" y="0" width="44" height="54" filterUnits="userSpaceOnUse">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.4"/>
                </filter>
                <path d="M22 2C11.5 2 3 10.5 3 21C3 33.5 22 52 22 52C22 52 41 33.5 41 21C41 10.5 32.5 2 22 2Z" fill="#D91E1E" stroke="#FFFFFF" stroke-width="2.5" filter="url(#p-shadow)"/>
                <circle cx="22" cy="20" r="8" fill="#FFFFFF"/>
                <circle cx="22" cy="20" r="4" fill="#D91E1E"/>
              </svg>
            `)}`,
            scaledSize: new googleMaps.Size(42, 52),
            anchor: new googleMaps.Point(21, 52),
          },
          animation: googleMaps.Animation.DROP,
        });

        markerRef.current = marker;

        const handlePositionUpdate = (latLng) => {
          const lat = latLng.lat();
          const lng = latLng.lng();
          setStatusMsg(`Resolving address...`);

          if (geocoderRef.current) {
            geocoderRef.current.geocode({ location: { lat, lng } }, (results, status) => {
              if (status === 'OK' && results && results[0]) {
                const formatted = results[0].formatted_address;
                setStatusMsg(`📍 ${formatted.split(',')[0]}`);
                if (onLocationSelect) onLocationSelect(formatted);
              } else {
                const coordFallback = `Pickup Pin: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
                setStatusMsg(`📍 ${coordFallback}`);
                if (onLocationSelect) onLocationSelect(coordFallback);
              }
            });
          } else {
            const coordFallback = `Pickup Pin: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
            setStatusMsg(`📍 ${coordFallback}`);
            if (onLocationSelect) onLocationSelect(coordFallback);
          }
        };

        // Click map to reposition marker
        map.addListener('click', (e) => {
          marker.setPosition(e.latLng);
          handlePositionUpdate(e.latLng);
        });

        // Marker drag end
        marker.addListener('dragend', () => {
          const pos = marker.getPosition();
          if (pos) handlePositionUpdate(pos);
        });

        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Checkout Map Error:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Browser Geolocation Quick-Find
  const handleLocateMe = () => {
    if (!navigator.geolocation || !mapInstanceRef.current || !markerRef.current) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latLng = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        mapInstanceRef.current.panTo(latLng);
        mapInstanceRef.current.setZoom(15);
        markerRef.current.setPosition(latLng);

        if (geocoderRef.current) {
          geocoderRef.current.geocode({ location: latLng }, (results, status) => {
            setIsLocating(false);
            if (status === 'OK' && results && results[0]) {
              const formatted = results[0].formatted_address;
              setStatusMsg(`📍 ${formatted.split(',')[0]}`);
              if (onLocationSelect) onLocationSelect(formatted);
            } else {
              const coords = `Pickup Pin: ${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;
              setStatusMsg(`📍 ${coords}`);
              if (onLocationSelect) onLocationSelect(coords);
            }
          });
        } else {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        console.warn('Geolocation error:', error);
        alert('Could not retrieve current location. Please click on the map or type your hotel address.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border-2 border-slate-200">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 bg-slate-100 flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-[#0C3136]" />
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Loading Google Map...</span>
        </div>
      )}

      {/* Control bar overlay */}
      <div className="absolute top-3 left-3 right-3 z-[10] flex items-center justify-between gap-2 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-200 text-xs font-bold text-[#0C3136] flex items-center gap-2 truncate pointer-events-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />
          <span className="truncate max-w-[200px] sm:max-w-xs">{statusMsg}</span>
        </div>

        <button
          type="button"
          onClick={handleLocateMe}
          disabled={isLocating}
          className="bg-white/95 backdrop-blur-md hover:bg-white text-[#0C3136] px-3 py-2 rounded-xl shadow-md border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all pointer-events-auto shrink-0 focus-visible:ring-2 focus-visible:ring-[#0C3136]"
          title="Use current location"
        >
          {isLocating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#125D66]" />
          ) : (
            <Navigation className="w-3.5 h-3.5 text-[#125D66]" />
          )}
          <span className="hidden sm:inline">My Location</span>
        </button>
      </div>

      <div ref={mapContainerRef} className="w-full h-full z-0 cursor-crosshair" />
    </div>
  );
};
