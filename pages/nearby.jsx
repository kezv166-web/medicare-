import React, { useState, useEffect, useMemo } from "react";
import { MapPin, AlertCircle, Loader2, Building2, Stethoscope, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import NearbyFilters from "../components/nearby/NearbyFilters";
import PlaceCard from "../components/nearby/PlaceCard";
import HospitalCard from "../components/hospitals/HospitalCard";
import ClinicCard from "../components/hospitals/ClinicCard";
import DetailsModal from "../components/hospitals/DetailsModal";
import FilterChips from "../components/hospitals/FilterChips";
import LoadingSkeleton from "../components/hospitals/LoadingSkeleton";
import { 
    fetchNearbyPlaces, 
    getUserLocation, 
    geocodeAddress,
    saveUserReport,
    mergePlacesWithReports
} from "../components/nearby/placesUtils";

export default function NearbyPage() {
    const [filters, setFilters] = useState({
        searchQuery: "",
        type: "all",
        radius: "5000",
        sortBy: "distance",
        openNow: false,
        specialty: "all-specialties",
        bedsAvailable: false,
        bloodAvailable: false,
        oxygenAvailable: false
    });

    const [places, setPlaces] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [dataSource, setDataSource] = useState(null);
    const [error, setError] = useState(null);
    const [locationDenied, setLocationDenied] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Request user location on mount
    useEffect(() => {
        requestUserLocation();
    }, []);

    const requestUserLocation = async () => {
        try {
            setIsSearching(true);
            setError(null);
            const location = await getUserLocation();
            setUserLocation(location);
            setLocationDenied(false);
            // Fetch places with user location
            await searchPlaces(location);
        } catch (err) {
            console.error('Geolocation error:', err);
            setLocationDenied(true);
            setError('Location access denied. Please enter your location manually.');
            setIsSearching(false);
        }
    };

    const searchPlaces = async (location = userLocation) => {
        if (!location && !filters.searchQuery) {
            setError('Please allow location access or enter a location.');
            return;
        }

        try {
            setIsSearching(true);
            setError(null);

            let searchLocation = location;

            // If no location but search query exists, geocode it
            if (!searchLocation && filters.searchQuery) {
                searchLocation = await geocodeAddress(filters.searchQuery);
                setUserLocation(searchLocation);
            }

            // Fetch places
            const response = await fetchNearbyPlaces({
                lat: searchLocation.lat,
                lon: searchLocation.lon,
                radius: parseInt(filters.radius),
                type: filters.type,
                searchQuery: filters.searchQuery
            });

            // Merge with user reports
            const placesWithReports = mergePlacesWithReports(response.results);
            setPlaces(placesWithReports);
            setDataSource(response.source);

            if (response.error) {
                setError(`Using demo data: ${response.error}`);
            }
        } catch (err) {
            console.error('Search error:', err);
            setError('Failed to fetch places. Showing demo data.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleSearch = () => {
        searchPlaces();
    };

    const handleReport = (placeId, status) => {
        const updatedReport = saveUserReport(placeId, status);
        if (updatedReport) {
            // Update the place in the list
            setPlaces(prev => prev.map(place => 
                place.place_id === placeId 
                    ? { ...place, user_reports: updatedReport }
                    : place
            ));
        }
    };

    const handleViewDetails = (facility) => {
        setSelectedFacility(facility);
        setModalOpen(true);
    };

    const handleRemoveFilter = (filterKey) => {
        switch (filterKey) {
            case 'location':
                setFilters(prev => ({ ...prev, searchQuery: "" }));
                break;
            case 'type':
                setFilters(prev => ({ ...prev, type: "all" }));
                break;
            case 'specialty':
                setFilters(prev => ({ ...prev, specialty: "all-specialties" }));
                break;
            case 'bedsAvailable':
                setFilters(prev => ({ ...prev, bedsAvailable: false }));
                break;
            case 'bloodAvailable':
                setFilters(prev => ({ ...prev, bloodAvailable: false }));
                break;
            case 'oxygenAvailable':
                setFilters(prev => ({ ...prev, oxygenAvailable: false }));
                break;
            case 'openNow':
                setFilters(prev => ({ ...prev, openNow: false }));
                break;
            default:
                break;
        }
    };

    const convertAvailability = (place) => {
        if (place.availability) return place.availability;
        
        return {
            beds: place.beds_available > 20 ? 'high' : place.beds_available > 0 ? 'medium' : 'low',
            blood: place.blood_available ? 'high' : 'low',
            oxygen: place.oxygen_available ? 'high' : 'low'
        };
    };

    // Filter and sort places
    const filteredPlaces = useMemo(() => {
        let results = [...places];

        // Filter by type
        if (filters.type !== 'all') {
            results = results.filter(place => place.types.includes(filters.type));
        }

        // Filter by specialty
        if (filters.specialty !== "all-specialties") {
            results = results.filter(place =>
                place.specialties?.some(s =>
                    s.toLowerCase().replace(/\s+/g, '-') === filters.specialty
                )
            );
        }

        // Filter by availability
        if (filters.bedsAvailable) {
            results = results.filter(place => place.beds_available > 0);
        }
        if (filters.bloodAvailable) {
            results = results.filter(place => place.blood_available === true);
        }
        if (filters.oxygenAvailable) {
            results = results.filter(place => place.oxygen_available === true);
        }

        // Filter by open now
        if (filters.openNow) {
            results = results.filter(place => place.open_now === true);
        }

        // Sort
        switch (filters.sortBy) {
            case 'distance':
                results.sort((a, b) => (a.distance_m || 0) - (b.distance_m || 0));
                break;
            case 'rating':
                results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'availability':
                results.sort((a, b) => {
                    const scoreA = (a.beds_available > 0 ? 3 : 0) + (a.blood_available ? 2 : 0) + (a.oxygen_available ? 1 : 0);
                    const scoreB = (b.beds_available > 0 ? 3 : 0) + (b.blood_available ? 2 : 0) + (b.oxygen_available ? 1 : 0);
                    return scoreB - scoreA;
                });
                break;
            case 'alphabetical':
                results.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'user_reports':
                results.sort((a, b) => {
                    const getTotalReports = (place) => {
                        const r = place.user_reports || {};
                        return (r.in_stock || 0) + (r.out_of_stock || 0) + 
                               (r.open || 0) + (r.closed || 0);
                    };
                    return getTotalReports(b) - getTotalReports(a);
                });
                break;
            default:
                break;
        }

        return results;
    }, [places, filters]);

    const hospitals = useMemo(() => 
        filteredPlaces.filter(f => f.types.includes('hospital')),
        [filteredPlaces]
    );

    const clinics = useMemo(() => 
        filteredPlaces.filter(f => f.types.includes('clinic')),
        [filteredPlaces]
    );

    const pharmacies = useMemo(() => 
        filteredPlaces.filter(f => f.types.includes('pharmacy')),
        [filteredPlaces]
    );

    return (
        <div className="min-h-screen bg-[#F2F2F2]">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#5FA8D3] to-[#63C7B2] text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                        Nearby Healthcare
                    </h1>
                    <p className="text-lg text-white/90">
                        Find hospitals, clinics, and pharmacies near you with real-time community updates
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Filters */}
                <NearbyFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                    isSearching={isSearching}
                />

                {/* Data Source Alert */}
                {dataSource === 'mock' && (
                    <Alert className="mb-6 bg-yellow-50 border-yellow-200">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-800">
                            Showing demo data. Real-time data will be available when Google Places API is configured.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Location Denied Alert */}
                {locationDenied && (
                    <Alert className="mb-6 bg-blue-50 border-blue-200">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800 flex items-center justify-between">
                            <span>Location access denied. Enter your location manually to search.</span>
                            <Button
                                onClick={requestUserLocation}
                                size="sm"
                                variant="outline"
                                className="ml-4 border-blue-300 text-blue-700 hover:bg-blue-100"
                            >
                                Retry
                            </Button>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Error Alert */}
                {error && (
                    <Alert className="mb-6 bg-red-50 border-red-200">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">{error}</AlertDescription>
                    </Alert>
                )}

                {/* Filter Chips & Result Count */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex-1">
                        <FilterChips
                            filters={filters}
                            onRemoveFilter={handleRemoveFilter}
                            onClearAll={() => setFilters({
                                searchQuery: "",
                                type: "all",
                                radius: "5000",
                                sortBy: "distance",
                                openNow: false,
                                specialty: "all-specialties",
                                bedsAvailable: false,
                                bloodAvailable: false,
                                oxygenAvailable: false
                            })}
                        />
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                        {isSearching ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-[#5FA8D3] border-t-transparent rounded-full animate-spin"></div>
                                Searching...
                            </span>
                        ) : filteredPlaces.length > 0 ? (
                            <span>
                                Showing <span className="text-[#5FA8D3] font-bold">{filteredPlaces.length}</span> results
                            </span>
                        ) : null}
                    </div>
                </div>

                {/* Loading State */}
                {isSearching && places.length === 0 && (
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hospitals</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {[1, 2].map(i => <LoadingSkeleton key={i} type="hospital" />)}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Clinics</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {[1, 2, 3].map(i => <LoadingSkeleton key={i} type="clinic" />)}
                            </div>
                        </div>
                    </div>
                )}

                {/* Results - Grouped by Type */}
                {!isSearching && filteredPlaces.length > 0 && (
                    <div className="space-y-12">
                        {/* Hospitals Section */}
                        {(filters.type === "all" || filters.type === "hospital") && hospitals.length > 0 && (
                            <section className="animate-fadeIn">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-[#5FA8D3] rounded-xl p-3">
                                        <Building2 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Hospitals</h2>
                                        <p className="text-sm text-gray-600">
                                            {hospitals.length} {hospitals.length === 1 ? 'hospital' : 'hospitals'} found
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {hospitals.map(hospital => (
                                        <HospitalCard
                                            key={hospital.place_id}
                                            hospital={{
                                                ...hospital,
                                                id: hospital.place_id,
                                                topDoctors: hospital.topDoctors || [],
                                                availability: convertAvailability(hospital),
                                                services: hospital.services || []
                                            }}
                                            onViewDetails={handleViewDetails}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Clinics Section */}
                        {(filters.type === "all" || filters.type === "clinic") && clinics.length > 0 && (
                            <section className="animate-fadeIn">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-[#63C7B2] rounded-xl p-3">
                                        <Stethoscope className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Private Clinics</h2>
                                        <p className="text-sm text-gray-600">
                                            {clinics.length} {clinics.length === 1 ? 'clinic' : 'clinics'} found
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {clinics.map(clinic => (
                                        <ClinicCard
                                            key={clinic.place_id}
                                            clinic={{
                                                ...clinic,
                                                id: clinic.place_id,
                                                doctors: clinic.doctors || []
                                            }}
                                            onViewDetails={handleViewDetails}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Pharmacies Section */}
                        {(filters.type === "all" || filters.type === "pharmacy") && pharmacies.length > 0 && (
                            <section className="animate-fadeIn">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-[#C3F3E8] rounded-xl p-3">
                                        <Pill className="w-6 h-6 text-[#5FA8D3]" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Pharmacies</h2>
                                        <p className="text-sm text-gray-600">
                                            {pharmacies.length} {pharmacies.length === 1 ? 'pharmacy' : 'pharmacies'} found
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {pharmacies.map((place) => (
                                        <PlaceCard
                                            key={place.place_id}
                                            place={place}
                                            onReport={handleReport}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}

                {/* No Results */}
                {!isSearching && filteredPlaces.length === 0 && places.length > 0 && (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                        <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Results Found</h3>
                        <p className="text-gray-600 mb-6">
                            Try adjusting your filters or search criteria
                        </p>
                        <Button
                            onClick={() => {
                                setFilters({
                                    searchQuery: "",
                                    type: "all",
                                    radius: "5000",
                                    sortBy: "distance",
                                    openNow: false
                                });
                                searchPlaces();
                            }}
                            className="bg-[#5FA8D3] hover:bg-[#4A8BB5]"
                        >
                            Reset Filters
                        </Button>
                    </div>
                )}

                {/* Empty State */}
                {!isSearching && places.length === 0 && !locationDenied && (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                        <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Start Your Search</h3>
                        <p className="text-gray-600">
                            Allow location access or enter a location to find nearby healthcare facilities
                        </p>
                    </div>
                )}
            </div>

            {/* Details Modal */}
            <DetailsModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                facility={selectedFacility}
            />
        </div>
    );
}