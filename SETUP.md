# 🚀 Setup Instructions

## Prerequisites

- Node.js (v16+)
- MongoDB
- Redis
- Agora Account (for video streaming)
- Payment Gateway Accounts (Razorpay/Paytm/PhonePe)

## Backend Setup

### 1. Clone Repository
```bash
git clone https://github.com/gbultimateservices-collab/tango-live-clone.git
cd tango-live-clone/backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

**Required API Keys:**

#### Agora (Video Streaming)
1. Sign up at https://www.agora.io
2. Create a project
3. Get App ID and Certificate
4. Add to `.env`

#### Razorpay
1. Sign up at https://razorpay.com
2. Get API Key and Secret from Dashboard
3. Add to `.env`

#### Paytm
1. Sign up at https://business.paytm.com
2. Get Merchant ID and Key
3. Add to `.env`

#### PhonePe
1. Sign up at https://www.phonepe.com/business
2. Get Merchant ID and Salt Key
3. Add to `.env`

### 4. Start MongoDB
```bash
mongod
```

### 5. Start Redis
```bash
redis-server
```

### 6. Run Backend
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Frontend Setup (Coming Soon)

Mobile app setup instructions will be added.

## Testing Payment Gateways

### Razorpay Test Mode
- Use test API keys
- Test cards: 4111 1111 1111 1111
- Any future expiry date
- Any CVV

### Paytm Staging
- Use staging credentials
- Test wallet: 7777777777
- OTP: 489871

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Streams
- `POST /api/streams/start` - Start live stream
- `POST /api/streams/end/:streamId` - End stream
- `GET /api/streams/live` - Get live streams
- `POST /api/streams/join/:streamId` - Join stream

### Gifts
- `GET /api/gifts` - Get all gifts
- `POST /api/gifts/send` - Send gift
- `GET /api/gifts/history/:userId` - Gift history

### Payments
- `POST /api/payments/razorpay/create-order` - Create Razorpay order
- `POST /api/payments/razorpay/verify` - Verify payment
- `POST /api/payments/paytm/initiate` - Paytm payment
- `POST /api/payments/phonepe/initiate` - PhonePe payment

### Users
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/:userId` - Update profile
- `POST /api/users/follow` - Follow user
- `GET /api/users/leaderboard/top` - Leaderboards

## Next Steps

1. ✅ Backend API created
2. 🔄 Create mobile app (React Native/Flutter)
3. 🔄 Add gift animations
4. 🔄 Implement notifications
5. 🔄 Add analytics dashboard
6. 🔄 Deploy to production

## Support

For issues, contact: gbultimateservices@gmail.com
