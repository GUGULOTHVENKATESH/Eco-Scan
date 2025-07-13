import { calculateCarbonFootprint } from '../utils/carbonCalculator.js';
import { getAvailableOffers } from '../utils/offers.js';
import { mockImageRecognition } from '../utils/imageRecognition.js';

/**
 * Simple test runner for EcoScan backend
 */
function runTests() {
  console.log('🧪 Running EcoScan Backend Tests...\n');
  
  let passedTests = 0;
  let totalTests = 0;
  
  // Test 1: Carbon footprint calculation
  console.log('Test 1: Carbon footprint calculation');
  totalTests++;
  try {
    const items = ['T-shirt', 'Jeans'];
    const result = calculateCarbonFootprint(items);
    
    console.log('✓ Input items:', items);
    console.log('✓ Result:', result);
    
    // Assertions
    if (result.totalCarbon !== 15) {
      throw new Error(`Expected total carbon to be 15, got ${result.totalCarbon}`);
    }
    
    if (result.ecoPoints !== 35) {
      throw new Error(`Expected eco points to be 35, got ${result.ecoPoints}`);
    }
    
    if (result.items.length !== 2) {
      throw new Error(`Expected 2 items, got ${result.items.length}`);
    }
    
    if (!result.sustainabilityScore || result.sustainabilityScore < 0 || result.sustainabilityScore > 100) {
      throw new Error(`Invalid sustainability score: ${result.sustainabilityScore}`);
    }
    
    console.log('✅ Carbon calculation test passed!\n');
    passedTests++;
    
  } catch (error) {
    console.error('❌ Carbon calculation test failed:', error.message, '\n');
  }
  
  // Test 2: Offers filtering
  console.log('Test 2: Offers filtering');
  totalTests++;
  try {
    const ecoPoints = 25;
    const offers = getAvailableOffers(ecoPoints);
    
    console.log('✓ Eco points:', ecoPoints);
    console.log('✓ Available offers:', offers.length);
    
    // All offers should require 25 points or less
    const invalidOffers = offers.filter(offer => offer.pointsRequired > ecoPoints);
    
    if (invalidOffers.length > 0) {
      throw new Error(`Found ${invalidOffers.length} offers that require more points than available`);
    }
    
    // Check if offers are sorted by points (descending)
    for (let i = 0; i < offers.length - 1; i++) {
      if (offers[i].pointsRequired < offers[i + 1].pointsRequired) {
        throw new Error('Offers are not sorted correctly by points required');
      }
    }
    
    console.log('✅ Offers filtering test passed!\n');
    passedTests++;
    
  } catch (error) {
    console.error('❌ Offers filtering test failed:', error.message, '\n');
  }
  
  // Test 3: Mock image recognition
  console.log('Test 3: Mock image recognition');
  totalTests++;
  try {
    const filename = 'test-image.jpg';
    const items = mockImageRecognition(filename);
    
    console.log('✓ Mock recognition result:', items);
    
    if (!Array.isArray(items)) {
      throw new Error('Mock recognition should return an array');
    }
    
    if (items.length === 0) {
      throw new Error('Mock recognition should return at least one item');
    }
    
    // Check if all items are strings
    const invalidItems = items.filter(item => typeof item !== 'string');
    if (invalidItems.length > 0) {
      throw new Error('All detected items should be strings');
    }
    
    console.log('✅ Mock image recognition test passed!\n');
    passedTests++;
    
  } catch (error) {
    console.error('❌ Mock image recognition test failed:', error.message, '\n');
  }
  
  // Test 4: Edge cases
  console.log('Test 4: Edge cases');
  totalTests++;
  try {
    // Empty items array
    const emptyResult = calculateCarbonFootprint([]);
    if (emptyResult.totalCarbon !== 0) {
      throw new Error('Empty items should result in 0 carbon');
    }
    
    if (emptyResult.ecoPoints !== 50) {
      throw new Error('Empty items should result in maximum eco points (50)');
    }
    
    // Unknown item
    const unknownResult = calculateCarbonFootprint(['Unknown-Item']);
    if (unknownResult.totalCarbon !== 5) {
      throw new Error('Unknown items should default to 5 kg CO₂');
    }
    
    // Zero eco points
    const zeroPointsOffers = getAvailableOffers(0);
    if (zeroPointsOffers.length !== 0) {
      throw new Error('Zero points should return no offers');
    }
    
    // High eco points
    const highPointsOffers = getAvailableOffers(100);
    if (highPointsOffers.length === 0) {
      throw new Error('High points should return some offers');
    }
    
    console.log('✅ Edge cases test passed!\n');
    passedTests++;
    
  } catch (error) {
    console.error('❌ Edge cases test failed:', error.message, '\n');
  }
  
  // Test 5: Carbon impact levels
  console.log('Test 5: Carbon impact levels');
  totalTests++;
  try {
    const lowImpact = calculateCarbonFootprint(['Socks']); // 2 kg CO₂
    const mediumImpact = calculateCarbonFootprint(['T-shirt', 'Shorts']); // 8 kg CO₂
    const highImpact = calculateCarbonFootprint(['Jeans', 'Shirt']); // 14 kg CO₂
    const veryHighImpact = calculateCarbonFootprint(['Coat', 'Jacket']); // 27 kg CO₂
    
    if (lowImpact.impactLevel !== 'Low') {
      throw new Error(`Expected Low impact, got ${lowImpact.impactLevel}`);
    }
    
    if (mediumImpact.impactLevel !== 'Medium') {
      throw new Error(`Expected Medium impact, got ${mediumImpact.impactLevel}`);
    }
    
    if (highImpact.impactLevel !== 'High') {
      throw new Error(`Expected High impact, got ${highImpact.impactLevel}`);
    }
    
    if (veryHighImpact.impactLevel !== 'Very High') {
      throw new Error(`Expected Very High impact, got ${veryHighImpact.impactLevel}`);
    }
    
    console.log('✅ Carbon impact levels test passed!\n');
    passedTests++;
    
  } catch (error) {
    console.error('❌ Carbon impact levels test failed:', error.message, '\n');
  }
  
  // Test Summary
  console.log('📊 Test Summary:');
  console.log(`✅ Passed: ${passedTests}/${totalTests} tests`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests} tests`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! EcoScan backend is working correctly.');
  } else {
    console.log('⚠️ Some tests failed. Please check the implementation.');
  }
  
  return { passed: passedTests, total: totalTests };
}

// Run tests
runTests();