const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner');

/**
 * Owner Authentication Middleware
 * Sirf ek hi owner hai - single person security
 */
const ownerAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: '🔐 PIN daalo pehle. Authentication required.',
        code: 'NO_TOKEN'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jeeva_default_secret');
    const owner = await Owner.findById(decoded.ownerId);

    if (!owner || !owner.isActive) {
      return res.status(401).json({
        success: false,
        error: '⛔ Owner not found or inactive.',
        code: 'INVALID_OWNER'
      });
    }

    // Update last active
    owner.stats.lastActive = new Date();
    await owner.save();

    req.owner = owner;
    req.ownerId = owner._id;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: '⛔ Invalid token. Dobara login karo.',
        code: 'INVALID_TOKEN'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: '⏰ Session expire ho gaya. Dobara PIN daalo.',
        code: 'TOKEN_EXPIRED'
      });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Optional auth - doesn't block if no token
 * Used for public endpoints that behave differently when authenticated
 */
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jeeva_default_secret');
      const owner = await Owner.findById(decoded.ownerId);
      if (owner && owner.isActive) {
        req.owner = owner;
        req.ownerId = owner._id;
      }
    }
    next();
  } catch {
    next();
  }
};

module.exports = { ownerAuth, optionalAuth };
