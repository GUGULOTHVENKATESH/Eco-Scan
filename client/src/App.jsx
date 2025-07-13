import React, { useState } from 'react';
import { Leaf, Camera, Target, Award, Sparkles } from 'lucide-react';
import axios from 'axios';
import ImageUpload from './components/ImageUpload';
import CarbonAnalysis from './components/CarbonAnalysis';
import OffersSection from './components/OffersSection';
import FeedbackForm from './components/FeedbackForm';

import { Routes, Route, Link } from 'react-router-dom';
import TrackImpact from './components/TrackImpact';
import EarnRewards from './components/EarnRewards';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = async (file) => {
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
    } catch (err) {
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
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-eco-green-500 to-eco-green-600 p-3 rounded-2xl shadow-lg">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-eco-green-600 to-eco-green-800 bg-clip-text text-transparent">
                  EcoScan
                </h1>
                <p className="text-gray-600 text-sm">Clothing Carbon Footprint Scanner</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/track-impact" className="flex items-center space-x-2 text-gray-600 hover:text-eco-green-600 transition-colors">
                <Target className="w-5 h-5" />
                <span className="text-sm font-medium">Track Impact</span>
              </Link>
              <Link to="/earn-rewards" className="flex items-center space-x-2 text-gray-600 hover:text-eco-green-600 transition-colors">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">Earn Rewards</span>
              </Link>
              <Link to="/feedback" className="flex items-center space-x-2 text-gray-600 hover:text-eco-green-600 transition-colors">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium">Feedback</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Route Handling */}
      <Routes>
        <Route path="/" element={
          <>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Discover Your Fashion's
                  <span className="block bg-gradient-to-r from-eco-green-500 to-blue-600 bg-clip-text text-transparent">
                    Environmental Impact
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Upload photos of your clothing items and get instant carbon footprint analysis, 
                  earn eco-points, and unlock sustainable fashion rewards.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl card-shadow p-8">
                    <div className="text-center mb-8">
                      <div className="bg-gradient-to-br from-eco-green-100 to-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Camera className="w-8 h-8 text-eco-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Upload Clothing Image</h3>
                      <p className="text-gray-600">Get instant AI-powered carbon footprint analysis</p>
                    </div>
                    <ImageUpload onImageSelect={handleImageUpload} isAnalyzing={isAnalyzing} />
                    {error && (
                      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-700 text-sm font-medium">{error}</p>
                      </div>
                    )}
                    {analysisResult && (
                      <div className="mt-6 text-center">
                        <button
                          onClick={resetAnalysis}
                          className="text-eco-green-600 hover:text-eco-green-700 text-sm font-medium hover:underline transition-colors"
                        >
                          Analyze Another Image
                        </button>
                      </div>
                    )}
                  </div>
                  {analysisResult && (
                    <CarbonAnalysis
                      items={analysisResult.items}
                      totalCarbon={analysisResult.totalCarbon}
                      ecoPoints={analysisResult.ecoPoints}
                      impactLevel={analysisResult.impactLevel}
                      recommendations={analysisResult.recommendations}
                      sustainabilityScore={analysisResult.sustainabilityScore}
                    />
                  )}
                </div>
                <div className="space-y-8">
                  <OffersSection ecoPoints={analysisResult?.ecoPoints || 0} />
                  <div className="space-y-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl card-shadow p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <Target className="w-6 h-6 text-eco-green-600 mr-2" />
                        How It Works
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="bg-eco-green-100 text-eco-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                          <div>
                            <p className="text-gray-800 font-medium">Upload or Capture</p>
                            <p className="text-gray-600 text-sm">Take a photo or upload an image of your clothing items</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="bg-eco-green-100 text-eco-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                          <div>
                            <p className="text-gray-800 font-medium">AI Analysis</p>
                            <p className="text-gray-600 text-sm">Our AI identifies items and calculates carbon footprint</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="bg-eco-green-100 text-eco-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                          <div>
                            <p className="text-gray-800 font-medium">Earn & Redeem</p>
                            <p className="text-gray-600 text-sm">Get eco-points and unlock sustainable fashion offers</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-eco-green-500 to-blue-600 text-white rounded-2xl p-6 card-shadow">
                      <div className="flex items-center mb-3">
                        <Leaf className="w-6 h-6 mr-2" />
                        <h3 className="text-xl font-bold">Make a Difference</h3>
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Every scan helps you make more sustainable fashion choices and reduces your environmental impact. 
                        Join thousands of users building a greener future, one outfit at a time.
                      </p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl card-shadow p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">Carbon Footprint Guide</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">👕 T-shirt</span>
                          <span className="font-medium text-gray-800">5 kg CO₂</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">👖 Jeans</span>
                          <span className="font-medium text-gray-800">10 kg CO₂</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">🧥 Jacket</span>
                          <span className="font-medium text-gray-800">12 kg CO₂</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">👗 Dress</span>
                          <span className="font-medium text-gray-800">8 kg CO₂</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <footer className="bg-white/80 backdrop-blur-sm mt-16 py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Leaf className="w-5 h-5 text-eco-green-600 mr-2" />
                  <span className="text-gray-600 font-medium">Eco Scan</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Making fashion more sustainable, one scan at a time 🌱
                </p>
              </div>
            </footer>
          </>
        } />

        <Route path="/track-impact" element={<TrackImpact />} />
        <Route path="/earn-rewards" element={<EarnRewards />} />
        <Route path="/feedback" element={<div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8"><FeedbackForm /></div>} />
      </Routes>
    </div>
  );
}

export default App;
