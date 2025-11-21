import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User, Upload, FileText, Pill, Activity } from 'lucide-react';
import PrescriptionCard from '../components/PrescriptionCard';
import HealthReportCard from '../components/HealthReportCard';
import AdherenceGraph from '../components/AdherenceGraph';

export default function Profile() {
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => base44.auth.me()
  });

  const { data: medicines = [] } = useQuery({
    queryKey: ['all-medicines'],
    queryFn: () => base44.entities.Medicine.list('-created_date', 50)
  });

  const { data: prescriptions = [] } = useQuery({
    queryKey: ['prescriptions'],
    queryFn: () => base44.entities.Prescription.list('-created_date', 20)
  });

  const { data: healthReports = [] } = useQuery({
    queryKey: ['health-reports'],
    queryFn: () => base44.entities.HealthReport.list('-created_date', 20)
  });

  const uploadPrescription = useMutation({
    mutationFn: async (file) => {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      return base44.entities.Prescription.create({ image_url: file_url });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
      setUploading(false);
    }
  });

  const uploadHealthReport = useMutation({
    mutationFn: async ({ file, name }) => {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      return base44.entities.HealthReport.create({ 
        name, 
        file_url,
        report_date: new Date().toISOString().split('T')[0]
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-reports'] });
    }
  });

  const deletePrescription = useMutation({
    mutationFn: (id) => base44.entities.Prescription.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['prescriptions'] })
  });

  const deleteHealthReport = useMutation({
    mutationFn: (id) => base44.entities.HealthReport.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['health-reports'] })
  });

  const handlePrescriptionUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      uploadPrescription.mutate(file);
    }
  };

  const handleReportUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const name = prompt('Enter report name:') || file.name;
      uploadHealthReport.mutate({ file, name });
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Profile Header */}
        <Card className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#5FA8D3] to-[#63C7B2] flex items-center justify-center">
              {user?.profile_photo_url ? (
                <img 
                  src={user.profile_photo_url} 
                  alt="Profile"
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <User className="w-12 h-12 text-white" />
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{user?.full_name || 'User'}</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Age</p>
                  <p className="text-sm font-medium text-gray-900">{user?.age || 'Not set'}</p>
                </div>
                {user?.treatment_start_date && (
                  <div>
                    <p className="text-xs text-gray-500">Treatment Started</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(user.treatment_start_date).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
              
              {user?.health_conditions && user.health_conditions.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">Health Conditions</p>
                  <div className="flex flex-wrap gap-2">
                    {user.health_conditions.map((condition, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[#C3F3E8] text-[#63C7B2] text-xs font-medium rounded-full">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Doctor Information */}
        {user?.doctor_name && (
          <Card className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Doctor Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Doctor Name</p>
                <p className="text-sm font-medium text-gray-900">{user.doctor_name}</p>
              </div>
              {user.doctor_specialty && (
                <div>
                  <p className="text-xs text-gray-500">Specialty</p>
                  <p className="text-sm font-medium text-gray-900">{user.doctor_specialty}</p>
                </div>
              )}
              {user.doctor_clinic && (
                <div>
                  <p className="text-xs text-gray-500">Clinic/Hospital</p>
                  <p className="text-sm font-medium text-gray-900">{user.doctor_clinic}</p>
                </div>
              )}
              {user.doctor_contact && (
                <div>
                  <p className="text-xs text-gray-500">Contact</p>
                  <p className="text-sm font-medium text-gray-900">{user.doctor_contact}</p>
                </div>
              )}
              {user.consult_date && (
                <div>
                  <p className="text-xs text-gray-500">Last Consultation</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(user.consult_date).toLocaleDateString()}
                  </p>
                </div>
              )}
              {user.follow_up_date && (
                <div>
                  <p className="text-xs text-gray-500">Next Follow-up</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(user.follow_up_date).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Treatment Instructions */}
        {(user?.food_instructions || user?.precautions || user?.activity_restrictions) && (
          <Card className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Treatment Instructions</h2>
            <div className="space-y-4">
              {user.food_instructions && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Food Instructions</p>
                  <p className="text-sm text-gray-700">{user.food_instructions}</p>
                </div>
              )}
              {user.precautions && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Precautions</p>
                  <p className="text-sm text-gray-700">{user.precautions}</p>
                </div>
              )}
              {user.activity_restrictions && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Activity Restrictions</p>
                  <p className="text-sm text-gray-700">{user.activity_restrictions}</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Adherence History */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-[#5FA8D3]" />
            <h2 className="text-xl font-semibold text-gray-900">Adherence History</h2>
          </div>
          <AdherenceGraph />
        </div>

        {/* All Medicines */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Pill className="w-5 h-5 text-[#5FA8D3]" />
            <h2 className="text-xl font-semibold text-gray-900">All Medicines</h2>
          </div>
          
          {medicines.length > 0 ? (
            <Card className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className="space-y-3">
                {medicines.map((medicine) => (
                  <div key={medicine.id} className="flex items-center justify-between p-3 bg-[#F2F2F2] rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">{medicine.name}</p>
                      <p className="text-sm text-gray-600">{medicine.dosage}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      medicine.active 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {medicine.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center bg-white border border-gray-100 rounded-2xl">
              <p className="text-gray-500">No medicines recorded</p>
            </Card>
          )}
        </div>

        {/* Prescriptions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#5FA8D3]" />
              <h2 className="text-xl font-semibold text-gray-900">Uploaded Prescriptions</h2>
            </div>
            
            <label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePrescriptionUpload}
                className="hidden"
                disabled={uploading}
              />
              <Button 
                as="span" 
                className="bg-[#63C7B2] hover:bg-[#5FA8D3] rounded-xl cursor-pointer"
                disabled={uploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload Prescription'}
              </Button>
            </label>
          </div>

          {prescriptions.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {prescriptions.map((prescription) => (
                <PrescriptionCard
                  key={prescription.id}
                  prescription={prescription}
                  onEdit={() => alert('Edit functionality - placeholder')}
                  onOCR={() => alert('OCR functionality - placeholder')}
                  onDelete={() => deletePrescription.mutate(prescription.id)}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center bg-white border border-gray-100 rounded-2xl">
              <p className="text-gray-500">No prescriptions uploaded</p>
            </Card>
          )}
        </div>

        {/* Health Reports */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#5FA8D3]" />
              <h2 className="text-xl font-semibold text-gray-900">Health Reports</h2>
            </div>
            
            <label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleReportUpload}
                className="hidden"
              />
              <Button 
                as="span" 
                className="bg-[#63C7B2] hover:bg-[#5FA8D3] rounded-xl cursor-pointer"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Report
              </Button>
            </label>
          </div>

          {healthReports.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {healthReports.map((report) => (
                <HealthReportCard
                  key={report.id}
                  report={report}
                  onView={() => window.open(report.file_url, '_blank')}
                  onDelete={() => deleteHealthReport.mutate(report.id)}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center bg-white border border-gray-100 rounded-2xl">
              <p className="text-gray-500">No health reports uploaded</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}