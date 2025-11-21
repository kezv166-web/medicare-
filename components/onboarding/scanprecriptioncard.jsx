import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Camera, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function ScanPrescriptionCard({ onScanComplete, onSwitchToManual }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [scanResult, setScanResult] = useState(null);

    // Mock OCR processing with confidence score
    const processPrescriptionImage = async (file) => {
        setIsProcessing(true);
        
        try {
            // Upload the file first
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            
            // Simulate OCR processing (in production, use real OCR service)
            await new Promise(resolve => setTimeout(resolve, 2500));
            
            // Mock confidence score (70% chance of high confidence for demo)
            const confidence = Math.random() > 0.3 ? 0.85 : 0.45;
            
            if (confidence >= 0.7) {
                // High confidence - return parsed data
                const mockData = {
                    confidence,
                    patient: {
                        full_name: "John Doe",
                        age: "35",
                        condition: "Bacterial Infection"
                    },
                    doctor: {
                        name: "Dr. Sarah Johnson",
                        specialty: "Internal Medicine",
                        clinic: "City Health Clinic",
                        contact: "(555) 123-4567",
                        consult_date: new Date().toISOString().split('T')[0]
                    },
                    medicines: [
                        {
                            name: "Amoxicillin",
                            dosage: "500mg",
                            frequency: "Three times daily",
                            duration_days: "7",
                            quantity_remaining: "21",
                            notes: "Take with food"
                        }
                    ],
                    treatment: {
                        start_date: new Date().toISOString().split('T')[0],
                        duration_days: "7"
                    },
                    instructions: {
                        food: "Take antibiotics with food",
                        precautions: "Complete full course even if feeling better",
                        activity: "Rest and stay hydrated"
                    }
                };
                
                setScanResult({ success: true, data: mockData, imageUrl: file_url });
            } else {
                // Low confidence - show error
                setScanResult({ 
                    success: false, 
                    confidence,
                    message: "We couldn't reliably read this prescription. The image may be blurry, have poor lighting, or contain handwriting that's difficult to parse.",
                    imageUrl: file_url 
                });
            }
        } catch (error) {
            setScanResult({ 
                success: false, 
                message: "Failed to process image. Please try again or use the manual form.",
                imageUrl: null 
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            processPrescriptionImage(file);
        }
    };

    const handleAcceptScan = () => {
        if (scanResult?.success) {
            onScanComplete(scanResult.data);
        }
    };

    const handleRetry = () => {
        setScanResult(null);
    };

    if (isProcessing) {
        return (
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
                <Loader2 className="w-16 h-16 mx-auto mb-6 text-[#5FA8D3] animate-spin" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Processing Your Prescription
                </h3>
                <p className="text-gray-600">
                    Using advanced OCR to extract medical information...
                </p>
            </div>
        );
    }

    if (scanResult) {
        if (scanResult.success) {
            return (
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-green-100 rounded-full p-3">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Prescription Scanned Successfully
                            </h3>
                            <p className="text-sm text-gray-600">
                                Confidence: {Math.round(scanResult.data.confidence * 100)}%
                            </p>
                        </div>
                    </div>

                    {scanResult.imageUrl && (
                        <img 
                            src={scanResult.imageUrl} 
                            alt="Scanned prescription" 
                            className="w-full h-48 object-cover rounded-xl mb-6"
                        />
                    )}

                    <div className="bg-[#C3F3E8]/30 rounded-xl p-4 mb-6 space-y-3 text-sm">
                        <p className="font-medium text-gray-700">Extracted Information:</p>
                        <div className="grid grid-cols-2 gap-2 text-gray-600">
                            <div>Patient: <span className="font-medium">{scanResult.data.patient?.full_name}</span></div>
                            <div>Condition: <span className="font-medium">{scanResult.data.patient?.condition}</span></div>
                            <div>Doctor: <span className="font-medium">{scanResult.data.doctor?.name}</span></div>
                            <div>Medicines: <span className="font-medium">{scanResult.data.medicines?.length || 0} found</span></div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">
                        Please review and edit the extracted information in the next step.
                    </p>

                    <div className="flex gap-3">
                        <Button
                            onClick={handleAcceptScan}
                            className="flex-1 bg-[#5FA8D3] hover:bg-[#4A8BB5] text-white"
                        >
                            Review & Edit Details
                        </Button>
                        <Button
                            onClick={handleRetry}
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                            Retry Scan
                        </Button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-red-100 rounded-full p-3">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Couldn't Read Prescription
                            </h3>
                            {scanResult.confidence && (
 