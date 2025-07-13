import { Router } from 'express';
import multer from 'multer';
import { analyzeImageWithAI, mockImageRecognition } from '../utils/imageRecognition.js';
import { calculateCarbonFootprint } from '../utils/carbonCalculator.js';

const router = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

/**
 * POST /api/analyze-image
 * Analyze uploaded image for clothing items and calculate carbon footprint
 */
router.post('/analyze-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No image file uploaded',
        message: 'Please upload an image file'
      });
    }

    let detectedItems;
    
    // Try to use OpenAI GPT-4 Vision if API key is available
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
      try {
        console.log('🤖 Using OpenAI GPT-4 Vision for image analysis...');
        detectedItems = await analyzeImageWithAI(req.file.buffer);
      } catch (aiError) {
        console.warn('⚠️ OpenAI API failed, falling back to mock recognition:', aiError.message);
        detectedItems = mockImageRecognition(req.file.originalname);
      }
    } else {
      console.log('🎭 Using mock image recognition (no OpenAI API key configured)');
      detectedItems = mockImageRecognition(req.file.originalname);
    }
    
    // Calculate carbon footprint
    const analysis = calculateCarbonFootprint(detectedItems);
    
    // Return analysis results
    res.json({
      success: true,
      analysis: {
        detectedItems,
        ...analysis
      },
      uploadedFile: {
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype
      },
      aiUsed: process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here'
    });
    
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message || 'Failed to analyze the uploaded image'
    });
  }
});

export default router;