import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, RotateCw, Trash2, FileText } from 'lucide-react';
import { format } from 'date-fns';

export default function PrescriptionCard({ prescription, onEdit, onOCR, onDelete }) {
  return (
    <Card className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
        {prescription.image_url ? (
          <img 
            src={prescription.image_url} 
            alt="Prescription"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        {prescription.doctor_name && (
          <div>
            <p className="text-xs text-gray-500">Doctor</p>
            <p className="text-sm font-medium text-gray-900">{prescription.doctor_name}</p>
          </div>
        )}
        
        {prescription.date_prescribed && (
          <p className="text-xs text-gray-500">
            {format(new Date(prescription.date_prescribed), 'MMM dd, yyyy')}
          </p>
        )}
        
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(prescription)}
            className="flex-1 rounded-xl border-gray-200 hover:bg-[#C3F3E8] hover:border-[#63C7B2]"
          >
            <Edit className="w-3.5 h-3.5 mr-1.5" />
            Edit
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOCR?.(prescription)}
            className="flex-1 rounded-xl border-gray-200 hover:bg-[#C3F3E8] hover:border-[#63C7B2]"
          >
            <RotateCw className="w-3.5 h-3.5 mr-1.5" />
            OCR
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete?.(prescription)}
            className="rounded-xl border-red-200 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}