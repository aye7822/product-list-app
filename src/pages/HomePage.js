import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductItem from '../components/ProductItem';
import { useSpring, animated } from 'react-spring'; // Import React Spring
import '../App.css';

const HomePage = () => {
  const { products, loading, error } = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // Fade-in animation for product list
  const productListAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  // Fade-in animation for pagination
  const paginationAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 200,
    config: { duration: 500 },
  });

  useEffect(() => {
    let filtered = products;

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder) {
      filtered = filtered.sort((a, b) => 
        sortOrder === 'lowToHigh' ? a.price - b.price : b.price - a.price
      );
    }

    setFilteredProducts(filtered);
  }, [products, category, searchTerm, sortOrder]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div className="home-page">
      <h1>Product List App</h1>
      <div className="search">
        <input type="text" placeholder="Search products..." onChange={e => setSearchTerm(e.target.value)} />
      </div>
      <div className="filters">
        <select onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select onChange={e => setSortOrder(e.target.value)}>
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {/* Animated product list */}
      <animated.div style={productListAnimation} className="product-list">
        {paginatedProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </animated.div>
      
      {/* Animated pagination */}
      <animated.div style={paginationAnimation} className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {Math.ceil(filteredProducts.length / itemsPerPage)}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}>Next</button>
      </animated.div>
    </div>
  );
};

export default HomePage;
