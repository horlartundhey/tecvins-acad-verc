const mongoose = require('mongoose');

const globalSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'global', unique: true },
    isGlobalWaitlistEnabled: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('GlobalSettings', globalSettingsSchema);
