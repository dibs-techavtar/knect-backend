const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: [
      {
        module: {
          type: String,
          required: true,
        },
        access: {
          type: [String],
          enum: ['read', 'write', 'delete'],
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Role', roleSchema);
    