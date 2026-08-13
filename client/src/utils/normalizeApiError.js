// Both axios instances used to reject with the raw response body, which broke
// every consumer written as `error.response.data.message`. Rejecting with the
// raw axios error instead would break the consumers written as `error.message`.
//
// So we reject with an Error that satisfies both: `.message` carries the
// backend's message, and `.response` / `.data` / `.status` stay available for
// callers that need the status code or extra fields.
export const normalizeApiError = (error) => {
  const data = error?.response?.data;

  const message =
    data?.message ||
    data?.error ||
    error?.message ||
    'Something went wrong. Please try again.';

  const normalized = new Error(message);
  normalized.name = 'ApiError';
  normalized.response = error?.response;
  normalized.data = data;
  normalized.status = error?.response?.status;
  normalized.code = error?.code;
  normalized.originalError = error;

  return normalized;
};
