import React from "react";
import { X } from "lucide-react";

export default function FilterChips({ filters, onRemoveFilter, onClearAll }) {
    const activeFilters = [];

    if (filters.location) {
        activeFilters.push({ key: 'location', label: `Location: ${filters.location}` });
    }
    if (filters.type && filters.type !== 'all') {
        activeFilters.push({ 
            key: 'type', 
            label: filters.type === 'hospital' ? 'Type: Hospital' : 'Type: Clinic' 
        });
    }
    if (filters.specialty && filters.specialty !== 'all-specialties') {
        const specialtyLabel = filters.specialty.split('-').map(w => 
            w.charAt(0).toUpperCase() + w.slice(1)
        ).join(' ');
        activeFilters.push({ key: 'specialty', label: `Specialty: ${specialtyLabel}` });
    }
    if (filters.bedsAvailable) {
        activeFilters.push({ key: 'bedsAvailable', label: 'Beds Available' });
    }
    if (filters.bloodAvailable) {
        activeFilters.push({ key: 'bloodAvailable', label: 'Blood Available' });
    }
    if (filters.oxygenAvailable) {
        activeFilters.push({ key: 'oxygenAvailable', label: 'Oxygen Available' });
    }
    if (filters.openNow) {
        activeFilters.push({ key: 'openNow', label: 'Open Now' });
    }

    if (activeFilters.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Active Filters:</span>
            {activeFilters.map((filter) => (
                <button
                    key={filter.key}
                    onClick={() => onRemoveFilter(filter.key)}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5FA8D3]/10 to-[#63C7B2]/10 border border-[#5FA8D3]/30 text-[#5FA8D3] px-3 py-1.5 rounded-full text-sm font-medium hover:bg-[#5FA8D3]/20 transition-all"
                >
                    {filter.label}
                    <X className="w-3 h-3" />
                </button>
            ))}
            <button
                onClick={onClearAll}
                className="text-sm text-gray-500 hover:text-[#5FA8D3] underline transition-colors"
            >
                Clear All
            </button>
        </div>
    );
}