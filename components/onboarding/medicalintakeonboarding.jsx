import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Edit3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScanPrescriptionCard from "./ScanPrescriptionCard";
import ManualIntakeForm from "./ManualIntakeForm";
import { base44 } from "@/api/base44Client";

export default function MedicalIntakeOnboarding({ onComplete, onSkip }) {
    const [mode, setMode] = useState("choice"); // "choice", "scan", "manual"
    const [scannedData, setScannedData] = useState(null);

    const handleScanComplete = (data) => {
        setScannedData(data);
        setMode("manual");
    };

    const handleFormSubmit = async (formData) => {
        try {
            // Update user profile with patient info
            await base44.auth.updateMe({
                age: formData.patient.age,
                health_conditions: [formData.patient.condition],
                doctor_name: formData.doctor.name,
                doctor_specialty: formData.doctor.specialty,
                doctor_clinic: formData.doctor.clinic,
                doctor_contact: formData.doctor.contact,
                consult_date: formData.doctor.consult_date,
                follow_up_date: formData.doctor.follow_up_date,
                treatment_start_date: formData.treatment.start_date,
                treatment_duration_days: formData.treatment.duration_days,
                food_instructions: formData.instructions.food,
                precautions: formData.instructions.precautions,
                activity_restrictions: formData.instructions.activity
            });

            // Create medicine entries
            const validMedicines = formData.medicines.filter(m => m.name && m.dosage);
            
            for (const medicine of validMedicines) {
                // Calculate next dose time based on frequency
                const nextDoseTime = new Date();
                if (medicine.time_slots && medicine.time_slots.length > 0) {
                    const [hours, minutes] = medicine.time_slots[0].split(':');
                    nextDoseTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                }

                await base44.entities.Medicine.create({
                    name: medicine.name,
                    dosage: medicine.dosage,
                    time_interval: medicine.frequency,
                    next_dose_time: nextDoseTime.toISOString(),
                    active: true
                });
            }

            // Create food recommendations based on condition
            if (formData.instructions.food) {
                await base44.entities.FoodRecommendation.create({
                    name: 'Follow prescribed diet',
                    status: 'safe',
                    reason: formData.instructions.food,
                    health_condition: formData.patient.condition
                });
            }

            // Store onboarding completion flag
            localStorage.setItem('onboarding_completed', 'true');

            // Complete onboarding
            onComplete({
                patient: formData.patient,
                doctor: formData.doctor,
                medicines: validMedicines
            });
        } catch (error) {
            console.error('Error saving onboarding data:', error);
            alert('Failed to save data. Please try again.');
        }
    };

    const handleSkip = () => {
        localStorage.setItem('onboarding_completed', 'true');
        onSkip();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F2F2F2] via-white to-[#C3F3E8]/20 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center bg-gradient-to-r from-[#5FA8D3] to-[#63C7B2] text-white rounded-full px-6 py-2 mb-4">
                        <Sparkles className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Welcome to HealthSync</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Initial Medical Intake
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Let's set up your health profile to help you track medications and stay on top of your wellness journey.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#5FA8D3]"></div>
                        <div className="text-sm text-gray-500">Step 1 of 1</div>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {mode === "choice" && (
                        <motion.div
                            key="choice"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="grid md:grid-cols-2 gap-6"
                        >
                            {/* Scan Option */}
                            <motion.div
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                onClick={() => setMode("scan")}
                                className="bg-gradient-to-br from-white to-[#5FA8D3]/5 rounded-3xl p-8 shadow-xl border border-gray-100 cursor-pointer group"
                            >
                                <div className="bg-gradient-to-br from-[#5FA8D3] to-[#4A8BB5] rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <FileText className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    Scan Prescription
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Upload a photo of your prescription and we'll extract the information automatically if readable.
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="inline-block bg-[#C3F3E8] text-[#5FA8D3] text-xs font-medium px-3 py-1 rounded-full">
                                        Optional
                                    </span>
                                    <span className="text-sm text-gray-500">• Quick & Easy</span>
                                </div>
                            </motion.div>

                            {/* Manual Option */}
                            <motion.div
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                onClick={() => setMode("manual")}
                                className="bg-gradient-to-br from-white to-[#63C7B2]/5 rounded-3xl p-8 shadow-xl border border-gray-100 cursor-pointer group"
                            >
                                <div className="bg-gradient-to-br from-[#63C7B2] to-[#4FA89A] rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Edit3 className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    Manual Entry
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Fill out a detailed medical intake form with all your health information manually.
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="inline-block bg-[#C3F3E8] text-[#63C7B2] text-xs font-medium px-3 py-1 rounded-full">
                                        Recommended
                                    </span>
                                    <span className="text-sm text-gray-500">• Complete Control</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {mode === "scan" && (
                        <motion.div
                            key="scan"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Button
                                onClick={() => setMode("choice")}
                                variant="ghost"
                                className="mb-6 text-gray-600 hover:text-gray-900"
                            >
                                ← Back to Options
                            </Button>
                            <ScanPrescriptionCard
                                onScanComplete={handleScanComplete}
                                onSwitchToManual={() => setMode("manual")}
                            />
                        </motion.div>
                    )}

                    {mode === "manual" && (
                        <motion.div
                            key="manual"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            {!scannedData && (
                                <Button
                                    onClick={() => setMode("choice")}
                                    variant="ghost"
                                    className="mb-6 text-gray-600 hover:text-gray-900"
                                >
                                    ← Back to Options
                                </Button>
                            )}
                            <ManualIntakeForm
                                initialData={scannedData}
                                onSubmit={handleFormSubmit}
                                onCancel={handleSkip}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}