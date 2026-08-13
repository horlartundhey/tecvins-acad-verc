import test from 'node:test';
import assert from 'node:assert/strict';

import { normalizeApiError } from './normalizeApiError.js';
import { getApiErrorMessage } from './apiError.js';

test('normalizeApiError exposes the backend message on every access pattern', () => {
  const axiosError = new Error('Request failed with status code 400');
  axiosError.response = {
    status: 400,
    data: { success: false, message: 'Email is already subscribed to our newsletter.' }
  };

  const normalized = normalizeApiError(axiosError);

  // The three shapes used across the codebase all resolve to the backend message
  assert.equal(normalized.message, 'Email is already subscribed to our newsletter.');
  assert.equal(normalized.response.data.message, 'Email is already subscribed to our newsletter.');
  assert.equal(normalized.data.message, 'Email is already subscribed to our newsletter.');
  assert.equal(getApiErrorMessage(normalized), 'Email is already subscribed to our newsletter.');

  // Status stays reachable for callers that branch on it
  assert.equal(normalized.status, 400);
  assert.ok(normalized instanceof Error);
});

test('normalizeApiError falls back to the `error` field, then the axios message', () => {
  const withErrorField = new Error('Request failed with status code 500');
  withErrorField.response = { status: 500, data: { error: 'Cloudinary upload failed' } };
  assert.equal(normalizeApiError(withErrorField).message, 'Cloudinary upload failed');

  // Network error: no response at all
  const networkError = new Error('Network Error');
  networkError.code = 'ERR_NETWORK';
  const normalized = normalizeApiError(networkError);
  assert.equal(normalized.message, 'Network Error');
  assert.equal(normalized.status, undefined);
  assert.equal(normalized.code, 'ERR_NETWORK');

  // Nothing usable at all
  assert.equal(normalizeApiError({}).message, 'Something went wrong. Please try again.');
});
