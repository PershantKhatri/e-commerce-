require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/db');

const categories = [
  'Electronics', 'Mobile Phones', 'Laptops', 'Computers', 'Fashion', 
  'Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Watches', 'Furniture', 
  'Home & Kitchen', 'Beauty', 'Sports', 'Accessories', 'Grocery', 'Toys', 'Books'
];

const brands = ['Apple', 'Samsung', 'Dell', 'Nike', 'Adidas', 'Sony', 'IKEA', 'Levis', 'Canon', 'Rolex'];

const generateSeedProducts = () => {
  const products = [];
  for (let i = 1; i <= 1000; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const price = Math.floor(Math.random() * 1500) + 20;
    const discount = Math.random() > 0.5 ? Math.floor(Math.random() * 30) : 0;
    
    products.push({
      name: `${brand} Professional Item ${i}`,
      slug: `${brand.toLowerCase()}-professional-item-${i}-${Math.random().toString(36).substring(2, 7)}`,
      description: `High-quality ${category.toLowerCase()} manufactured by ${brand}. Built for performance and reliability.`,
      shortDescription: `Premium ${brand} ${category}`,
      price,
      discountPrice: discount > 0 ? Number((price * (1 - discount / 100)).toFixed(2)) : price,
      discountPercentage: discount,
      category,
      subcategory: `${category} Sub`,
      brand,
      sku: `SKU-${i}-${Math.floor(100000 + Math.random() * 900000)}`,
      stockQuantity: Math.floor(Math.random() * 200) + 10,
      images: [`https://picsum.photos/seed/${i}/600/600`],
      rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
      numReviews: Math.floor(Math.random() * 150),
      isFeatured: Math.random() > 0.8,
      isNewArrival: Math.random() > 0.7,
      status: 'active'
    });
  }
  return products;
};

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    const seedProducts = generateSeedProducts();
    await Product.insertMany(seedProducts);
    console.log('1000+ Professional Products Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

importData();