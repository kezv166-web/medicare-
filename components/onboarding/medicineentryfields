import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";

export default function MedicineEntryFields({ medicine, index, onChange, onRemove, canRemove }) {
    const frequencyOptions = [
        "Once daily",
        "Twice daily",
        "Three times daily",
        "Four times daily",
        "Every 6 hours",
        "Every 8 hours",
        "Every 12 hours",
        "As needed",
        "Custom"
    ];

    const handleChange = (field, value) => {
        onChange(index, { ...medicine, [field]: value });
    };

    const handleTimeSlotChange = (slotIndex, value) => {
        const newTimeSlots = [...(medicine.time_slots || [])];
        newTimeSlots[slotIndex] = value;
        handleChange('time_slots', newTimeSlots);
    };

    const addTimeSlot = () => {
        const newTimeSlots = [...(medicine.time_slots || []), ""];
        handleChange('time_slots', newTimeSlots);
    };

    const removeTimeSlot = (slotIndex) => {
        const newTimeSlots = medicine.time_slots.filter((_, i) => i !== slotIndex);
        handleChange('time_slots', newTimeSlots);
    };

    return (
        <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100">
            {canRemove && (
                <button
                    onClick={() => onRemove(index)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            )}

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Medicine Name *
                        </label>
                        <Input
                            value={medicine.name || ""}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="e.g., Amoxicillin"
                            className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dosage *
                        </label>
                        <Input
                            value={medicine.dosage || ""}
                            onChange={(e) => handleChange('dosage', e.target.value)}
                            placeholder="e.g., 500mg"
                            className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Frequency *
                        </label>
                        <Select
                            value={medicine.frequency || ""}
                            onValueChange={(value) => handleChange('frequency', value)}
                        >
                            <SelectTrigger className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]">
                                <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                                {frequencyOptions.map(opt => (
                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration (days) *
                        </label>
                        <Input
                            type="number"
                            value={medicine.duration_days || ""}
                            onChange={(e) => handleChange('duration_days', e.target.value)}
                            placeholder="e.g., 7"
                            className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                        />
                    </div>
                </div>

                {medicine.frequency === "Custom" && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Custom Time Slots
                        </label>
                        <div className="space-y-2">
                            {(medicine.time_slots || [""]).map((slot, slotIndex) => (
                                <div key={slotIndex} className="flex gap-2">
                                    <Input
                                        type="time"
                                        value={slot}
                                        onChange={(e) => handleTimeSlotChange(slotIndex, e.target.value)}
                                        className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                                    />
                                    {medicine.time_slots && medicine.time_slots.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeTimeSlot(slotIndex)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addTimeSlot}
                                className="w-full border-dashed border-[#5FA8D3] text-[#5FA8D3] hover:bg-[#C3F3E8]/30"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Time Slot
                            </Button>
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity Remaining
                    </label>
                    <Input
                        type="number"
                        value={medicine.quantity_remaining || ""}
                        onChange={(e) => handleChange('quantity_remaining', e.target.value)}
                        placeholder="e.g., 14 pills"
                        className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes
                    </label>
                    <Textarea
                        value={medicine.notes || ""}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        placeholder="Additional instructions or notes..."
                        rows={2}
                        className="border-gray-200 focus:border-[#5FA8D3] focus:ring-[#5FA8D3] resize-none"
                    />
                </div>
            </div>
        </div>
    );
}