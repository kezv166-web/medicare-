import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { MessageCircle, Plus } from 'lucide-react';
import MedicineCard from '../components/MedicineCard';
import FoodRecommendationCard from '../components/FoodRecommendationCard';
import ChatbotModal from '../components/ChatbotModal';
import AdherenceGraph from '../components/AdherenceGraph';
import { createPageUrl } from '../utils';

export default function Home() {
  const navigate = useNavigate();
  const [chatbotOpen, setChatbotOpen] = useState(false);

  // Check if onboarding is completed, redirect to onboarding if not
  useEffect(() => {
    const isOnboardingCompleted = localStorage.getItem('onboarding_completed');
    if (isOnboardingCompleted !== 'true') {
      navigate(createPageUrl('Onboarding'));
    }
  }, [navigate]);

  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me()
  });

  const { data: medicines = [] } = useQuery({
    queryKey: ['medicines'],
    queryFn: () => base44.entities.Medicine.filter({ active: true }, '-next_dose_time', 10)
  });

  // Auto-generate food recommendations based on user's health conditions
  const { data: foodRecommendations = [], isLoading: loadingFood } = useQuery({
    queryKey: ['food-recommendations', user?.health_conditions],
    queryFn: async () => {
      if (!user?.health_conditions || user.health_conditions.length === 0) {
        return [];
      }

      const condition = user.health_conditions[0];
      
      try {
        const response = await base44.integrations.Core.InvokeLLM({
          prompt: `As a nutritionist, provide food recommendations for a patient with ${condition}. 
          List 6 food items in 3 categories:
          - 2 foods that are safe and recommended
          - 2 foods that should be limited or consumed in moderation
          - 2 foods to avoid
          
          For each food, provide a brief reason why.`,
          response_json_schema: {
            type: "object",
            properties: {
              recommendations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    status: { type: "string", enum: ["safe", "limited", "avoid"] },
                    reason: { type: "string" }
                  }
                }
              }
            }
          }
        });

        return response.recommendations.map(rec => ({
          ...rec,
          health_condition: condition
        }));
      } catch (error) {
        console.error('Failed to generate food recommendations:', error);
        return [];
      }
    },
    enabled: !!user?.health_conditions && user.health_conditions.length > 0,
    staleTime: 1000 * 60 * 60 * 24 // Cache for 24 hours
  });

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#5FA8D3] mb-2">
            Welcome back, {user?.full_name || 'User'}!
          </h1>
          <p className="text-gray-600">Track your medications and stay healthy</p>
          
          {user?.health_conditions && user.health_conditions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Health Condition:</span>
              {user.health_conditions.map((condition, idx) => (
                <span key={idx} className="px-3 py-1 bg-[#C3F3E8] text-[#5FA8D3] text-sm font-medium rounded-full">
                  {condition}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Doctor Info Card */}
        {user?.doctor_name && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Doctor</h3>
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
            </div>
          </div>
        )}

        {/* Adherence Graph */}
        <AdherenceGraph />

        {/* Current Medicines */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Current Medicines</h2>
            <Button className="bg-[#63C7B2] hover:bg-[#5FA8D3] rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Add Medicine
            </Button>
          </div>
          
          {medicines.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {medicines.map((medicine) => (
                <MedicineCard key={medicine.id} medicine={medicine} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <p className="text-gray-500">No medicines added yet</p>
            </div>
          )}
        </div>

        {/* Food Recommendations */}
        {user?.health_conditions && user.health_conditions.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Food Recommendations for {user.health_conditions[0]}
            </h2>
            
            {loadingFood ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <div className="w-8 h-8 border-4 border-[#5FA8D3] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-500">Generating personalized recommendations...</p>
              </div>
            ) : foodRecommendations.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {foodRecommendations.map((food, idx) => (
                  <FoodRecommendationCard key={idx} food={food} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <p className="text-gray-500">Unable to generate recommendations</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Chatbot Button */}
      <Button
        onClick={() => setChatbotOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[#5FA8D3] to-[#63C7B2] hover:shadow-lg shadow-md transition-all"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    </div>
  );
}