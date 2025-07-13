import React, { useState, useEffect } from 'react';
import { Gift, Clock, Star, ExternalLink, Tag, Sparkles } from 'lucide-react';
import axios from 'axios';

const OffersSection = ({ ecoPoints }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ecoPoints > 0) {
      fetchOffers();
    }
  }, [ecoPoints]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:5000/api/offers?points=${ecoPoints}`);
      setOffers(response.data.availableOffers);
    } catch (err) {
      setError('Failed to fetch offers');
      console.error('Error fetching offers:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'discount': return <Tag className="w-4 h-4" />;
      case 'freebie': return <Gift className="w-4 h-4" />;
      case 'certificate': return <ExternalLink className="w-4 h-4" />;
      default: return <Gift className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'discount': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'freebie': return 'bg-eco-green-100 text-eco-green-800 border-eco-green-200';
      case 'certificate': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryGradient = (category) => {
    switch (category) {
      case 'discount': return 'from-blue-500 to-blue-600';
      case 'freebie': return 'from-eco-green-500 to-eco-green-600';
      case 'certificate': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (ecoPoints === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl card-shadow p-8 text-center">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Gift className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-700 mb-3">Earn Eco Points First!</h3>
        <p className="text-gray-600 mb-4">Upload clothing images to earn eco points and unlock amazing sustainable fashion offers.</p>
        <div className="bg-gradient-to-r from-eco-green-50 to-blue-50 rounded-xl p-4">
          <p className="text-sm text-gray-600">
            💡 <strong>Tip:</strong> Lower carbon footprint = More eco points = Better offers!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl card-shadow p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-eco-green-100 to-blue-100 w-12 h-12 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-eco-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Available Offers</h2>
            <p className="text-gray-600 text-sm">Redeem your eco points for sustainable rewards</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-eco-green-500 to-eco-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
          {ecoPoints} Points
        </div>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your personalized offers...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && offers.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-600 font-medium mb-2">No offers available with your current points.</p>
          <p className="text-sm text-gray-500">Keep scanning to earn more points and unlock rewards!</p>
        </div>
      )}

      <div className="grid gap-6">
        {offers.map((offer) => (
          <div key={offer.id} className="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(offer.category)}`}>
                    {getCategoryIcon(offer.category)}
                    <span className="capitalize">{offer.category}</span>
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {offer.brand}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-eco-green-600 transition-colors">
                  {offer.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{offer.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-eco-green-500" />
                    <span className="font-medium">{offer.pointsRequired} points required</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Valid until {offer.validUntil}</span>
                  </div>
                </div>
              </div>
              
              <div className="ml-6 text-center">
                <div className="text-2xl font-bold text-eco-green-600 mb-2">
                  {offer.value}
                </div>
                <button className={`bg-gradient-to-r ${getCategoryGradient(offer.category)} text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-semibold transform hover:scale-105`}>
                  Claim Offer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {offers.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-eco-green-50 to-blue-50 rounded-2xl p-6 text-center">
          <h4 className="font-bold text-gray-800 mb-2">🎉 Great job on your sustainable choices!</h4>
          <p className="text-sm text-gray-600">
            You've unlocked {offers.length} offer{offers.length !== 1 ? 's' : ''} with your {ecoPoints} eco points. 
            Keep scanning to earn more rewards!
          </p>
        </div>
      )}
    </div>
  );
};

export default OffersSection;