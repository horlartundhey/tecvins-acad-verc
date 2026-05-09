require('dotenv').config();
const mongoose = require('mongoose');
const Donation = require('./src/models/Donation');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB\n');

  const all = await Donation.find({}).sort({ createdAt: -1 }).lean();

  console.log(`Total donation records: ${all.length}\n`);
  console.log('─'.repeat(100));

  all.forEach((d, i) => {
    console.log(`[${i + 1}] ${d.firstName} ${d.lastName} | ${d.email}`);
    console.log(`    Amount: ${d.currency} ${d.amount}  |  Status: ${d.status}  |  Processor: ${d.paymentProcessor}`);
    console.log(`    Created: ${d.createdAt}  |  _id: ${d._id}`);
    console.log('─'.repeat(100));
  });

  const byStatus = all.reduce((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1;
    return acc;
  }, {});
  console.log('\nBreakdown by status:', byStatus);

  await mongoose.disconnect();
}

run().catch(console.error);
