// The axios instances reject with `error.response.data` (the raw backend body),
// while raw axios errors still carry `error.response`. Handle both shapes so a
// backend message never gets lost and thunks never throw while building payloads.
export const getApiErrorMessage = (error, fallback = 'Something went wrong. Please try again.') => {
  if (typeof error === 'string') {
    return error;
  }

  if (!error || typeof error !== 'object') {
    return fallback;
  }

  return (
    error.response?.data?.message ||
    error.data?.message ||
    error.message ||
    fallback
  );
};
