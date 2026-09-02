const { describe, it, expect } = require('vitest');
const { getLookupQuery } = require('./blogLookup');

describe('blog lookup', () => {
  it('uses slug lookup for non-object-id blog keys', () => {
    expect(getLookupQuery('pilot-training-after-12th-in-india')).toEqual({
      slug: 'pilot-training-after-12th-in-india',
    });
  });

  it('uses mongo id lookup for valid object ids', () => {
    const value = '507f1f77bcf86cd799439011';
    expect(getLookupQuery(value)).toEqual({ _id: expect.any(Object) });
  });
});
