import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [activeTab, setActiveTab] = useState('login');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [auctions, setAuctions] = useState([]);
  const [myAuctions, setMyAuctions] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    full_name: '',
    email: '',
    username: '',
    password: '',
    confirm_password: ''
  });

  const [newAuction, setNewAuction] = useState({
    title: '',
    description: '',
    starting_price: '',
    duration_hours: 24
  });

  const [bidAmount, setBidAmount] = useState('');

  // Fetch all auctions
  const fetchAuctions = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/auctions');
      setAuctions(response.data.auctions || []);
    } catch (error) {
      console.error('Error fetching auctions:', error);
    }
  };

  // Fetch user's auctions
  const fetchMyAuctions = async () => {
    if (!loggedInUser) return;
    try {
      const response = await axios.get(`http://localhost:7000/api/auctions/user/${loggedInUser.id}`);
      setMyAuctions(response.data.auctions || []);
    } catch (error) {
      console.error('Error fetching my auctions:', error);
    }
  };

  // Fetch user's bids
  const fetchMyBids = async () => {
    if (!loggedInUser) return;
    try {
      const response = await axios.get(`http://localhost:7000/api/bids/user/${loggedInUser.id}`);
      setMyBids(response.data.bids || []);
    } catch (error) {
      console.error('Error fetching my bids:', error);
    }
  };

  // Create new auction
  const handleCreateAuction = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/api/auctions', {
        ...newAuction,
        seller_id: loggedInUser.id,
        seller_name: loggedInUser.full_name
      });
      setMessage({ text: response.data.message, type: 'success' });
      setShowCreateModal(false);
      setNewAuction({ title: '', description: '', starting_price: '', duration_hours: 24 });
      fetchAuctions();
      fetchMyAuctions();
    } catch (error) {
      setMessage({ text: error.response?.data?.message || 'Failed to create auction', type: 'danger' });
    }
  };

  // Place bid
  const handlePlaceBid = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/api/bids', {
        auction_id: selectedAuction._id,
        bidder_id: loggedInUser.id,
        bidder_name: loggedInUser.full_name,
        bid_amount: parseFloat(bidAmount)
      });
      setMessage({ text: response.data.message, type: 'success' });
      setShowBidModal(false);
      setBidAmount('');
      setSelectedAuction(null);
      fetchAuctions();
      fetchMyBids();
    } catch (error) {
      setMessage({ text: error.response?.data?.message || 'Failed to place bid', type: 'danger' });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!loginData.username || !loginData.password) {
      setMessage({ text: 'Please fill all fields', type: 'danger' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:7000/api/login', loginData);
      setMessage({ text: response.data.message, type: 'success' });
      setLoggedInUser(response.data.user);
      setLoginData({ username: '', password: '' });
      
      setTimeout(() => {
        setCurrentPage('dashboard');
        setMessage({ text: '', type: '' });
        fetchAuctions();
        fetchMyAuctions();
        fetchMyBids();
      }, 1000);
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || 'Login failed', 
        type: 'danger' 
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!registerData.full_name || !registerData.email || 
        !registerData.username || !registerData.password || 
        !registerData.confirm_password) {
      setMessage({ text: 'Please fill all fields', type: 'danger' });
      return;
    }

    if (registerData.password !== registerData.confirm_password) {
      setMessage({ text: 'Passwords do not match', type: 'danger' });
      return;
    }

    if (registerData.password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters', type: 'danger' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:7000/api/register', {
        full_name: registerData.full_name,
        email: registerData.email,
        username: registerData.username,
        password: registerData.password
      });
      
      setMessage({ text: response.data.message, type: 'success' });
      
      setRegisterData({
        full_name: '',
        email: '',
        username: '',
        password: '',
        confirm_password: ''
      });
      
      setTimeout(() => setActiveTab('login'), 2000);
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || 'Registration failed', 
        type: 'danger' 
      });
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setCurrentPage('login');
    setActiveTab('login');
    setMessage({ text: 'Logged out successfully!', type: 'success' });
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 2000);
  };

  if (currentPage === 'login') {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header">
                <h3 className="text-center mb-0">Online Auction & Bidding</h3>
              </div>
              <div className="card-body">
                <ul className="nav nav-tabs mb-4">
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                      onClick={() => {
                        setActiveTab('login');
                        setMessage({ text: '', type: '' });
                      }}
                    >
                      Login
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                      onClick={() => {
                        setActiveTab('register');
                        setMessage({ text: '', type: '' });
                      }}
                    >
                      Register
                    </button>
                  </li>
                </ul>

                {message.text && (
                  <div className={`alert alert-${message.type}`} role="alert">
                    {message.text}
                  </div>
                )}

                {activeTab === 'login' && (
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="loginUsername" className="form-label">Username or Email</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="loginUsername"
                        value={loginData.username}
                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        placeholder="Enter username or email"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="loginPassword" className="form-label">Password</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="loginPassword"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        placeholder="Enter password"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                  </form>
                )}

                {activeTab === 'register' && (
                  <form onSubmit={handleRegister}>
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="fullName"
                        value={registerData.full_name}
                        onChange={(e) => setRegisterData({ ...registerData, full_name: e.target.value })}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="username"
                        value={registerData.username}
                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                        placeholder="Choose username"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        placeholder="Enter password"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="confirmPassword"
                        value={registerData.confirm_password}
                        onChange={(e) => setRegisterData({ ...registerData, confirm_password: e.target.value })}
                        placeholder="Re-enter password"
                      />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Register</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#dashboard">
            🏆 Online Auction & Bidding
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <span className="nav-link text-white">
                  Welcome, <strong>{loggedInUser?.full_name}</strong>!
                </span>
              </li>
              <li className="nav-item">
                <button 
                  className="btn btn-outline-danger ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow-lg mb-4">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">🏠 Dashboard</h4>
              </div>
              <div className="card-body">
                {message.text && (
                  <div className={`alert alert-${message.type}`} role="alert">
                    {message.text}
                  </div>
                )}
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="card border-primary">
                      <div className="card-body text-center">
                        <h5 className="card-title">👤 Profile</h5>
                        <p className="card-text text-muted">@{loggedInUser?.username}</p>
                        <p className="card-text"><strong>{loggedInUser?.full_name}</strong></p>
                        <small className="text-muted">Member since today</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card border-success">
                      <div className="card-body text-center">
                        <h5 className="card-title">🛍️ Active Auctions</h5>
                        <p className="card-text display-6">{auctions.length}</p>
                        <button className="btn btn-sm btn-success" onClick={fetchAuctions}>Refresh</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card border-warning">
                      <div className="card-body text-center">
                        <h5 className="card-title">💰 My Bids</h5>
                        <p className="card-text display-6">{myBids.length}</p>
                        <button className="btn btn-sm btn-warning" onClick={fetchMyBids}>Refresh</button>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5>�️ All Active Auctions</h5>
                      <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
                        ✏️ Create New Auction
                      </button>
                    </div>
                    <div className="row">
                      {auctions.length === 0 ? (
                        <div className="col-12">
                          <div className="alert alert-info">
                            No active auctions yet. Be the first to create one!
                          </div>
                        </div>
                      ) : (
                        auctions.map(auction => (
                          <div key={auction._id} className="col-md-4 mb-3">
                            <div className="card h-100">
                              <img src={auction.image_url} className="card-img-top" alt={auction.title} />
                              <div className="card-body">
                                <h6 className="card-title">{auction.title}</h6>
                                <p className="card-text text-muted small">{auction.description.substring(0, 80)}...</p>
                                <p className="mb-1"><strong>Current Price: ${auction.current_price}</strong></p>
                                <p className="text-muted small">Seller: {auction.seller_name}</p>
                                <button 
                                  className="btn btn-success btn-sm w-100"
                                  onClick={() => { setSelectedAuction(auction); setShowBidModal(true); }}
                                  disabled={auction.seller_id === loggedInUser?.id}
                                >
                                  {auction.seller_id === loggedInUser?.id ? 'Your Auction' : 'Place Bid'}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <h5>📋 My Listings ({myAuctions.length})</h5>
                    {myAuctions.length === 0 ? (
                      <div className="alert alert-secondary">You haven't created any auctions yet.</div>
                    ) : (
                      <div className="list-group">
                        {myAuctions.map(auction => (
                          <div key={auction._id} className="list-group-item">
                            <div className="d-flex justify-content-between">
                              <h6 className="mb-1">{auction.title}</h6>
                              <span className="badge bg-success">${auction.current_price}</span>
                            </div>
                            <small className="text-muted">Status: {auction.status}</small>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <h5>💰 My Bids ({myBids.length})</h5>
                    {myBids.length === 0 ? (
                      <div className="alert alert-secondary">You haven't placed any bids yet.</div>
                    ) : (
                      <div className="list-group">
                        {myBids.map(bid => (
                          <div key={bid._id} className="list-group-item">
                            <div className="d-flex justify-content-between">
                              <h6 className="mb-1">{bid.auction_id?.title || 'Auction'}</h6>
                              <span className="badge bg-warning">${bid.bid_amount}</span>
                            </div>
                            <small className="text-muted">Bid placed: {new Date(bid.created_at).toLocaleString()}</small>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Auction Modal */}
      {showCreateModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Auction</h5>
                <button type="button" className="btn-close" onClick={() => setShowCreateModal(false)}></button>
              </div>
              <form onSubmit={handleCreateAuction}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={newAuction.title}
                      onChange={(e) => setNewAuction({...newAuction, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea 
                      className="form-control" 
                      rows="3"
                      value={newAuction.description}
                      onChange={(e) => setNewAuction({...newAuction, description: e.target.value})}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Starting Price ($)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      min="1"
                      value={newAuction.starting_price}
                      onChange={(e) => setNewAuction({...newAuction, starting_price: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Duration (hours)</label>
                    <select 
                      className="form-select"
                      value={newAuction.duration_hours}
                      onChange={(e) => setNewAuction({...newAuction, duration_hours: parseInt(e.target.value)})}
                    >
                      <option value="1">1 hour</option>
                      <option value="6">6 hours</option>
                      <option value="12">12 hours</option>
                      <option value="24">24 hours</option>
                      <option value="48">48 hours</option>
                      <option value="72">72 hours</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Create Auction</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Place Bid Modal */}
      {showBidModal && selectedAuction && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Place Bid - {selectedAuction.title}</h5>
                <button type="button" className="btn-close" onClick={() => { setShowBidModal(false); setBidAmount(''); }}></button>
              </div>
              <form onSubmit={handlePlaceBid}>
                <div className="modal-body">
                  <p><strong>Current Price:</strong> ${selectedAuction.current_price}</p>
                  <p className="text-muted">{selectedAuction.description}</p>
                  <div className="mb-3">
                    <label className="form-label">Your Bid Amount ($)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      min={selectedAuction.current_price + 1}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder={`Minimum: $${selectedAuction.current_price + 1}`}
                      required
                    />
                    <small className="text-muted">Must be higher than ${selectedAuction.current_price}</small>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => { setShowBidModal(false); setBidAmount(''); }}>Cancel</button>
                  <button type="submit" className="btn btn-success">Place Bid</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
