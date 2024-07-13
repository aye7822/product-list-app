import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductItem from './ProductItem';

const ProductList = () => {
  const { products, loading, error } = useContext(ProductContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;