import type { Context, Next } from 'hono';

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (err: unknown) { // 1. Use 'unknown' instead of 'any'
    console.error(err);

    // 2. Check if the error is an Error object
    if (err instanceof Error) {
      // 3. Check if the error has a 'statusCode' property
      const statusCode = 'statusCode' in err ? (err as any).statusCode : 500;
      return c.json({ error: err.message }, statusCode);
    }

    // If it's not an Error object, return a generic error
    return c.json({ error: 'Internal Server Error' }, 500);
  }
};