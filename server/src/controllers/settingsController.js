const GlobalSettings = require('../models/GlobalSettings');

// GET /api/settings — public
exports.getSettings = async (req, res) => {
  try {
    let settings = await GlobalSettings.findOne({ key: 'global' });
    if (!settings) {
      settings = await GlobalSettings.create({ key: 'global', isGlobalWaitlistEnabled: false });
    }
    res.json({ data: settings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PATCH /api/settings — admin only
exports.updateSettings = async (req, res) => {
  try {
    const { isGlobalWaitlistEnabled } = req.body;
    const settings = await GlobalSettings.findOneAndUpdate(
      { key: 'global' },
      { isGlobalWaitlistEnabled },
      { upsert: true, new: true }
    );
    res.json({ message: 'Settings updated', data: settings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
