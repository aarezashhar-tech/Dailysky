import { ApiError } from '../utils/errors';

export async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Accept': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData.message) message = errorData.message;
    } catch {
      // Ignore JSON parse error on non-JSON error responses
    }
    throw new ApiError(message, response.status);
  }

  return response.json();
}