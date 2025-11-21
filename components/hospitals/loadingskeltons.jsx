import React from "react";

export default function LoadingSkeleton({ type = "hospital" }) {
    return (
        <div className="animate-pulse">
            <div className={`bg-white rounded-2xl p-6 shadow-md border border-gray-100 ${
                type === "clinic" ? "h-[320px]" : "h-[420px]"
            }`}>
                {/* Header */}
                <div className="mb-4">
                    <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>

                {/* Doctors */}
                <div className="mb-4 pb-4 border-b border-gray-100">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                    <div className="space-y-2">
                        <div className="h-12 bg-gray-200 rounded-lg"></div>
                        <div className="h-12 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>

                {/* Availability */}
                {type === "hospital" && (
                    <div className="mb-4">
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="space-y-2">
                            <div className="h-10 bg-gray-200 rounded-lg"></div>
                            <div className="h-10 bg-gray-200 rounded-lg"></div>
                            <div className="h-10 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                    <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}