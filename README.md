# 🌍 EcoScan - Clothing Carbon Footprint Scanner

## 📜 Overview

EcoScan is a full-stack web application designed to help users understand the environmental impact of their clothing choices. By uploading images of clothing items, users can see estimated carbon scores, earn eco-reward points, and redeem sustainability-focused offers. This project demonstrates a complete MERN stack solution for a green initiative product, built as part of the **Reewild Full Stack Engineer Take Home Challenge**.

## 🔧 Tech Stack

- **Frontend**: React 18 with JavaScript
- **Backend**: Node.js with Express
- **Styling**: Tailwind CSS with custom gradients and animations
- **Image Recognition**: OpenAI GPT-4 Vision API
- **File Upload**: Multer with image validation
- **HTTP Client**: Axios for API communication
- **Icons**: Lucide React for beautiful, consistent icons

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js
- npm or yarn
- OpenAI API key 

### 1. Clone the Repository
```bash
git clone https://github.com/[your-username](https://github.com/GUGULOTHVENKATESH)/ecoscan
```

### 2. Install Dependencies
Install dependencies for both frontend and backend:
```bash
npm run install:all
```

Or install manually:
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install
```

### 3. Environment Configuration
Create a `.env` file in the `server` directory:
```bash
cd server
cp .env.example .env
```

Edit the `.env` file:
```env
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_her
```

### 4. Run the Application
Start both frontend and backend servers:
```bash
npm run dev
```

This will start:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

### 5. Alternative: Manual Start
Start servers separately:

**Backend** (Terminal 1):
```bash
cd server
npm run dev
```

**Frontend** (Terminal 2):
```bash
cd client
npm run dev
```

---

## 🧪 Testing

Run the backend test suite:
```bash
npm test
```

Or run tests directly:
```bash
cd server
npm test
```

The test suite covers:
- Carbon footprint calculations
- Offers filtering logic
- Mock image recognition
- Edge cases and error handling
- Impact level classifications

---

## 🌱 Carbon Score Assumptions

EcoScan uses research-based estimates for clothing carbon footprints. These values represent the approximate CO₂ emissions from production, transportation, and processing:

| 👕 Item | 🌍 Estimated Carbon Score (kg CO₂) | 📊 Impact Level |
|----------|-----------------------------------|-----------------|
| T-shirt | 5 | Low-Medium |
| Jeans | 10 | Medium-High |
| Sweater | 7 | Medium |
| Jacket | 12 | High |
| Dress | 8 | Medium |
| Shirt | 4 | Low |
| Pants | 9 | Medium |
| Skirt | 6 | Medium |
| Hoodie | 8 | Medium |
| Shorts | 3 | Low |
| Shoes | 8 | Medium |
| Socks | 2 | Low |
| Coat | 15 | Very High |
| Blazer | 10 | Medium-High |

### Eco-Points Calculation
```javascript
ecoPoints = Math.max(0, 50 - totalCarbon)
```
- **Base Points**: 50 points
- **Deduction**: 1 point per kg CO₂
- **Incentive**: Lower carbon footprint = Higher eco-points

### Sustainability Score
```javascript
sustainabilityScore = Math.max(0, Math.min(100, 100 - (totalCarbon / 50) * 100))
```
- **Scale**: 0-100 points
- **Grading**: A+ (90+), A (80+), B (70+), C (60+), D (50+), F (<50)

---

## 🎯 Features

### Core Functionality
- **📸 Image Upload**: Drag-and-drop or camera capture
- **🤖 AI Recognition**: OpenAI GPT-4 Vision or mock detection
- **📊 Carbon Analysis**: Detailed footprint breakdown
- **🏆 Eco-Points System**: Reward sustainable choices
- **🎁 Dynamic Offers**: Personalized rewards based on points
- **📱 Responsive Design**: Works on all devices

### User Experience
- **🎨 Beautiful UI**: Modern gradients and animations
- **⚡ Real-time Analysis**: Instant feedback on uploads
- **🔄 Loading States**: Smooth transitions and progress indicators
- **❌ Error Handling**: Graceful error messages and recovery
- **💡 Educational**: Carbon footprint guide and tips

### Technical Features
- **🔒 File Validation**: Image type and size checking
- **🌐 CORS Support**: Cross-origin resource sharing
- **📝 Comprehensive Logging**: Detailed server logs
- **🧪 Test Coverage**: Unit tests for core logic
- **🔧 Environment Config**: Flexible deployment settings

---

## 🌟 Product & Technical Enhancements

### 🚀 Scaling for Production

#### Backend Optimization
1. **Database Integration**
   - MongoDB for user profiles and scan history
   - Redis for caching frequently accessed data
   - PostgreSQL for analytics and reporting

2. **Microservices Architecture**
   - Separate services for image processing, carbon calculation, and user management
   - API Gateway for request routing and rate limiting
   - Message queues (RabbitMQ/Apache Kafka) for async processing

3. **Performance Improvements**
   - CDN integration for image storage and delivery
   - Image compression and optimization
   - Database indexing and query optimization
   - Horizontal scaling with load balancers

4. **Security Enhancements**
   - JWT authentication and authorization
   - Rate limiting and DDoS protection
   - Input validation and sanitization
   - HTTPS enforcement and security headers

#### Frontend Optimization
1. **Performance**
   - Code splitting and lazy loading
   - Image optimization and WebP support
   - Service workers for offline functionality
   - Bundle size optimization

2. **User Experience**
   - Progressive Web App (PWA) capabilities
   - Push notifications for offers and updates
   - Advanced image editing tools
   - Batch upload functionality

### 📊 Enhanced Carbon Scoring Model

#### Data Sources Integration
1. **Real-time Data**
   - Fashion brand sustainability APIs
   - Supply chain transparency platforms
   - Carbon footprint databases (Higg Index, LCA databases)
   - Material composition analysis

2. **Advanced Calculations**
   - Brand-specific carbon factors
   - Manufacturing location impact
   - Transportation distance calculations
   - End-of-life disposal impact

3. **Machine Learning**
   - Custom clothing recognition models
   - Fabric type identification
   - Wear pattern analysis for longevity estimates
   - Personalized recommendations based on user behavior

#### Accuracy Improvements
1. **Computer Vision**
   - Multi-model ensemble for better accuracy
   - Fabric texture and material recognition
   - Brand logo detection for specific data
   - Clothing condition assessment

2. **Data Validation**
   - User feedback loops for model improvement
   - Expert validation of carbon calculations
   - Regular model retraining with new data
   - A/B testing for recommendation effectiveness

### ✨ User Experience Enhancements

#### Social Features
1. **Community Engagement**
   - Social sharing of sustainability achievements
   - Leaderboards and challenges
   - User-generated content and reviews
   - Sustainable fashion community forums

2. **Gamification**
   - Achievement badges and milestones
   - Seasonal challenges and competitions
   - Referral programs with rewards
   - Progress tracking and goal setting

#### Advanced Analytics
1. **Personal Insights**
   - Monthly/yearly carbon footprint reports
   - Trend analysis and comparisons
   - Personalized sustainability goals
   - Impact visualization and infographics

2. **Comparative Analysis**
   - Peer comparison (anonymized)
   - Industry benchmarking
   - Regional sustainability metrics
   - Brand sustainability rankings

### 🔌 External API Integrations

#### E-commerce Integration
1. **Shopping Platforms**
   - Direct integration with sustainable fashion retailers
   - Price comparison for eco-friendly alternatives
   - Wishlist and purchase tracking
   - Affiliate partnerships with green brands

2. **Sustainability Databases**
   - Fashion Revolution transparency index
   - B Corp certification database
   - GOTS and OEKO-TEX certification APIs
   - Carbon offset marketplace integration

#### Third-party Services
1. **Payment Processing**
   - Stripe integration for premium features
   - Carbon offset purchase options
   - Subscription models for advanced analytics
   - Donation integration for environmental causes

2. **Communication**
   - Email marketing automation (Mailchimp)
   - SMS notifications for offers (Twilio)
   - Push notifications (Firebase)
   - Social media integration (Facebook, Instagram APIs)

### 🏗️ Infrastructure & DevOps

#### Cloud Architecture
1. **AWS/Azure/GCP**
   - Auto-scaling groups for traffic spikes
   - Container orchestration with Kubernetes
   - Serverless functions for image processing
   - Multi-region deployment for global reach

2. **Monitoring & Analytics**
   - Application performance monitoring (New Relic, DataDog)
   - Error tracking and alerting (Sentry)
   - User analytics (Google Analytics, Mixpanel)
   - Business intelligence dashboards

#### Development Workflow
1. **CI/CD Pipeline**
   - Automated testing and deployment
   - Code quality checks and security scanning
   - Feature flags for gradual rollouts
   - Blue-green deployment strategies

2. **Quality Assurance**
   - Automated testing (unit, integration, e2e)
   - Performance testing and load testing
   - Security audits and penetration testing
   - Accessibility compliance (WCAG)

---

## 📱 API Documentation

### Endpoints

#### POST `/api/analyze-image`
Analyze uploaded clothing image for carbon footprint.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: image file

**Response:**
```json
{
  "success": true,
  "analysis": {
    "detectedItems": ["T-shirt", "Jeans"],
    "items": [
      {
        "item": "T-shirt",
        "carbon": 5,
        "impact": "Low"
      }
    ],
    "totalCarbon": 15,
    "ecoPoints": 35,
    "impactLevel": "Medium",
    "recommendations": ["..."],
    "sustainabilityScore": 70
  },
  "uploadedFile": {
    "name": "image.jpg",
    "size": 1024000,
    "type": "image/jpeg"
  },
  "aiUsed": true
}
```

#### GET `/api/offers?points={ecoPoints}`
Get available offers based on eco-points.

**Response:**
```json
{
  "success": true,
  "ecoPoints": 35,
  "availableOffers": [
    {
      "id": 1,
      "title": "10% Off Organic Cotton Items",
      "description": "Exclusive discount on organic cotton products",
      "pointsRequired": 20,
      "category": "discount",
      "validUntil": "2024-12-31",
      "brand": "GreenThreads",
      "value": "10%"
    }
  ],
  "totalOffers": 1
}
```

#### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "EcoScan API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🎨 Design System

### Color Palette
- **Primary Green**: #22c55e (eco-green-500)
- **Secondary Blue**: #3b82f6 (blue-500)
- **Success**: #10b981 (emerald-500)
- **Warning**: #f59e0b (amber-500)
- **Error**: #ef4444 (red-500)
- **Neutral**: #6b7280 (gray-500)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: 700-800 weight
- **Body**: 400-500 weight
- **Captions**: 400 weight

### Components
- **Cards**: Rounded corners (rounded-2xl/3xl)
- **Buttons**: Gradient backgrounds with hover effects
- **Inputs**: Soft shadows and focus states
- **Icons**: Lucide React for consistency

---

## 🚀 Deployment

### Environment Variables
```env
# Server
PORT=5000
NODE_ENV=production
OPENAI_API_KEY=your_production_api_key

# Client (build time)
VITE_API_URL=https://your-api-domain.com
```

### Build Commands
```bash
# Build frontend
npm run build

# Start production server
npm start
```

### Deployment Platforms
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: Heroku, AWS EC2, Google Cloud Run
- **Database**: MongoDB Atlas, AWS RDS
- **Images**: AWS S3, Cloudinary

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Use conventional commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Reewild** for the inspiring challenge
- **OpenAI** for GPT-4 Vision API
- **Tailwind CSS** for the beautiful styling system
- **Lucide** for the comprehensive icon library
- **React** and **Node.js** communities for excellent documentation

---

## 📞 Contact

For questions about this project or the Reewild challenge:

- **Email**: rithin.chalumuri@reewild.com
- **GitHub**: [Your GitHub Profile]
- **LinkedIn**: [Your LinkedIn Profile]

---

### 🌱 Thank you for building a greener future with EcoScan! 🌍💚

*Making fashion more sustainable, one scan at a time.*
