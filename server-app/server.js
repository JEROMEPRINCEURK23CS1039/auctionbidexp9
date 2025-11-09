const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/auctionDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// MongoDB Connection Events
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

// User Schema
const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

// Auction Schema
const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  starting_price: { type: Number, required: true },
  current_price: { type: Number, required: true },
  image_url: { type: String, default: 'https://via.placeholder.com/300x200?text=Auction+Item' },
  seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller_name: { type: String, required: true },
  status: { type: String, enum: ['active', 'closed', 'sold'], default: 'active' },
  end_time: { type: Date, required: true },
  created_at: { type: Date, default: Date.now }
});

const Auction = mongoose.model('Auction', auctionSchema);

// Bid Schema
const bidSchema = new mongoose.Schema({
  auction_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction', required: true },
  bidder_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bidder_name: { type: String, required: true },
  bid_amount: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

const Bid = mongoose.model('Bid', bidSchema);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  res.json({ 
    success: true, 
    message: 'Server is running',
    database: dbConnected ? 'Connected' : 'Disconnected'
  });
});

// Registration Route
app.post('/api/register', async (req, res) => {
  try {
    const { full_name, email, username, password } = req.body;

    // Validation
    if (!full_name || !email || !username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username or email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      full_name,
      email,
      username,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ 
      success: true, 
      message: 'Registration successful!' 
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration: ' + error.message 
    });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide username and password' 
      });
    }

    // Find user by username or email
    const user = await User.findOne({ 
      $or: [{ username }, { email: username }] 
    });

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or email' 
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid password' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Login successful!',
      user: { 
        id: user._id, 
        full_name: user.full_name, 
        username: user.username 
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login: ' + error.message 
    });
  }
});

// Get All Active Auctions
app.get('/api/auctions', async (req, res) => {
  try {
    const auctions = await Auction.find({ status: 'active' }).sort({ created_at: -1 });
    res.json({ success: true, auctions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching auctions', error: error.message });
  }
});

// Get User's Auctions
app.get('/api/auctions/user/:userId', async (req, res) => {
  try {
    const auctions = await Auction.find({ seller_id: req.params.userId }).sort({ created_at: -1 });
    res.json({ success: true, auctions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user auctions', error: error.message });
  }
});

// Create New Auction
app.post('/api/auctions', async (req, res) => {
  try {
    const { title, description, starting_price, seller_id, seller_name, duration_hours } = req.body;

    if (!title || !description || !starting_price || !seller_id || !seller_name) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const endTime = new Date();
    endTime.setHours(endTime.getHours() + (duration_hours || 24));

    const newAuction = new Auction({
      title,
      description,
      starting_price,
      current_price: starting_price,
      seller_id,
      seller_name,
      end_time: endTime
    });

    await newAuction.save();
    res.status(201).json({ success: true, message: 'Auction created successfully!', auction: newAuction });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating auction', error: error.message });
  }
});

// Place Bid
app.post('/api/bids', async (req, res) => {
  try {
    const { auction_id, bidder_id, bidder_name, bid_amount } = req.body;

    if (!auction_id || !bidder_id || !bidder_name || !bid_amount) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const auction = await Auction.findById(auction_id);
    if (!auction) {
      return res.status(404).json({ success: false, message: 'Auction not found' });
    }

    if (auction.status !== 'active') {
      return res.status(400).json({ success: false, message: 'Auction is not active' });
    }

    if (bid_amount <= auction.current_price) {
      return res.status(400).json({ 
        success: false, 
        message: `Bid must be higher than current price $${auction.current_price}` 
      });
    }

    const newBid = new Bid({
      auction_id,
      bidder_id,
      bidder_name,
      bid_amount
    });

    await newBid.save();

    // Update auction current price
    auction.current_price = bid_amount;
    await auction.save();

    res.status(201).json({ success: true, message: 'Bid placed successfully!', bid: newBid });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error placing bid', error: error.message });
  }
});

// Get User's Bids
app.get('/api/bids/user/:userId', async (req, res) => {
  try {
    const bids = await Bid.find({ bidder_id: req.params.userId })
      .populate('auction_id')
      .sort({ created_at: -1 });
    res.json({ success: true, bids });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user bids', error: error.message });
  }
});

// Get Bids for an Auction
app.get('/api/bids/auction/:auctionId', async (req, res) => {
  try {
    const bids = await Bid.find({ auction_id: req.params.auctionId }).sort({ created_at: -1 });
    res.json({ success: true, bids });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching auction bids', error: error.message });
  }
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
