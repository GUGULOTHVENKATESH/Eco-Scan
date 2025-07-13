import React from 'react';
import {
  Leaf,
  History,
  Award,
  Flame,
  BarChart3,
  CalendarCheck,
  TrendingUp,
  Zap,
  ShieldCheck,
  TreeDeciduous,
  Smile,
  LineChart,
  Share2,
  Goal,
  Calendar
} from 'lucide-react';

const TrackImpact = ({ impactData }) => {
  const { scannedItems, carbonStats, achievements, streakDays } = impactData || {};

  const ecoGoal = 50;
  const totalSaved = impactData?.totalCO2 || 0;
  const progress = Math.min((totalSaved / ecoGoal) * 100, 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-gray-800">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">Your Sustainability Impact</h2>
        <p className="text-lg text-gray-600">Track your journey towards a greener lifestyle 🌍</p>
      </div>

      {/* Progress Goal */}
      <div className="bg-white/90 rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <Goal className="w-6 h-6 text-green-700 mr-2" />
          CO₂ Reduction Progress
        </h3>
        <p className="text-sm mb-2 text-gray-700">
          Goal: Save 50 kg CO₂ – You've saved <strong>{totalSaved} kg</strong>
        </p>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Carbon Impact by Item */}
      <div className="bg-white/90 rounded-2xl shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-4 flex items-center">
          <Leaf className="w-6 h-6 text-green-600 mr-2" />
          Carbon Impact by Item
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(carbonStats && carbonStats.length > 0 ? carbonStats : [{ item: '—', value: null }]).map((entry, i) => (
            <div key={i} className="bg-emerald-50 p-4 rounded-xl shadow text-center">
              <p className="font-semibold">{entry.item}</p>
              <p className="text-sm text-gray-600">{entry.value != null ? `${entry.value} kg CO₂` : '--'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scan History */}
      <div className="bg-white/90 rounded-2xl shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-4 flex items-center">
          <History className="w-6 h-6 text-blue-600 mr-2" />
          Scan History
        </h3>
        <ul className="space-y-2 text-sm">
          {(scannedItems && scannedItems.length > 0 ? scannedItems : [{ name: '—', date: '--', co2: null }]).map((item, i) => (
            <li key={i} className="flex justify-between items-center p-3 bg-blue-50 rounded-xl shadow-sm">
              <span>{item.name}</span>
              <span>{item.date}</span>
              <span className="font-medium">{item.co2 != null ? `${item.co2} kg CO₂` : '--'}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Achievements */}
      <div className="rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Award className="w-6 h-6 mr-2" />
          Sustainability Achievements
        </h3>
        <p className="text-sm text-white/90">
          {achievements?.length > 0
            ? achievements.map((a, i) => <span key={i}>⭐ {a}<br /></span>)
            : '— You haven’t unlocked any achievements yet.'}
        </p>
      </div>

      {/* Streak & Motivation */}
      <div className="bg-white/90 rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-2 flex items-center">
          <Flame className="w-6 h-6 mr-2 text-red-500" />
          Keep the Streak Going!
        </h3>
        <p className="text-sm text-gray-700">
          {streakDays ? (
            <>🔥 You've scanned for <strong>{streakDays} consecutive days</strong> – Keep it up and claim streak rewards!</>
          ) : (
            <>Start scanning daily to build your streak and rise up the green leaderboard 🌱</>
          )}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-700">
          <Calendar className="w-5 h-5 text-blue-600" />
          Current Streak: <strong>{streakDays ?? 0} days</strong>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="bg-white/90 rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <BarChart3 className="w-6 h-6 text-purple-600 mr-2" />
          Eco Insights
        </h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
          <li className="p-3 bg-purple-50 rounded-xl shadow flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-600" /> Total CO₂ Saved: <strong>{impactData?.totalCO2 ?? '--'} kg</strong>
          </li>
          <li className="p-3 bg-purple-50 rounded-xl shadow flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-600" /> Total Items Scanned: <strong>{impactData?.totalItems ?? '--'}</strong>
          </li>
          <li className="p-3 bg-purple-50 rounded-xl shadow flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-600" /> Global Rank: <strong>{impactData?.rank ?? '--'}</strong>
          </li>
          <li className="p-3 bg-purple-50 rounded-xl shadow flex items-center gap-2">
            <TreeDeciduous className="w-4 h-4 text-purple-600" /> Trees Equivalent: <strong>{(impactData?.totalCO2 / 6.5).toFixed(1) || '--'} 🌳</strong>
          </li>
          <li className="p-3 bg-purple-50 rounded-xl shadow flex items-center gap-2">
            <LineChart className="w-4 h-4 text-purple-600" /> Emission Trend: <strong>{impactData?.trend || 'Stable'}</strong>
          </li>
          <li className="p-3 bg-purple-50 rounded-xl shadow flex items-center gap-2">
            <Smile className="w-4 h-4 text-purple-600" /> Eco Score: <strong>{impactData?.ecoScore || 'B+'}</strong>
          </li>
        </ul>
      </div>

      {/* Share Impact */}
      <div className="bg-gradient-to-br from-green-100 to-blue-100 p-6 rounded-2xl text-center">
        <h3 className="text-xl font-semibold mb-2 flex justify-center items-center">
          <Share2 className="w-5 h-5 mr-2 text-eco-green-600" />
          Share Your Impact
        </h3>
        <p className="text-sm text-gray-700 mb-4">Proud of your green journey? Share your achievements with your friends and inspire them to join!</p>
        <button className="px-4 py-2 bg-eco-green-600 text-white rounded-xl hover:bg-eco-green-700 transition text-sm">Share Now</button>
      </div>

      {/* Footer Reminder */}
      <div className="text-center text-sm text-gray-500 pt-6">
        ⏳ Your data updates every time you scan new clothing. Come back often!
      </div>
    </div>
  );
};

export default TrackImpact;
