import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Filter, RefreshCw, Navigation, Loader2 } from "lucide-react";

export default function FiltersBar({ filters, onFilterChange, onReset, onNearbySearch, locationPermission }) {
    const [loadingLocation, setLoadingLocation] = useState(false);
    const specialties = [
        "All Specialties",
        "Cardiology",
        "Neurology",
        "Orthopedics",
        "Pediatrics",
        "General Medicine",
        "Emergency Care",
        "Radiology",
        "Surgery"
    ];

    const handleChange = (key, value) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const handleFindNearby = async () => {
        setLoadingLocation(true);
        try {
            if (!navigator.geolocation) {
                alert("Geolocation is not supported by your browser");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    onNearbySearch(userLocation);
                    setLoadingLocation(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Unable to get your location. Please check your browser permissions.");
                    setLoadingLocation(false);
                }
            );
        } catch (error) {
            console.error("Geolocation error:", error);
            setLoadingLocation(false);
        }
    };

    return (
        <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-[#5FA8D3]" />
                        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                    </div>
                    <Button
                        onClick={handleFindNearby}
                        disabled={loadingLocation}
                        className="bg-gradient-to-r from-[#5FA8D3] to-[#63C7B2] hover:from-[#4A8BB5] hover:to-[#5FA8D3] text-white"
                    >
                        {loadingLocation ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Finding...
                            </>
                        ) : (
                            <>
                                <Navigation className="w-4 h-4 mr-2" />
                                Find Nearby
                            </>
                        )}
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
                    {/* Location */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Location / City
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                value={filters.location}
                                onChange={(e) => handleChange('location', e.target.value)}
                                placeholder="Enter city name"
                                className="pl-10 border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                            />
                        </div>
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Type
                        </label>
                        <Select
                            value={filters.type}
                            onValueChange={(value) => handleChange('type', value)}
                        >
                            <SelectTrigger className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]">
                                <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="hospital">Hospital</SelectItem>
                                <SelectItem value="clinic">Private Clinic</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Specialty */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Doctor Specialty
                        </label>
                        <Select
                            value={filters.specialty}
                            onValueChange={(value) => handleChange('specialty', value)}
                        >
                            <SelectTrigger className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]">
                                <SelectValue placeholder="All Specialties" />
                            </SelectTrigger>
                            <SelectContent>
                                {specialties.map(specialty => (
                                    <SelectItem key={specialty} value={specialty.toLowerCase().replace(/\s+/g, '-')}>
                                        {specialty}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sort */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Sort By
                        </label>
                        <Select
                            value={filters.sortBy}
                            onValueChange={(value) => handleChange('sortBy', value)}
                        >
                            <SelectTrigger className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]">
                                <SelectValue placeholder="Rating" />
                            </SelectTrigger>
                            <SelectContent>
                                {locationPermission === 'granted' && (
                                    <SelectItem value="distance">Distance</SelectItem>
                                )}
                                {locationPermission === 'denied' && (
                                    <SelectItem value="distance" disabled>
                                        Distance (Enable location)
                                    </SelectItem>
                                )}
                                <SelectItem value="rating">Rating</SelectItem>
                                <SelectItem value="availability">Availability</SelectItem>
                                <SelectItem value="alphabetical">Alphabetical</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Reset Button */}
                    <div className="flex items-end">
                        <Button
                            onClick={onReset}
                            variant="outline"
                            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Reset
                        </Button>
                    </div>
                </div>

                {/* Availability Toggles */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => handleChange('bedsAvailable', !filters.bedsAvailable)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            filters.bedsAvailable
                                ? 'bg-[#5FA8D3] text-white shadow-sm'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Beds Available
                    </button>
                    <button
                        onClick={() => handleChange('bloodAvailable', !filters.bloodAvailable)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            filters.bloodAvailable
                                ? 'bg-[#63C7B2] text-white shadow-sm'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Blood Available
                    </button>
                    <button
                        onClick={() => handleChange('oxygenAvailable', !filters.oxygenAvailable)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            filters.oxygenAvailable
                                ? 'bg-[#C3F3E8] text-[#5FA8D3] shadow-sm border border-[#63C7B2]'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Oxygen Cylinders
                    </button>
                </div>
            </div>
        </div>
    );
}