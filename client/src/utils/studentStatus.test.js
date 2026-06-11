import test from 'node:test';
import assert from 'node:assert/strict';

import { formatStatusLabel, getStatusStyles } from './studentStatus.js';

test('formatStatusLabel normalizes admin status values', () => {
  assert.equal(formatStatusLabel('accepted'), 'Accepted');
  assert.equal(formatStatusLabel('approved'), 'Approved');
  assert.equal(formatStatusLabel('rejected'), 'Rejected');
  assert.equal(formatStatusLabel('enrolled'), 'Enrolled');
  assert.equal(formatStatusLabel('pending'), 'Pending');
  assert.equal(formatStatusLabel('unknown-status'), 'Unknown Status');
});

test('getStatusStyles returns the expected classes for each status', () => {
  assert.match(getStatusStyles('approved').badge, /bg-green-100/);
  assert.match(getStatusStyles('rejected').badge, /bg-red-100/);
  assert.match(getStatusStyles('enrolled').badge, /bg-blue-100/);
  assert.match(getStatusStyles('pending').badge, /bg-yellow-100/);
});
