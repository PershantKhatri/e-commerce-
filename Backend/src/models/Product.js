const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, index: true },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  price: { type: Number, required: true, index: true },
  discountPrice: { type: Number, default: 0 },
  discountPercentage: { type: Number, default: 0 },
  category: { type: String, required: true, index: true },
  subcategory: { type: String },
  brand: { type: String, required: true, index: true },
  sku: { type: String, required: true, unique: true, index: true },
  stockQuantity: { type: Number, required: true, default: 0 },
  images: [{ type: String, required: true }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false, index: true },
  isNewArrival: { type: Boolean, default: false, index: true },
  status: { type: String, enum: ['active', 'draft', 'archived'], default: 'active' }
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', brand: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);