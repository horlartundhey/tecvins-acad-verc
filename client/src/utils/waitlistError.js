export const getWaitlistErrorMessage = (error) => {
  if (typeof error === 'string') {
    return error;
  }

  if (!error || typeof error !== 'object') {
    return 'Failed to update waitlist entry';
  }

  return (
    error.response?.data?.message ||
    error.data?.message ||
    error.message ||
    'Failed to update waitlist entry'
  );
};
