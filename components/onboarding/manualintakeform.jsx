import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, Loader2 } from "lucide-react";
import MedicineEntryFields from "./MedicineEntryFields";
import { base44 } from "@/api/base44Client";

export default function ManualIntakeForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        patient: {
            full_name: "",
            age: "",
            condition: ""
        },
        doctor: {
            name: "",
            specialty: "",
            clinic: "",
            contact: "",
            consult_date: "",
            follow_up_date: ""
        },
        medicines: [
            {
                name: "",
                dosage: "",
                frequency: "",
                time_slots: [],
                duration_days: "",
                quantity_remaining: "",
                notes: ""
            }
        ],
        treatment: {
            start_date: new Date().toISOString().split('T')[0],
            duration_days: ""
        },
        instructions: {
            food: "",
            precautions: "",
            activity: "",
            file_url: ""
        }
    });

    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(prevData => ({
                ...prevData,
                ...initialData,
                patient: { ...prevData.patient, ...initialData.patient },
                doctor: { ...prevData.doctor, ...initialData.doctor },
                medicines: initialData.medicines?.length > 0 ? initialData.medicines : prevData.medicines,
                treatment: { ...prevData.treatment, ...initialData.treatment },
                instructions: { ...prevData.instructions, ...initialData.instructions }
            }));
        }
    }, [initialData]);

    // Auto-calculate treatment end date
    useEffect(() => {
        if (formData.treatment.start_date && formData.treatment.duration_days) {
            const startDate = new Date(formData.treatment.start_date);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + parseInt(formData.treatment.duration_days || 0));
            setFormData(prev => ({
                ...prev,
                treatment: {
                    ...prev.treatment,
                    end_date: endDate.toISOString().split('T')[0]
                }
            }));
        }
    }, [formData.treatment.start_date, formData.treatment.duration_days]);

    const handlePatientChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            patient: { ...prev.patient, [field]: value }
        }));
    };

    const handleDoctorChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            doctor: { ...prev.doctor, [field]: value }
        }));
    };

    const handleMedicineChange = (index, updatedMedicine) => {
        const newMedicines = [...formData.medicines];
        newMedicines[index] = updatedMedicine;
        setFormData(prev => ({ ...prev, medicines: newMedicines }));
    };

    const addMedicine = () => {
        setFormData(prev => ({
            ...prev,
            medicines: [
                ...prev.medicines,
                {
                    name: "",
                    dosage: "",
                    frequency: "",
                    time_slots: [],
                    duration_days: "",
                    quantity_remaining: "",
                    notes: ""
                }
            ]
        }));
    };

    const removeMedicine = (index) => {
        setFormData(prev => ({
            ...prev,
            medicines: prev.medicines.filter((_, i) => i !== index)
        }));
    };

    const handleTreatmentChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            treatment: { ...prev.treatment, [field]: value }
        }));
    };

    const handleInstructionsChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            instructions: { ...prev.instructions, [field]: value }
        }));
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            try {
                const { file_url } = await base44.integrations.Core.UploadFile({ file });
                handleInstructionsChange('file_url', file_url);
            } catch (error) {
                console.error("File upload failed:", error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const validateForm = () => {
        // Basic validation
        if (!formData.patient.full_name || !formData.patient.condition) {
            alert("Please fill in patient name and health condition");
            return false;
        }
        
        const validMedicines = formData.medicines.filter(m => 
            m.name && m.dosage && m.frequency && m.duration_days
        );
        
        if (validMedicines.length === 0) {
            alert("Please add at least one complete medicine entry");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header with OCR indicator */}
            {initialData && (
                <div className="bg-[#C3F3E8]/30 rounded-xl p-4 border border-[#63C7B2]/30">
                    <p className="text-sm text-gray-700">
                        ✨ <strong>Pre-filled from scan.</strong> Please review and edit as needed.
                    </p>
                </div>
            )}

            {/* SECTION A - Patient Info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="bg-[#5FA8D3] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">A</span>
                    Patient Information
                </h3>
                
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <Input
                                value={formData.patient.full_name}
                                onChange={(e) => handlePatientChange('full_name', e.target.value)}
                                placeholder="Enter your full name"
                                className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Age
                            </label>
                            <Input
                                type="number"
                                value={formData.patient.age}
                                onChange={(e) => handlePatientChange('age', e.target.value)}
                                placeholder="Enter age"
                                className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Health Condition / Diagnosis *
                        </label>
                        <Input
                            value={formData.patient.condition}
                            onChange={(e) => handlePatientChange('condition', e.target.value)}
                            placeholder="e.g., Bacterial Infection, Hypertension"
                            className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* SECTION B - Doctor Details */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="bg-[#63C7B2] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">B</span>
                    Doctor Details
                </h3>
                
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Doctor Name
                            </label>
                            <Input
                                value={formData.doctor.name}
                                onChange={(e) => handleDoctorChange('name', e.target.value)}
                                placeholder="Dr. Name"
                                className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Specialty
                            </label>
                            <Input
                                value={formData.doctor.specialty}
                                onChange={(e) => handleDoctorChange('specialty', e.target.value)}
                                placeholder="e.g., Cardiology"
                                className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Clinic / Hospital
                            </label>
                            <Input
                                value={formData.doctor.clinic}
                                onChange={(e) => handleDoctorChange('clinic', e.target.value)}
                                placeholder="Facility name"
                                className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Number
                            </label>
                            <Input
                                type="tel"
                                value={formData.doctor.contact}
                                onChange={(e) => handleDoctorChange('contact', e.target.value)}
                                placeholder="(555) 123-4567"
                                className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Consultation Date
                            </label>
                            <Input
                                type="date"
                                value={formData.doctor.consult_date}
                                onChange={(e) => handleDoctorChange('consult_date', e.target.value)}
                                className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Next Follow-Up Date (Optional)
                            </label>
                            <Input
                                type="date"
                                value={formData.doctor.follow_up_date}
                                onChange={(e) => handleDoctorChange('follow_up_date', e.target.value)}
                                className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION C - Medicines */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="bg-[#5FA8D3] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">C</span>
                    Medicines
                </h3>
                
                <div className="space-y-6">
                    {formData.medicines.map((medicine, index) => (
                        <MedicineEntryFields
                            key={index}
                            medicine={medicine}
                            index={index}
                            onChange={handleMedicineChange}
                            onRemove={removeMedicine}
                            canRemove={formData.medicines.length > 1}
                        />
                    ))}

                    <Button
                        type="button"
                        onClick={addMedicine}
                        variant="outline"
                        className="w-full border-dashed border-2 border-[#5FA8D3] text-[#5FA8D3] hover:bg-[#C3F3E8]/30 h-14"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Another Medicine
                    </Button>
                </div>
            </div>

            {/* SECTION D - Treatment Overview */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="bg-[#63C7B2] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">D</span>
                    Treatment Overview
                </h3>
                
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Date
                            </label>
                            <Input
                                type="date"
                                value={formData.treatment.start_date}
                                onChange={(e) => handleTreatmentChange('start_date', e.target.value)}
                                className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Duration (days)
                            </label>
                            <Input
                                type="number"
                                value={formData.treatment.duration_days}
                                onChange={(e) => handleTreatmentChange('duration_days', e.target.value)}
                                placeholder="e.g., 7"
                                className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expected End Date
                            </label>
                            <Input
                                type="date"
                                value={formData.treatment.end_date || ""}
                                onChange={(e) => handleTreatmentChange('end_date', e.target.value)}
                                className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3] bg-gray-50"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION E - Additional Instructions */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="bg-[#5FA8D3] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">E</span>
                    Additional Instructions
                </h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Food Instructions
                        </label>
                        <Textarea
                            value={formData.instructions.food}
                            onChange={(e) => handleInstructionsChange('food', e.target.value)}
                            placeholder="e.g., Take with meals, avoid dairy products..."
                            rows={2}
                            className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3] resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Precautions
                        </label>
                        <Textarea
                            value={formData.instructions.precautions}
                            onChange={(e) => handleInstructionsChange('precautions', e.target.value)}
                            placeholder="e.g., Avoid alcohol, may cause drowsiness..."
                            rows={2}
                            className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3] resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Activity Restrictions
                        </label>
                        <Textarea
                            value={formData.instructions.activity}
                            onChange={(e) => handleInstructionsChange('activity', e.target.value)}
                            placeholder="e.g., Rest, avoid heavy lifting..."
                            rows={2}
                            className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3] resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Supporting Documents (Optional)
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="flex-1">
                                <input
                                    type="file"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="doc-upload"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById('doc-upload').click()}
                                    disabled={isUploading}
                                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4 mr-2" />
                                            Upload File
                                        </>
                                    )}
                                </Button>
                            </label>
                            {formData.instructions.file_url && (
                                <a
                                    href={formData.instructions.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-[#5FA8D3] hover:underline"
                                >
                                    View uploaded file
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#5FA8D3] hover:bg-[#4A8BB5] text-white h-14 text-lg"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        "Save & Continue"
                    )}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 h-14 px-8"
                >
                    Skip for Now
                </Button>
            </div>
        </form>
    );
}