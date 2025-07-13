import React from 'react';
import { Leaf, TrendingUp, Award, AlertCircle, BarChart3, Zap } from 'lucide-react';

const CarbonAnalysis = ({
  items,
  totalCarbon,
  ecoPoints,
  impactLevel,
  recommendations,
  sustainabilityScore
}) => {
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Low': return 'text-eco-green-600 bg-eco-green-100 border-eco-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'High': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'Very High': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'Low': return <Leaf className="w-4 h-4" />;
      case 'Medium': return <TrendingUp className="w-4 h-4" />;
      case 'High': return <AlertCircle className="w-4 h-4" />;
      case 'Very High': return <AlertCircle className="w-4 h-4" />;
      default: return <Leaf className="w-4 h-4" />;
    }
  };

  const getClothingEmoji = (item) => {
    const emojiMap = {
      'T-shirt': '👕',
      'Jeans': '👖',
      'Sweater': '🧥',
      'Jacket': '🧥',
      'Dress': '👗',
      'Shirt': '👔',
      'Pants': '👖',
      'Skirt': '👗',
      'Hoodie': '👕',
      'Shorts': '🩳',
      'Shoes': '👟',
      'Socks': '🧦',
      'Hat': '👒',
      'Scarf': '🧣',
      'Belt': '👔',
      'Blazer': '👔',
      'Coat': '🧥',
      'Cardigan': '🧥',
      'Tank Top': '👕',
      'Polo Shirt': '👔'
    };
    return emojiMap[item] || '👕';
  };

  const getSustainabilityGrade = (score) => {
    if (score >= 90) return { grade: 'A+', color: 'text-eco-green-600' };
    if (score >= 80) return { grade: 'A', color: 'text-eco-green-600' };
    if (score >= 70) return { grade: 'B', color: 'text-blue-600' };
    if (score >= 60) return { grade: 'C', color: 'text-yellow-600' };
    if (score >= 50) return { grade: 'D', color: 'text-orange-600' };
    return { grade: 'F', color: 'text-red-600' };
  };

  const sustainabilityGrade = getSustainabilityGrade(sustainabilityScore);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl card-shadow p-8 space-y-8">
      <div className="text-center">
        <div className="bg-gradient-to-br from-eco-green-100 to-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-eco-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Carbon Footprint Analysis</h2>
        <p className="text-gray-600">Environmental impact assessment of your clothing</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-eco-green-50 to-eco-green-100 rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-eco-green-700">{totalCarbon}</div>
          <div className="text-sm text-eco-green-600 font-medium">kg CO₂</div>
          <div className="text-xs text-gray-600">Total Carbon</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{ecoPoints}</div>
          <div className="text-sm text-blue-600 font-medium">Points</div>
          <div className="text-xs text-gray-600">Eco Rewards</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 text-center">
          <div className={`text-2xl font-bold ${sustainabilityGrade.color}`}>{sustainabilityGrade.grade}</div>
          <div className="text-sm text-purple-600 font-medium">Grade</div>
          <div className="text-xs text-gray-600">Sustainability</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-orange-700">{sustainabilityScore}</div>
          <div className="text-sm text-orange-600 font-medium">Score</div>
          <div className="text-xs text-gray-600">Out of 100</div>
        </div>
      </div>

      {/* Individual Items */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center">
          <Zap className="w-5 h-5 text-eco-green-600 mr-2" />
          Detected Items
        </h3>
        <div className="grid gap-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{getClothingEmoji(item.item)}</span>
                <div>
                  <p className="font-semibold text-gray-800">{item.item}</p>
                  <p className="text-sm text-gray-600">{item.carbon} kg CO₂ footprint</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 border ${getImpactColor(item.impact)}`}>
                {getImpactIcon(item.impact)}
                <span>{item.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Level */}
      <div className="text-center">
        <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-semibold border ${getImpactColor(impactLevel)}`}>
          {getImpactIcon(impactLevel)}
          <span>Overall Impact: {impactLevel}</span>
        </div>
      </div>

      {/* Sustainability Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Sustainability Score</span>
          <span className={`text-sm font-bold ${sustainabilityGrade.color}`}>
            {sustainabilityScore}/100 ({sustainabilityGrade.grade})
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-eco-green-500 to-eco-green-600 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${sustainabilityScore}%` }}
          ></div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center">
          <Award className="w-5 h-5 text-eco-green-600 mr-2" />
          Sustainability Recommendations
        </h3>
        <div className="bg-gradient-to-br from-eco-green-50 to-blue-50 rounded-2xl p-6">
          <ul className="space-y-3">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-eco-green-600 mt-1 flex-shrink-0">
                  <Leaf className="w-4 h-4" />
                </span>
                <span className="text-gray-700 text-sm leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarbonAnalysis;