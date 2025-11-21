import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Award } from 'lucide-react';

const mockData = [
  { day: 'Mon', adherence: 95, date: '2025-11-15' },
  { day: 'Tue', adherence: 88, date: '2025-11-16' },
  { day: 'Wed', adherence: 100, date: '2025-11-17' },
  { day: 'Thu', adherence: 92, date: '2025-11-18' },
  { day: 'Fri', adherence: 85, date: '2025-11-19' },
  { day: 'Sat', adherence: 90, date: '2025-11-20' },
  { day: 'Sun', adherence: 97, date: '2025-11-21' }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const status = value >= 90 ? 'Excellent' : value >= 70 ? 'Good' : 'Needs Improvement';
    const statusColor = value >= 90 ? 'text-green-600' : value >= 70 ? 'text-yellow-600' : 'text-red-600';
    
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-lg">
        <p className="text-sm font-semibold text-gray-800 mb-1">{label}</p>
        <p className="text-2xl font-bold text-[#5FA8D3] mb-1">{value}%</p>
        <p className={`text-xs font-medium ${statusColor}`}>{status}</p>
      </div>
    );
  }
  return null;
};

const getBarColor = (value) => {
  if (value >= 90) return '#63C7B2'; // Green
  if (value >= 70) return '#F59E0B'; // Yellow
  return '#EF4444'; // Red
};

export default function AdherenceGraph({ data = mockData }) {
  const [timeRange, setTimeRange] = useState('week'); // week, month

  // Calculate statistics
  const average = Math.round(data.reduce((sum, item) => sum + item.adherence, 0) / data.length);
  const trend = data[data.length - 1].adherence - data[0].adherence;
  const perfectDays = data.filter(item => item.adherence === 100).length;

  return (
    <Card className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">Medicine Adherence</h3>
          <p className="text-sm text-gray-500">Track your daily medication adherence</p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
 