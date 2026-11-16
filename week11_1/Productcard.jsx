
import React from 'react';
import ExerciseLayout from './ExerciseLayout.jsx';

export function ProductCard({ name, price, rating, inStock }) {
  return (
    <article className="catalog-card product-card">
      <p className="eyebrow">TECH COLLECTION</p>

      <h2>{name}</h2>

      <p className="price">
        ₩{price.toLocaleString('ko-KR')}
      </p>

      <p className="rating">
        ⭐ {rating} out of 5
      </p>

      <span className={`badge ${inStock ? 'available' : 'unavailable'}`}>
        {inStock ? 'Available Now' : 'Currently Unavailable'}
      </span>
    </article>
  );
}

export default function ProductPage() {
  const products = [
    { name: 'Gaming Laptop', price: 1250000, rating: 4.8, inStock: true },
    { name: 'Bluetooth Speaker', price: 75000, rating: 4.3, inStock: true },
    { name: 'Mechanical Keyboard', price: 95000, rating: 4.6, inStock: false },
    { name: 'Smart Watch', price: 189000, rating: 4.5, inStock: true },
    { name: 'Wireless Charger', price: 42000, rating: 4.1, inStock: false },
    { name: 'Gaming Headset', price: 110000, rating: 4.7, inStock: true },
    { name: 'Tablet', price: 450000, rating: 4.4, inStock: true },
    { name: 'External SSD', price: 135000, rating: 4.9, inStock: false },
    { name: 'Web Camera', price: 58000, rating: 4.2, inStock: true }
  ];

  return (
    <ExerciseLayout
      title="TECH PRODUCT STORE"
      description="Explore our technology collection with product prices, customer ratings, and availability information."
    >
      <section className="catalog-grid" aria-label="Technology products">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            rating={product.rating}
            inStock={product.inStock}
          />
        ))}
      </section>

      <p className="data-note">
        All product information is for demonstration purposes.
        Each card uses the same reusable component with different properties.
      </p>
    </ExerciseLayout>
  );
}
