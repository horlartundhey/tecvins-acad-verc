require('dotenv').config();
const mongoose = require('mongoose');
const Donation = require('./src/models/Donation');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const result = await Donation.updateMany(
    { status: 'pending' },
    { $set: { status: 'completed', paymentDate: new Date() } }
  );
  console.log(`Marked ${result.modifiedCount} donation(s) as completed.`);
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });
