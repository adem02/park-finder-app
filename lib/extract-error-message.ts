interface ApiErrorShape {
  response?: { data?: { message?: unknown } };
}

export const extractErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  if (typeof error !== 'object' || error === null) return fallback;

  const message = (error as ApiErrorShape).response?.data?.message;

  if (typeof message === 'string') return message;
  if (Array.isArray(message) && typeof message[0] === 'string') {
    return message[0];
  }

  return fallback;
};
