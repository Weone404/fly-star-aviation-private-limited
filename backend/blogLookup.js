const { ObjectId } = require('mongodb');

function isValidObjectId(value) {
  return typeof value === 'string' && /^[0-9a-fA-F]{24}$/.test(value.trim());
}

function getLookupQuery(value) {
  const trimmed = String(value || '').trim();
  if (!trimmed) return null;

  if (isValidObjectId(trimmed)) {
    return { _id: new ObjectId(trimmed) };
  }

  return { slug: trimmed };
}

module.exports = {
  isValidObjectId,
  getLookupQuery,
};
