/**
 * Available offers based on eco-points
 */
export const OFFERS = [
  {
    id: 1,
    title: '5% Off Sustainable Clothing',
    description: 'Get 5% off on eco-friendly clothing brands like Patagonia and Eileen Fisher',
    pointsRequired: 10,
    category: 'discount',
    validUntil: '2024-12-31',
    brand: 'EcoFashion',
    value: '5%'
  },
  {
    id: 2,
    title: '10% Off Organic Cotton Items',
    description: 'Exclusive discount on organic cotton products from sustainable brands',
    pointsRequired: 20,
    category: 'discount',
    validUntil: '2024-12-31',
    brand: 'GreenThreads',
    value: '10%'
  },
  {
    id: 3,
    title: 'Free Eco-Friendly Tote Bag',
    description: 'Get a free reusable tote bag made from recycled ocean plastic',
    pointsRequired: 15,
    category: 'freebie',
    validUntil: '2024-12-31',
    brand: 'OceanSaver',
    value: 'Free'
  },
  {
    id: 4,
    title: '15% Off Recycled Clothing',
    description: 'Save on clothing made from recycled materials and plastic bottles',
    pointsRequired: 30,
    category: 'discount',
    validUntil: '2024-12-31',
    brand: 'RecycleWear',
    value: '15%'
  },
  {
    id: 5,
    title: 'Free Carbon Offset Certificate',
    description: 'Offset 10kg of CO₂ emissions with a verified carbon offset certificate',
    pointsRequired: 25,
    category: 'certificate',
    validUntil: '2024-12-31',
    brand: 'CarbonNeutral',
    value: '10kg CO₂'
  },
  {
    id: 6,
    title: '20% Off Sustainable Fashion Bundle',
    description: 'Biggest discount on sustainable fashion collections and eco-accessories',
    pointsRequired: 40,
    category: 'discount',
    validUntil: '2024-12-31',
    brand: 'EcoLux',
    value: '20%'
  },
  {
    id: 7,
    title: 'Free Clothing Repair Kit',
    description: 'Extend your clothes\' life with a professional repair and mending kit',
    pointsRequired: 18,
    category: 'freebie',
    validUntil: '2024-12-31',
    brand: 'RepairCo',
    value: 'Free'
  },
  {
    id: 8,
    title: '25% Off Vintage Collection',
    description: 'Huge savings on curated vintage and pre-loved designer pieces',
    pointsRequired: 35,
    category: 'discount',
    validUntil: '2024-12-31',
    brand: 'VintageVault',
    value: '25%'
  }
];

/**
 * Get available offers based on eco-points
 * @param {number} ecoPoints - User's eco-points
 * @returns {Object[]} Array of available offers
 */
export function getAvailableOffers(ecoPoints) {
  return OFFERS.filter(offer => ecoPoints >= offer.pointsRequired)
    .sort((a, b) => b.pointsRequired - a.pointsRequired);
}