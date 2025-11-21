import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, MapPin, RefreshCw } from "lucide-react";

const SPECIALTIES = [
    "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "General Surgery",
    "Emergency Medicine", "Internal Medicine", "Family Medicine", "Radiology",
    "Oncology", "Dermatology", "Ophthalmology", "Gynecology", "Psychiatry"
];

export default function NearbyFilters({ filters, onFilterChange, onSearch, isSearching }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search Box */}
                <div className="lg:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Search Location
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Enter pincode, city, or area..."
                            value={filters.searchQuery}
                            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                            className="pl-10 border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                        />
                    </div>
                </div>

                {/* Type Filter */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Type
                    </label>
                    <Select
                        value={filters.type}
                        onValueChange={(value) => onFilterChange('type', value)}
                    >
                        <SelectTrigger className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]">
                            <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="hospital">Hospitals</SelectItem>
                            <SelectItem value="clinic">Clinics</SelectItem>
                            <SelectItem value="pharmacy">Pharmacies</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Radius Filter */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Radius
                    </label>
                    <Select
                        value={filters.radius}
                        onValueChange={(value) => onFilterChange('radius', value)}
                    >
                        <SelectTrigger className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]">
                            <SelectValue placeholder="5 km" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1000">1 km</SelectItem>
                            <SelectItem value="3000">3 km</SelectItem>
                            <SelectItem value="5000">5 km</SelectItem>
                            <SelectItem value="10000">10 km</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Additional Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
                {/* Specialty Filter */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Specialty
                    </label>
                    <Select
                        value={filters.specialty}
                        onValueChange={(value) => onFilterChange('specialty', value)}
                    >
                        <SelectTrigger className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]">
                            <SelectValue placeholder="All Specialties" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-specialties">All Specialties</SelectItem>
                            {SPECIALTIES.map(spec => (
                                <SelectItem key={spec} value={spec.toLowerCase().replace(/\s+/g, '-')}>
                                    {spec}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Sort By */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Sort By
                    </label>
                    <Select
                        value={filters.sortBy}
                        onValueChange={(value) => onFilterChange('sortBy', value)}
                    >
                        <SelectTrigger className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]">
                            <SelectValue placeholder="Distance" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="distance">Distance</SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                            <SelectItem value="availability">Availability</SelectItem>
                            <SelectItem value="alphabetical">Alphabetical</SelectItem>
                            <SelectItem value="user_reports">User Reports</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Availability Toggles */}
                <div className="flex items-end">
                    <Button
                        onClick={() => onFilterChange('bedsAvailable', !filters.bedsAvailable)}
                        variant={filters.bedsAvailable ? "default" : "outline"}
                        size="sm"
                        className={`w-full text-xs ${filters.bedsAvailable ? 'bg-[#63C7B2] hover:bg-[#5FA8D3]' : 'border-gray-200'}`}
                    >
                        {filters.bedsAvailable ? '✓ ' : ''}Beds Available
                    </Button>
                </div>

                <div className="flex items-end gap-2">
                    <Button
                        onClick={() => onFilterChange('bloodAvailable', !filters.bloodAvailable)}
                        variant={filters.bloodAvailable ? "default" : "outline"}
                        size="sm"
                        className={`flex-1 text-xs ${filters.bloodAvailable ? 'bg-[#63C7B2] hover:bg-[#5FA8D3]' : 'border-gray-200'}`}
                    >
                        {filters.bloodAvailable ? '✓ ' : ''}Blood
                    </Button>
                    <Button
                        onClick={() => onFilterChange('oxygenAvailable', !filters.oxygenAvailable)}
                        variant={filters.oxygenAvailable ? "default" : "outline"}
                        size="sm"
                        className={`flex-1 text-xs ${filters.oxygenAvailable ? 'bg-[#63C7B2] hover:bg-[#5FA8D3]' : 'border-gray-200'}`}
                    >
                        {filters.oxygenAvailable ? '✓ ' : ''}Oxygen
                    </Button>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                    <Button
                        onClick={onSearch}
                        disabled={isSearching}
                        className="w-full bg-gradient-to-r from-[#5FA8D3] to-[#63C7B2] hover:opacity-90"
                    >
                        {isSearching ? (
                            <>
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                Searching...
                            </>
                        ) : (
                            <>
                                <Search className="w-4 h-4 mr-2" />
                                Search
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}