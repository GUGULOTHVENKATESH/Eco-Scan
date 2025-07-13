// Carbon footprint data for different clothing items (in kg CO₂)
export const CARBON_FOOTPRINT_DATA = {
  'T-shirt': 5,
  'Jeans': 10,
  'Sweater': 7,
  'Jacket': 12,
  'Dress': 8,
  'Shirt': 4,
  'Pants': 9,
  'Skirt': 6,
  'Hoodie': 8,
  'Shorts': 3,
  'Shoes': 8,
  'Socks': 2,
  'Hat': 3,
  'Scarf': 4,
  'Belt': 2,
  'Blazer': 10,
  'Coat': 15,
  'Cardigan': 6,
  'Tank Top': 3,
  'Polo Shirt': 4
};

/**
 * Calculate carbon footprint for detected clothing items
 * @param {string[]} items - Array of detected clothing items
 * @returns {Object} Carbon footprint analysis
 */
export function calculateCarbonFootprint(items) {
  const itemAnalysis = items.map(item => {
    const carbon = CARBON_FOOTPRINT_DATA[item] || 5; // Default to 5 kg if item not found
    return {
      item,
      carbon,
      impact: getCarbonImpactLevel(carbon)
    };
  });

  const totalCarbon = itemAnalysis.reduce((sum, item) => sum + item.carbon, 0);
  
  // Eco-points calculation: Base 50 points minus carbon impact
  // Higher carbon = fewer points, encouraging sustainable choices
  const ecoPoints = Math.max(0, 50 - totalCarbon);
  
  return {
    items: itemAnalysis,
    totalCarbon,
    ecoPoints,
    impactLevel: getCarbonImpactLevel(totalCarbon),
    recommendations: getRecommendations(totalCarbon, items),
    sustainabilityScore: getSustainabilityScore(totalCarbon)
  };
}

/**
 * Get carbon impact level based on total carbon footprint
 * @param {number} carbon - Carbon footprint in kg CO₂
 * @returns {string} Impact level
 */
function getCarbonImpactLevel(carbon) {
  if (carbon <= 5) return 'Low';
  if (carbon <= 10) return 'Medium';
  if (carbon <= 15) return 'High';
  return 'Very High';
}

/**
 * Get sustainability score (0-100)
 * @param {number} totalCarbon - Total carbon footprint
 * @returns {number} Sustainability score
 */
function getSustainabilityScore(totalCarbon) {
  // Score decreases as carbon footprint increases
  const maxCarbon = 50; // Assume max reasonable carbon for scoring
  const score = Math.max(0, Math.min(100, 100 - (totalCarbon / maxCarbon) * 100));
  return Math.round(score);
}

/**
 * Get recommendations based on carbon footprint
 * @param {number} totalCarbon - Total carbon footprint
 * @param {string[]} items - Detected items
 * @returns {string[]} Array of recommendations
 */
function getRecommendations(totalCarbon, items) {
  const recommendations = [];
  
  if (totalCarbon > 20) {
    recommendations.push('Consider buying fewer items or choosing sustainable alternatives');
    recommendations.push('Look for items made from recycled or organic materials');
    recommendations.push('Try thrift shopping or clothing swaps to reduce environmental impact');
  } else if (totalCarbon > 10) {
    recommendations.push('Good choice! Consider sustainable brands for future purchases');
    recommendations.push('Try to extend the lifespan of your clothing items with proper care');
    recommendations.push('Look for certifications like GOTS or OEKO-TEX when shopping');
  } else {
    recommendations.push('Excellent eco-friendly choices!');
    recommendations.push('You\'re making a positive impact on the environment');
    recommendations.push('Share your sustainable fashion choices to inspire others');
  }
  
  // Add item-specific recommendations
  if (items.includes('Jeans')) {
    recommendations.push('Tip: Wash jeans less frequently to reduce water usage and extend their life');
  }
  
  if (items.includes('T-shirt')) {
    recommendations.push('Tip: Choose organic cotton t-shirts for lower environmental impact');
  }
  
  return recommendations;
}