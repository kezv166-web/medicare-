import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, User, Briefcase } from "lucide-react";

export default function ClinicCard({ clinic, onViewDetails }) {
    return (
        <div className="bg-gradient-to-br from-white to-[#C3F3E8]/10 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            {/* Header */}
            <div className="mb-4">
                <h3 className="text-xl font-bold text-[#63C7B2] mb-2">
                    {clinic.name}
                </h3>
                <div className="flex items-start gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{clinic.address}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${clinic.phone}`} className="text-sm hover:text-[#63C7B2]">
                        {clinic.phone}
                    </a>
                </div>
            </div>

            {/* Doctor Info */}
            <div className="mb-4 pb-4 border-b border-gray-100">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#5FA8D3]" />
                    Doctor(s)
                </h4>
                <div className="space-y-2">
                    {clinic.doctors.map((doctor, index) => (
                        <div key={index} className="bg-white/60 rounded-lg px-3 py-2">
                            <p className="text-sm font-medium text-gray-800">{doctor.name}</p>
                            <p className="text-xs text-gray-500">{doctor.specialty}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visiting Timings */}
            <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#63C7B2]" />
                    Visiting Hours
                </h4>
                <div className="bg-[#C3F3E8]/30 rounded-lg px-3 py-2">
                    <p className="text-sm text-gray-700">{clinic.visitingHours}</p>
                </div>
            </div>

            {/* Services */}
            <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#5FA8D3]" />
                    Services Offered
                </h4>
                <div className="flex flex-wrap gap-2">
                    {clinic.services.map((service, index) => (
                        <span
                            key={index}
                            className="inline-block bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 border border-gray-200"
                        >
                            {service}
                        </span>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <Button
                    onClick={() => window.location.href = `tel:${clinic.phone}`}
                    className="flex-1 bg-[#63C7B2] hover:bg-[#5FA8D3] text-white"
                >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Clinic
                </Button>
                <Button
                    onClick={() => onViewDetails(clinic)}
                    variant="outline"
                    className="flex-1 border-[#63C7B2] text-[#63C7B2] hover:bg-[#C3F3E8]/30"
                >
                    View Details
                </Button>
            </div>
        </div>
    );
}