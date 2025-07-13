import React, { useState } from 'react';
import {
  Gift,
  BadgeCheck,
  Sparkles,
  Users,
  Timer,
  TrendingUp,
  Leaf,
  Copy,
  Store,
  CheckCircle2,
  Smile,
  Lock,
  ShieldCheck,
  Flame,
  BarChart3,
  Star,
  Zap,
  Handshake
} from 'lucide-react';

const EarnRewards = () => {
  const ecoPoints = 420; // Mock value
  const nextReward = 500;
  const [challengeAccepted, setChallengeAccepted] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("ECO1234");
    alert("Referral code copied!");
  };

  const handleAcceptChallenge = () => {
    setChallengeAccepted(true);
  };

  const challengeProgress = {
    scanned: 2,
    target: 3,
    recycled: true,
  };

  const rewardTiers = [
    { label: 'Bronze Tier 🎉', required: 200 },
    { label: 'Silver Tier 🥈', required: 400 },
    { label: 'Gold Tier 🥇', required: 600 },
    { label: 'Platinum Tier 💎', required: 800 }
  ];

  const ecoPersona = ecoPoints >= 600 ? '🌟 Eco Hero' : ecoPoints >= 400 ? '🧠 Green Thinker' : '🌱 Eco Explorer';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Earn Eco Rewards</h2>
        <p className="text-lg text-gray-600">Make sustainable choices and get rewarded for every eco-friendly action 🌱</p>
      </div>

      {/* Points Tracker */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-eco-green-600" />
          Your Eco Points
        </h3>
        <p className="text-gray-700 text-sm mb-2">
          You have <span className="font-bold">{ecoPoints} points</span>. Unlock your next reward at {nextReward} points.
        </p>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-eco-green-500 to-blue-500"
            style={{ width: `${(ecoPoints / nextReward) * 100}%` }}
          />
        </div>
        <p className="text-sm mt-2 text-eco-green-700">Eco Persona: {ecoPersona}</p>
      </div>

      {/* Weekly Challenge */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
          <Timer className="w-6 h-6 mr-2 text-eco-green-600" />
          Weekly Eco Challenge
        </h3>
        {!challengeAccepted ? (
          <>
            <p className="text-sm text-gray-700 mb-2">
              ♻️ Scan 3 T-shirts and recycle 1 item
            </p>
            <p className="text-xs text-gray-500 mb-4">Reward: 150 points • Ends in 2 days</p>
            <button
              onClick={handleAcceptChallenge}
              className="px-4 py-2 bg-eco-green-600 text-white rounded-xl text-sm hover:bg-eco-green-700 transition"
            >
              Accept Challenge
            </button>
          </>
        ) : (
          <div className="text-sm text-eco-green-700">
            ✅ Challenge Accepted! Complete tasks to earn rewards.
          </div>
        )}
      </div>

      {/* Reward Tiers */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Star className="w-6 h-6 text-eco-green-600 mr-2" />
          Reward Tiers
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
          {rewardTiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-xl p-4 shadow flex items-center justify-between ${ecoPoints >= tier.required ? 'bg-green-100' : 'bg-gray-100'}`}
            >
              <span>{tier.label}</span>
              {ecoPoints >= tier.required ? <ShieldCheck className="w-5 h-5 text-eco-green-600" /> : <Lock className="w-5 h-5 text-gray-400" />}
            </div>
          ))}
        </div>
      </div>

      {/* Your Badges */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <BadgeCheck className="w-6 h-6 text-eco-green-600 mr-2" />
          Your Badges
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="p-3 bg-eco-green-50 rounded-xl shadow">🌱 Eco Rookie<br /><span className="text-xs text-gray-500">First Scan</span></div>
          <div className="p-3 bg-eco-green-50 rounded-xl shadow">🔄 Green Streak<br /><span className="text-xs text-gray-500">7-day streak</span></div>
          <div className="p-3 bg-eco-green-50 rounded-xl shadow">👕 Recycler<br /><span className="text-xs text-gray-500">Recycled 5 items</span></div>
          <div className="p-3 bg-eco-green-50 rounded-xl shadow">🚀 Eco Hero<br /><span className="text-xs text-gray-500">Top 10 rank</span></div>
        </div>
      </div>

      {/* Reward Store */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Store className="w-6 h-6 mr-2 text-eco-green-600" />
          Reward Store
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="bg-eco-green-50 rounded-xl p-4 shadow">🎁 20% Off GreenWear<p className="text-xs text-gray-500">500 points</p></div>
          <div className="bg-eco-green-50 rounded-xl p-4 shadow">🧦 Free Bamboo Socks<p className="text-xs text-gray-500">800 points</p></div>
          <div className="bg-eco-green-50 rounded-xl p-4 shadow">🌳 Plant a Tree in Your Name<p className="text-xs text-gray-500">600 points</p></div>
        </div>
      </div>

      {/* Referral Section */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
          <Users className="w-6 h-6 mr-2 text-eco-green-600" />
          Refer Friends, Earn Points
        </h3>
        <p className="text-sm text-gray-700 mb-2">
          Share your referral code and earn <strong>100 points</strong> for each friend who signs up!
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm font-mono">
            ECO1234
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center space-x-1 text-sm text-eco-green-600 hover:text-eco-green-800"
          >
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </button>
        </div>
      </div>

      {/* Instructions Section */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
          <Smile className="w-6 h-6 mr-2 text-eco-green-700" />
          How to Earn More Rewards
        </h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-eco-green-600" /> Upload more clothing scans</li>
          <li className="flex items-center gap-2"><Users className="w-4 h-4 text-eco-green-600" /> Refer friends using your referral code</li>
          <li className="flex items-center gap-2"><Timer className="w-4 h-4 text-eco-green-600" /> Complete weekly eco-challenges</li>
          <li className="flex items-center gap-2"><Handshake className="w-4 h-4 text-eco-green-600" /> Switch to eco-friendly brands and log it</li>
          <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-eco-green-600" /> Recycle clothes and earn points via verification</li>
        </ul>
      </div>
    </div>
  );
};

export default EarnRewards;
