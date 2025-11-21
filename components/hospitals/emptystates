import React from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyState({ onClearFilters }) {
    return (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="bg-gradient-to-br from-[#C3F3E8]/30 to-[#5FA8D3]/10 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Search className="w-12 h-12 text-[#5FA8D3]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No Results Found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any hospitals or clinics matching your filters. Try adjusting your search criteria.
            </p>
            <div className="space-y-3">
                <Button
                    onClick={onClearFilters}
                    className="bg-[#5FA8D3] hover:bg-[#4A8BB5] text-white"
                >
                    <Filter className="w-4 h-4 mr-2" />
                    Clear All Filters
                </Button>
                <p className="text-sm text-gray-500">
                    Suggestions: Try searching in another city or removing specialty filters
                </p>
            </div>
        </div>
    );
}