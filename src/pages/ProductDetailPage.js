import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import '../App.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-detail-page">
      <img src={product.image} alt={product.title} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
    </div>
  );
};

export default ProductDetailPage;
