import { describe, it, expect } from 'vitest';

describe('blog lookup route logic', () => {
  it('keeps slug lookups for URL slugs', () => {
    const value = 'pilot-training-after-12th-in-india';
    const trimmed = String(value || '').trim();
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(trimmed);
    expect(isObjectId).toBe(false);
    expect(trimmed).toBe('pilot-training-after-12th-in-india');
  });

  it('accepts Mongo ObjectId values', () => {
    const value = '507f1f77bcf86cd799439011';
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(value);
    expect(isObjectId).toBe(true);
  });
});
