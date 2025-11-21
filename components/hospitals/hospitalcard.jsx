import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ExternalLink, User, CheckCircle2, AlertCircle, XCircle } from "lucide-react";

export default function HospitalCard({ hospital, onViewDetails }) {
    const getAvailabilityColor = (status) => {
        if (status === 'high') return 'text-green-600 bg-green-50';
        if (status === 'medium') return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    const getAvailabilityIcon = (status) => {
        if (status === 'high') return <CheckCircle2 className="w-4 h-4" />;
        if (status === 'medium') return <AlertCircle className="w-4 h-4" />;
        return <XCircle className="w-4 h-4" />;
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            {/* Header */}
            <div className="mb-4">
                <h3 className="text-2xl font-bold text-[#5FA8D3] mb-2">
                    {hospital.name}
                </h3>
                <div className="flex items-start gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                    <p className="text-sm">{hospital.address}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${hospital.phone}`} className="text-sm hover:text-[#5FA8D3]">
                        {hospital.phone}
                    </a>
                </div>
            </div>

            {/* Top Doctors */}
            <div className="mb-4 pb-4 border-b border-gray-100">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#63C7B2]" />
                    Top Doctors
                </h4>
                <div className="space-y-2">
                    {hospital.topDoctors.map((doctor, index) => (
                        <div key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#63C7B2] mt-1.5 flex-shrink-0"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">{doctor.name}</p>
                                <p className="text-xs text-gray-500">
                                    {doctor.specialty} • {doctor.qualification}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Services & Availability */}
            <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Live Availability
                </h4>
                <div className="grid grid-cols-1 gap-2">
                    <div className={`flex items-center justify-between px-3 py-2 rounded-lg ${getAvailabilityColor(hospital.availability.beds)}`}>
                        <div className="flex items-center gap-2">
                            {getAvailabilityIcon(hospital.availability.beds)}
                            <span className="text-sm font-medium">Beds</span>
                        </div>
                        <span className="text-xs font-semibold">
                            {hospital.availability.beds === 'high' ? 'Available' : 
                             hospital.availability.beds === 'medium' ? 'Limited' : 'Full'}
                        </span>
                    </div>
                    
                    <div className={`flex items-center justify-between px-3 py-2 rounded-lg ${getAvailabilityColor(hospital.availability.blood)}`}>
                        <div className="flex items-center gap-2">
                            {getAvailabilityIcon(hospital.availability.blood)}
                            <span className="text-sm font-medium">Blood Bank</span>
                        </div>
                        <span className="text-xs font-semibold">
                            {hospital.availability.blood === 'high' ? 'Available' : 
                             hospital.availability.blood === 'medium' ? 'Limited' : 'Low Stock'}
                        </span>
                    </div>
                    
                    <div className={`flex items-center justify-between px-3 py-2 rounded-lg ${getAvailabilityColor(hospital.availability.oxygen)}`}>
                        <div className="flex items-center gap-2">
                            {getAvailabilityIcon(hospital.availability.oxygen)}
                            <span className="text-sm font-medium">Oxygen Cylinders</span>
                        </div>
                        <span className="text-xs font-semibold">
                            {hospital.availability.oxygen === 'high' ? 'Available' : 
                             hospital.availability.oxygen === 'medium' ? 'Limited' : 'Unavailable'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <Button
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.address)}`, '_blank')}
                    variant="outline"
                    className="flex-1 border-[#5FA8D3] text-[#5FA8D3] hover:bg-[#C3F3E8]/30"
                >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Map
                </Button>
                <Button
                    onClick={() => window.location.href = `tel:${hospital.phone}`}
                    className="flex-1 bg-[#63C7B2] hover:bg-[#5FA8D3] text-white"
                >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                </Button>
                <Button
                    onClick={() => onViewDetails(hospital)}
                    className="flex-1 bg-[#5FA8D3] hover:bg-[#4A8BB5] text-white"
                >
                    View Details
                </Button>
            </div>
        </div>
    );
}