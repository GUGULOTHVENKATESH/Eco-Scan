import { Router } from 'express';
import { getAvailableOffers } from '../utils/offers.js';

const router = Router();

/**
 * GET /api/offers
 * Get available offers based on eco-points
 */
router.get('/offers', (req, res) => {
  try {
    const { points } = req.query;
    
    if (!points || isNaN(points)) {
      return res.status(400).json({
        error: 'Invalid eco-points',
        message: 'Please provide valid eco-points as a query parameter'
      });
    }
    
    const ecoPoints = parseInt(points);
    const availableOffers = getAvailableOffers(ecoPoints);
    
    res.json({
      success: true,
      ecoPoints: ecoPoints,
      availableOffers,
      totalOffers: availableOffers.length
    });
    
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({
      error: 'Failed to fetch offers',
      message: error.message || 'Could not retrieve offers'
    });
  }
});

export default router;