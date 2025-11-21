import React from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Pill, Apple, MessageCircle, FileText, TrendingUp } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Pill,
      title: 'Medicine Tracking',
      description: 'Never miss a dose with smart medication reminders and adherence tracking.'
    },
    {
      icon: Apple,
      title: 'Food Recommendations',
      description: 'Get personalized food suggestions based on your health conditions and medications.'
    },
    {
      icon: MessageCircle,
      title: 'Symptom Detection',
      description: 'Chat with our AI assistant to understand your symptoms and get preliminary guidance.'
    },
    {
      icon: FileText,
      title: 'Prescription Management',
      description: 'Upload and store your prescriptions with OCR support for easy access.'
    },
    {
      icon: TrendingUp,
      title: 'Health Analytics',
      description: 'Track your medication adherence and health progress over time.'
    },
    {
      icon: Heart,
      title: 'Comprehensive Care',
      description: 'All your health information in one secure, easy-to-use platform.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#5FA8D3] to-[#63C7B2] mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#5FA8D3]">HealthSync</h1>
          <p className="text-xl text-gray-600">Your Personal Health Companion</p>
        </div>

        {/* About Content */}
        <Card className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About HealthSync</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              HealthSync is a comprehensive medicine tracking and health management platform designed to help you take control of your health journey.
            </p>
            <p>
              In today's busy world, managing medications, keeping track of prescriptions, and maintaining a healthy diet can be overwhelming. HealthSync simplifies this process by bringing all your health information together in one intuitive, easy-to-use application.
            </p>
            <p>
              Our mission is to empower individuals to better manage their health through smart technology, personalized recommendations, and accessible information.
            </p>
          </div>
        </Card>

        {/* Features Grid */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Key Features</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-[#C3F3E8] to-[#63C7B2] bg-opacity-20 rounded-xl">
                      <Icon className="w-6 h-6 text-[#5FA8D3]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* How It Helps */}
        <Card className="p-8 bg-gradient-to-br from-[#5FA8D3] to-[#63C7B2] text-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">How HealthSync Helps You</h2>
          <div className="space-y-3 text-white/90">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
              <p>Track all your medications in one place with intelligent reminders</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
              <p>Store and manage prescriptions with OCR technology for easy data extraction</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
              <p>Receive personalized food recommendations based on your health conditions</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
              <p>Access your health reports anytime, anywhere</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
              <p>Chat with our AI assistant for symptom guidance and health questions</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
              <p>Monitor your medication adherence and health progress over time</p>
            </div>
          </div>
        </Card>

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-500">
          <p>HealthSync - Making health management simple, accessible, and effective.</p>
        </div>
      </div>
    </div>
  );
}