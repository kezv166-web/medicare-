import React, { useState } from "react";
import { Phone, MapPin, Navigation, Clock, Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PlaceCard({ place, onReport }) {
    const [reporting, setReporting] = useState(false);

    const handleReport = (status) => {
        setReporting(true);
        onReport(place.place_id, status);
        setTimeout(() => setReporting(false), 1000);
    };

    const typeColors = {
        hospital: "bg-[#5FA8D3] text-white",
        clinic: "bg-[#63C7B2] text-white",
        pharmacy: "bg-[#C3F3E8] text-[#5FA8D3]"
    };

    const getTypeLabel = (types) => {
        if (types.includes('hospital')) return 'Hospital';
        if (types.includes('clinic')) return 'Clinic';
        if (types.includes('pharmacy')) return 'Pharmacy';
        return 'Healthcare';
    };

    const formatDistance = (meters) => {
        if (meters < 1000) return `${Math.round(meters)}m`;
        return `${(meters / 1000).toFixed(1)}km`;
    };

    const userReports = place.user_reports || { in_stock: 0, out_of_stock: 0, open: 0, closed: 0 };
    const totalReports = userReports.in_stock + userReports.out_of_stock + userReports.open + userReports.closed;

    return (
        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{place.name}</h3>
                    <Badge className={`${typeColors[place.types[0]]} text-xs`}>
                        {getTypeLabel(place.types)}
                    </Badge>
                </div>
                {place.distance_m !== undefined && (
                    <div className="text-right">
                        <div className="text-sm font-semibold text-[#5FA8D3]">
                            {formatDistance(place.distance_m)}
                        </div>
                        <div className="text-xs text-gray-500">away</div>
                    </div>
                )}
            </div>

            {/* Address */}
            <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                <span className="line-clamp-2">{place.address}</span>
            </div>

            {/* Status & Rating */}
            <div className="flex items-center gap-3 mb-4">
                {place.open_now !== null && (
                    <Badge variant={place.open_now ? "default" : "secondary"} className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {place.open_now ? 'Open Now' : 'Closed'}
                    </Badge>
                )}
                {place.rating && (
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{place.rating}</span>
                        {place.user_ratings_total && (
                            <span className="text-gray-400">({place.user_ratings_total})</span>
                        )}
                    </div>
                )}
            </div>

            {/* User Reports */}
            {totalReports > 0 && (
                <div className="bg-[#F2F2F2] rounded-lg p-3 mb-4">
                    <div className="text-xs font-medium text-gray-700 mb-2">Community Reports</div>
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-4">
                            {place.types.includes('pharmacy') && (
                                <>
                                    <span className="text-green-600 font-medium">
                                        ✓ In Stock: {userReports.in_stock}
                                    </span>
                                    <span className="text-red-600 font-medium">
                                        ✗ Out: {userReports.out_of_stock}
                                    </span>
                                </>
                            )}
                            {(place.types.includes('hospital') || place.types.includes('clinic')) && (
                                <>
                                    <span className="text-green-600 font-medium">
                                        ✓ Open: {userReports.open}
                                    </span>
                                    <span className="text-red-600 font-medium">
                                        ✗ Closed: {userReports.closed}
                                    </span>
                                </>
                            )}
                        </div>
                        {userReports.last_reported && (
                            <span className="text-gray-400">
                                {new Date(userReports.last_reported).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
                {place.phone && (
                    <Button
                        onClick={() => window.open(`tel:${place.phone}`, '_self')}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-[#5FA8D3] text-[#5FA8D3] hover:bg-[#5FA8D3] hover:text-white"
                    >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                    </Button>
                )}
                <Button
                    onClick={() => window.open(place.map_url, '_blank')}
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-[#5FA8D3] to-[#63C7B2] hover:opacity-90"
                >
                    <Navigation className="w-3 h-3 mr-1" />
                    Directions
                </Button>
            </div>

            {/* Report Buttons */}
            <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 mb-2">Report current status:</div>
                <div className="flex gap-2">
                    {place.types.includes('pharmacy') ? (
                        <>
                            <Button
                                onClick={() => handleReport('in_stock')}
                                variant="ghost"
                                size="sm"
                                disabled={reporting}
                                className="flex-1 text-xs hover:bg-green-50 hover:text-green-600"
                            >
                                <ThumbsUp className="w-3 h-3 mr-1" />
                                In Stock
                            </Button>
                            <Button
                                onClick={() => handleReport('out_of_stock')}
                                variant="ghost"
                                size="sm"
                                disabled={reporting}
                                className="flex-1 text-xs hover:bg-red-50 hover:text-red-600"
                            >
                                <ThumbsDown className="w-3 h-3 mr-1" />
                                Out of Stock
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={() => handleReport('open')}
                                variant="ghost"
                                size="sm"
                                disabled={reporting}
                                className="flex-1 text-xs hover:bg-green-50 hover:text-green-600"
                            >
                                <ThumbsUp className="w-3 h-3 mr-1" />
                                Open
                            </Button>
                            <Button
                                onClick={() => handleReport('closed')}
                                variant="ghost"
                                size="sm"
                                disabled={reporting}
                                className="flex-1 text-xs hover:bg-red-50 hover:text-red-600"
                            >
                                <ThumbsDown className="w-3 h-3 mr-1" />
                                Closed
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}