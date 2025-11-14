const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect, adminOnly } = require('../middleware/auth');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};


router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, address, contact, dob, profilePhoto } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Creating user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student',
      address,
      contact,
      dob,
      profilePhoto: profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please login.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Server error during registration'
    });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validat input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check user exists and get password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Checking password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Set all other users as inactive
    await User.updateMany({ _id: { $ne: user._id } }, { isActive: false });

    // Set current user active
    user.isActive = true;
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        contact: user.contact,
        dob: user.dob,
        profilePhoto: user.profilePhoto,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(400).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

router.post('/logout', protect, async (req, res) => {
  try {
    // Set user as inactive
    await User.findByIdAndUpdate(req.user._id, { isActive: false });

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Server error during logout'
    });
  }
});

router.get('/users', protect, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Server error fetching users'
    });
  }
});

router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Server error fetching user data'
    });
  }
});


router.delete('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete yourself'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Server error deleting user'
    });
  }
});

module.exports = router;