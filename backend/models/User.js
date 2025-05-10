const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false, // Don't return password in queries
  },
  name: {
    type: String,
    required: false,
  },
  registrationStatus: {
    type: String,
    enum: ['registered', 'unregistered'],
    default: 'unregistered',
  },
  lastRegistrationTime: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, phoneNumber: this.phoneNumber },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Match password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Update registration status
UserSchema.methods.updateRegistrationStatus = async function (status) {
  this.registrationStatus = status;
  if (status === 'registered') {
    this.lastRegistrationTime = Date.now();
  }
  await this.save();
};

module.exports = mongoose.model('User', UserSchema);