"use client";

import Product from "./product";


const products = [
  { id: 1, name: 'Smartphone', price: 699 },
  { id: 2, name: 'Laptop', price: 999 },
  { id: 3, name: 'Headphones', price: 199 },
];

export default function ProductList({ searchQuery }) {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p className="text-white">No products found.</p>
        )}
      </div>
    );
  }