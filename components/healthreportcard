import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export default function HealthReportCard({ report, onView, onDelete }) {
  return (
    <Card className="p-4 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start gap-3">
        <div className="p-3 bg-gradient-to-br from-[#5FA8D3] to-[#63C7B2] rounded-xl">
          <FileText className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm mb-1">{report.name}</h4>
          {report.report_type && (
            <p className="text-xs text-gray-600 mb-1">{report.report_type}</p>
          )}
          {report.report_date && (
            <p className="text-xs text-gray-500">
              {format(new Date(report.report_date), 'MMM dd, yyyy')}
            </p>
          )}
          
          <div className="flex gap-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView?.(report)}
              className="rounded-xl border-gray-200 hover:bg-[#C3F3E8] hover:border-[#63C7B2]"
            >
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              View
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(report.file_url, '_blank')}
              className="rounded-xl border-gray-200 hover:bg-[#C3F3E8] hover:border-[#63C7B2]"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Download
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete?.(report)}
              className="rounded-xl border-red-200 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}