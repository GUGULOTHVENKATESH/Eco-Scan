import React, { useState, useEffect } from 'react';
import { Gift, Clock, Star, ExternalLink } from 'lucide-react';
import axios from 'axios';

interface Offer {
  id: number;
  title: string;
  description: string;
  pointsRequired: number;
  category: string;
  validUntil: string;
}

interface OffersSectionProps {
  ecoPoints: number;
}

const OffersSection: React.FC<OffersSectionProps> = ({ ecoPoints }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ecoPoints > 0) {
      fetchOffers();
    }
  }, [ecoPoints]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:5000/api/offers?ecoPoints=${ecoPoints}`);
      setOffers(response.data.availableOffers);
    } catch (err) {
      setError('Failed to fetch offers');
      console.error('Error fetching offers:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'discount': return <Star className="w-4 h-4" />;
      case 'freebie': return <Gift className="w-4 h-4" />;
      case 'certificate': return <ExternalLink className="w-4 h-4" />;
      default: return <Gift className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'discount': return 'bg-blue-100 text-blue-800';
      case 'freebie': return 'bg-green-100 text-green-800';
      case 'certificate': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (ecoPoints === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
        <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Earn Eco Points First!</h3>
        <p className="text-gray-600">Upload clothing images to earn eco points and unlock amazing offers.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Available Offers</h2>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          {ecoPoints} Points
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="text-gray-600 mt-2">Loading offers...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8 text-red-600">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && offers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No offers available with your current points.</p>
          <p className="text-sm text-gray-500 mt-1">Keep scanning to earn more points!</p>
        </div>
      )}

      <div className="grid gap-4">
        {offers.map((offer) => (
          <div key={offer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(offer.category)}`}>
                    {getCategoryIcon(offer.category)}
                    <span className="capitalize">{offer.category}</span>
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{offer.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{offer.pointsRequired} points</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Valid until {offer.validUntil}</span>
                  </div>
                </div>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                Claim
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersSection;