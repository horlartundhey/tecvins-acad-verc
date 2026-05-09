require('dotenv').config();
const mongoose = require('mongoose');
const Donation = require('./src/models/Donation');

// ── Records to KEEP (mark as completed) ──────────────────────────────────────
const KEEP_IDS = [
  '69ea00d5f15d99da40106b7d', // Vincent Oluwatosin Oke   | USD 100  | Apr 23 2026
  '6928beb353d08353619a6d34', // Odion Ehimiaghe           | USD 100  | Nov 27 2025 (later attempt)
  '6928aa5d524fcb1a8c4060f3', // Odion Ehimiaghe           | NGN 120  | Nov 27 2025 (paystack)
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB\n');

  // Delete everything NOT in the keep list
  const deleteResult = await Donation.deleteMany({ _id: { $nin: KEEP_IDS } });
  console.log(`Deleted ${deleteResult.deletedCount} test records.`);

  // Mark kept records as completed
  for (const id of KEEP_IDS) {
    const doc = await Donation.findById(id);
    if (doc) {
      await doc.markAsCompleted('manual');
      console.log(`✓ Marked as completed: ${doc.firstName} ${doc.lastName} | ${doc.currency} ${doc.amount}`);
    }
  }

  // Final count
  const remaining = await Donation.find({}).lean();
  console.log(`\nRemaining records (${remaining.length}):`);
  remaining.forEach(d => {
    console.log(`  • ${d.firstName} ${d.lastName} | ${d.currency} ${d.amount} | ${d.status}`);
  });

  await mongoose.disconnect();
  console.log('\nDone.');
}

run().catch(console.error);
