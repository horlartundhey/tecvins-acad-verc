import test from 'node:test';
import assert from 'node:assert/strict';

import { getWaitlistErrorMessage } from './waitlistError.js';

test('getWaitlistErrorMessage unwraps backend messages from thunk rejections', () => {
  assert.equal(
    getWaitlistErrorMessage('Cohort is full'),
    'Cohort is full'
  );

  assert.equal(
    getWaitlistErrorMessage({ response: { data: { message: 'Enrollment failed' } } }),
    'Enrollment failed'
  );

  assert.equal(
    getWaitlistErrorMessage({ message: 'Request failed with status code 500' }),
    'Request failed with status code 500'
  );
});
