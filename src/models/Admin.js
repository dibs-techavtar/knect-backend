const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema(
  {
    isSuperAdmin: {
      type: Boolean,
      default: false, // Only the first Super Admin will be true
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    mobileNumber: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    lastLogin: {
      type: Date,
    },
    passwordResetOTP: {
      type: String, // OTP for password reset
    },
    passwordResetOTPExpires: {
      type: Date, // OTP expiry time
    },
    IsOtpVerified: {
      type: Boolean,
      default: false, // Will track whether the OTP was verified
    },
  },
  { timestamps: true },
);

adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model('Admin', adminSchema);
