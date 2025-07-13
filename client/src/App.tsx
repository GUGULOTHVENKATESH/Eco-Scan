import React, { useState } from 'react';
import { Leaf, Camera, Target, Award } from 'lucide-react';
import axios from 'axios';
import ImageUpload from './components/ImageUpload';
import CarbonAnalysis from './components/CarbonAnalysis';
import OffersSection from './components/OffersSection';

interface CarbonItem {
  item: string;
  carbon: number;
  impact: string;
}

interface AnalysisResult {
  detectedItems: string[];
  items: CarbonItem[];
  totalCarbon: number;
  ecoPoints: number;
  impactLevel: string;
  recommendations: string[];
}

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('http://localhost:5000/api/analyze-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAnalysisResult(response.data.analysis);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to analyze image');
      console.error('Error analyzing image:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-xl">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">EcoScan</h1>
                <p className="text-gray-600">Sustainable Fashion Carbon Footprint Analyzer</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Camera className="w-5 h-5" />
                <span className="text-sm">Upload & Analyze</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Target className="w-5 h-5" />
                <span className="text-sm">Track Impact</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Award className="w-5 h-5" />
                <span className="text-sm">Earn Rewards</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Upload and Analysis */}
          <div className="space-y-8">
            {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Clothing Image</h2>
                <p className="text-gray-600">Get instant carbon footprint analysis</p>
              </div>
              
              <ImageUpload onImageSelect={handleImageUpload} isAnalyzing={isAnalyzing} />
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
              
              {analysisResult && (
                <div className="mt-4 text-center">
                  <button
                    onClick={resetAnalysis}
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    Analyze Another Image
                  </button>
                </div>
              )}
            </div>

            {/* Analysis Results */}
            {analysisResult && (
              <CarbonAnalysis
                items={analysisResult.items}
                totalCarbon={analysisResult.totalCarbon}
                ecoPoints={analysisResult.ecoPoints}
                impactLevel={analysisResult.impactLevel}
                recommendations={analysisResult.recommendations}
              />
            )}
          </div>

          {/* Right Column - Offers */}
          <div className="space-y-8">
            <OffersSection ecoPoints={analysisResult?.ecoPoints || 0} />
            
            {/* Information Cards */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">How It Works</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 text-green-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <p className="text-gray-700 text-sm">Upload a photo of your clothing items</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 text-green-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <p className="text-gray-700 text-sm">Get instant carbon footprint analysis</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 text-green-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <p className="text-gray-700 text-sm">Earn eco points and unlock rewards</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2">Make a Difference</h3>
                <p className="text-sm opacity-90">Every scan helps you make more sustainable fashion choices and reduces your environmental impact.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;