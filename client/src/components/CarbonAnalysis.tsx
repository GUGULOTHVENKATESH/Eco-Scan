import React from 'react';
import { Leaf, TrendingUp, Award, AlertCircle } from 'lucide-react';

interface CarbonItem {
  item: string;
  carbon: number;
  impact: string;
}

interface CarbonAnalysisProps {
  items: CarbonItem[];
  totalCarbon: number;
  ecoPoints: number;
  impactLevel: string;
  recommendations: string[];
}

const CarbonAnalysis: React.FC<CarbonAnalysisProps> = ({
  items,
  totalCarbon,
  ecoPoints,
  impactLevel,
  recommendations
}) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Very High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'Low': return <Leaf className="w-4 h-4" />;
      case 'Medium': return <TrendingUp className="w-4 h-4" />;
      case 'High': return <AlertCircle className="w-4 h-4" />;
      case 'Very High': return <AlertCircle className="w-4 h-4" />;
      default: return <Leaf className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Carbon Footprint Analysis</h2>
        <p className="text-gray-600">Environmental impact of your clothing choices</p>
      </div>

      {/* Individual Items */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700">Detected Items</h3>
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-lg">👕</span>
              <div>
                <p className="font-medium text-gray-800">{item.item}</p>
                <p className="text-sm text-gray-600">{item.carbon} kg CO₂</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getImpactColor(item.impact)}`}>
              {getImpactIcon(item.impact)}
              <span>{item.impact}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Total Impact */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">{totalCarbon}</div>
            <div className="text-sm text-gray-600">kg CO₂</div>
            <div className="text-xs text-gray-500">Total Carbon</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{ecoPoints}</div>
            <div className="text-sm text-gray-600">Points</div>
            <div className="text-xs text-gray-500">Eco Rewards</div>
          </div>
        </div>
      </div>

      {/* Impact Level */}
      <div className="text-center">
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${getImpactColor(impactLevel)}`}>
          {getImpactIcon(impactLevel)}
          <span>Impact Level: {impactLevel}</span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center space-x-2">
          <Award className="w-5 h-5 text-green-600" />
          <span>Recommendations</span>
        </h3>
        <ul className="space-y-2">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-green-600 mt-1">•</span>
              <span className="text-gray-700 text-sm">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarbonAnalysis;