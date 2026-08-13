import test from 'node:test';
import assert from 'node:assert/strict';

import { getApiErrorMessage } from './apiError.js';

test('getApiErrorMessage reads the message from every rejection shape', () => {
  // Plain string rejection
  assert.equal(getApiErrorMessage('Cohort is full'), 'Cohort is full');

  // Raw axios error (no interceptor unwrapping)
  assert.equal(
    getApiErrorMessage({ response: { data: { message: 'Email is already subscribed to our newsletter.' } } }),
    'Email is already subscribed to our newsletter.'
  );

  // Unwrapped body, as apiService/api interceptors reject with
  assert.equal(
    getApiErrorMessage({ success: false, message: 'Email is already subscribed to our newsletter.' }),
    'Email is already subscribed to our newsletter.'
  );

  // Network / timeout error
  assert.equal(getApiErrorMessage(new Error('Network Error')), 'Network Error');

  // Nothing usable falls back
  assert.equal(getApiErrorMessage(undefined, 'Failed to subscribe.'), 'Failed to subscribe.');
  assert.equal(getApiErrorMessage({}, 'Failed to subscribe.'), 'Failed to subscribe.');
});
