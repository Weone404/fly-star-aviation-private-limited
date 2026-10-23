const assert = require('node:assert/strict');
const { test } = require('node:test');
const { ObjectId } = require('mongodb');
const { getLookupQuery } = require('./blogLookup');

test('uses slug lookup for non-object-id blog keys', () => {
  assert.deepEqual(getLookupQuery('pilot-training-after-12th-in-india'), {
    slug: 'pilot-training-after-12th-in-india',
  });
});

test('uses MongoDB object-id lookup for valid object ids', () => {
  const query = getLookupQuery('507f1f77bcf86cd799439011');
  assert.ok(query._id instanceof ObjectId);
  assert.equal(query._id.toHexString(), '507f1f77bcf86cd799439011');
});
