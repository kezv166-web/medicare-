import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Phone, Navigation, Building2, Stethoscope } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom icons for hospitals and clinics
const hospitalIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#5FA8D3" width="32" height="32">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm-1 16h2v-2h-2v2zm0-4h2V7h-2v7z"/>
            <circle cx="12" cy="22" r="2" fill="#5FA8D3"/>
        </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const clinicIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#63C7B2" width="28" height="28">
            <circle cx="12" cy="12" r="10" fill="#63C7B2"/>
            <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7z" fill="white"/>
        </svg>
    `),
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28]
});

function MapUpdater({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, zoom);
        }
    }, [center, zoom, map]);
    return null;
}

export default function HospitalsMap({ facilities, onFacilityClick, userLocation }) {
    const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]); // Default: New York
    const [mapZoom, setMapZoom] = useState(12);

    useEffect(() => {
        if (userLocation) {
            setMapCenter([userLocation.lat, userLocation.lng]);
            setMapZoom(13);
        } else if (facilities.length > 0) {
            // Center on first facility
            const firstFacility = facilities[0];
            if (firstFacility.coordinates) {
                setMapCenter([firstFacility.coordinates.lat, firstFacility.coordinates.lng]);
            }
        }
    }, [userLocation, facilities]);

    return (
        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
            >
                <MapUpdater center={mapCenter} zoom={mapZoom} />
                
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* User location marker */}
                {userLocation && (
                    <Marker position={[userLocation.lat, userLocation.lng]}>
                        <Popup>
                            <div className="text-center p-2">
                                <Navigation className="w-6 h-6 mx-auto mb-2 text-[#5FA8D3]" />
                                <p className="font-semibold text-gray-800">Your Location</p>
                            </div>
                        </Popup>
                    </Marker>
                )}

                {/* Facility markers */}
                {facilities.map((facility) => {
                    if (!facility.coordinates) return null;
                    
                    const isHospital = facility.type === 'hospital';
                    const icon = isHospital ? hospitalIcon : clinicIcon;

                    return (
                        <Marker
                            key={facility.id}
                            position={[facility.coordinates.lat, facility.coordinates.lng]}
                            icon={icon}
                        >
                            <Popup>
                                <div className="min-w-[250px] p-2">
                                    <div className="flex items-start gap-2 mb-3">
                                        {isHospital ? (
                                            <Building2 className="w-5 h-5 text-[#5FA8D3] flex-shrink-0 mt-1" />
                                        ) : (
                                            <Stethoscope className="w-5 h-5 text-[#63C7B2] flex-shrink-0 mt-1" />
                                        )}
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">{facility.name}</h3>
                                            <p className="text-xs text-gray-600">{facility.address}</p>
                                        </div>
                                    </div>

                                    {isHospital && facility.availability && (
                                        <div className="mb-3 space-y-1">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-600">Beds:</span>
                                                <span className={`font-medium ${
                                                    facility.availability.beds === 'high' ? 'text-green-600' :
                                                    facility.availability.beds === 'medium' ? 'text-yellow-600' :
                                                    'text-red-600'
                                                }`}>
                                                    {facility.availability.beds === 'high' ? 'Available' :
                                                     facility.availability.beds === 'medium' ? 'Limited' : 'Full'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-600">Blood:</span>
                                                <span className={`font-medium ${
                                                    facility.availability.blood === 'high' ? 'text-green-600' :
                                                    facility.availability.blood === 'medium' ? 'text-yellow-600' :
                                                    'text-red-600'
                                                }`}>
                                                    {facility.availability.blood === 'high' ? 'Available' :
                                                     facility.availability.blood === 'medium' ? 'Limited' : 'Low'}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => window.location.href = `tel:${facility.phone}`}
                                            className="flex-1 bg-[#5FA8D3] hover:bg-[#4A8BB5] text-white h-8 text-xs"
                                        >
                                            <Phone className="w-3 h-3 mr-1" />
                                            Call
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => onFacilityClick(facility)}
                                            className="flex-1 border-[#5FA8D3] text-[#5FA8D3] hover:bg-[#C3F3E8]/30 h-8 text-xs"
                                        >
                                            Details
                                        </Button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 z-[1000]">
                <p className="text-xs font-semibold text-gray-700 mb-2">Legend</p>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#5FA8D3]"></div>
                        <span className="text-xs text-gray-600">Hospitals</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#63C7B2]"></div>
                        <span className="text-xs text-gray-600">Clinics</span>
                    </div>
                </div>
            </div>
        </div>
    );
}