import React from 'react';
import { Card } from "@/components/ui/card";
import { Clock, Pill } from 'lucide-react';
import { format, differenceInMinutes } from 'date-fns';

export default function MedicineCard({ medicine }) {
  const getTimeRemaining = () => {
    if (!medicine.next_dose_time) return 'Not scheduled';
    
    const now = new Date();
    const nextDose = new Date(medicine.next_dose_time);
    const diffMinutes = differenceInMinutes(nextDose, now);
    
    if (diffMinutes < 0) return 'Overdue';
    if (diffMinutes < 60) return `${diffMinutes} minutes`;
    
    const hours = Math.floor(diffMinutes / 60);
    const mins = diffMinutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-gradient-to-br from-[#5FA8D3] to-[#63C7B2] rounded-xl">
          <Pill className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base mb-1">{medicine.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{medicine.dosage}</p>
          <p className="text-xs text-gray-500">Every {medicine.time_interval}</p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C3F3E8] rounded-full">
            <Clock className="w-3.5 h-3.5 text-[#63C7B2]" />
            <span className="text-xs font-medium text-gray-700">{getTimeRemaining()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}