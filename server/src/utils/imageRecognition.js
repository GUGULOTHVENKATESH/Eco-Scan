import OpenAI from 'openai';

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here' 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

/**
 * Analyze image using OpenAI GPT-4 Vision
 * @param {Buffer} imageBuffer - Image buffer
 * @returns {Promise<string[]>} Array of detected clothing items
 */
export async function analyzeImageWithAI(imageBuffer) {
  if (!openai) {
    throw new Error('OpenAI API key not configured');
  }

  try {
    const base64Image = imageBuffer.toString('base64');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this image and identify all clothing items visible. Return ONLY a JSON array of clothing item names. Use these exact categories when possible: T-shirt, Jeans, Sweater, Jacket, Dress, Shirt, Pants, Skirt, Hoodie, Shorts, Shoes, Socks, Hat, Scarf, Belt, Blazer, Coat, Cardigan, Tank Top, Polo Shirt. If you see items not in this list, use the closest match or generic term. Example response: ["T-shirt", "Jeans"]`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 300
    });

    const content = response.choices[0].message.content.trim();
    
    // Try to parse JSON response
    try {
      const items = JSON.parse(content);
      if (Array.isArray(items) && items.length > 0) {
        return items.filter(item => typeof item === 'string' && item.trim().length > 0);
      }
    } catch (parseError) {
      console.warn('Failed to parse OpenAI response as JSON:', content);
    }
    
    // Fallback: extract items from text response
    const fallbackItems = extractItemsFromText(content);
    return fallbackItems.length > 0 ? fallbackItems : ['T-shirt'];
    
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error(`AI analysis failed: ${error.message}`);
  }
}

/**
 * Extract clothing items from text response
 * @param {string} text - Text response from AI
 * @returns {string[]} Array of clothing items
 */
function extractItemsFromText(text) {
  const commonItems = [
    'T-shirt', 'Jeans', 'Sweater', 'Jacket', 'Dress', 'Shirt', 'Pants', 
    'Skirt', 'Hoodie', 'Shorts', 'Shoes', 'Socks', 'Hat', 'Scarf', 'Belt',
    'Blazer', 'Coat', 'Cardigan', 'Tank Top', 'Polo Shirt'
  ];
  
  const foundItems = [];
  const lowerText = text.toLowerCase();
  
  for (const item of commonItems) {
    if (lowerText.includes(item.toLowerCase())) {
      foundItems.push(item);
    }
  }
  
  return foundItems;
}

/**
 * Mock image recognition function
 * Used as fallback when OpenAI API is not available
 * @param {string} filename - Name of the uploaded file
 * @returns {string[]} Array of detected clothing items
 */
export function mockImageRecognition(filename) {
  const possibleItems = [
    'T-shirt', 'Jeans', 'Sweater', 'Jacket', 'Dress', 'Shirt', 
    'Pants', 'Skirt', 'Hoodie', 'Shorts', 'Shoes', 'Socks'
  ];
  
  // Return 1-3 random items for demonstration
  const numItems = Math.floor(Math.random() * 3) + 1;
  const detectedItems = [];
  
  for (let i = 0; i < numItems; i++) {
    const randomItem = possibleItems[Math.floor(Math.random() * possibleItems.length)];
    if (!detectedItems.includes(randomItem)) {
      detectedItems.push(randomItem);
    }
  }
  
  return detectedItems.length > 0 ? detectedItems : ['T-shirt']; // Fallback
}