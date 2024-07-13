import React, { useState } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const { id, title, image, price, rating } = product;

  // Share URL for the product
  const productUrl = window.location.href; // Replace with actual product URL

  // State to track whether to show social share icons
  const [showShareIcons, setShowShareIcons] = useState(false);

  const handleShareClick = () => {
    setShowShareIcons(!showShareIcons);
  };

  return (
    <div className="product-item">
      <div className="product-info">
        <img src={image} alt={title} className="product-image" />
        <div className="product-details">
          <h3>{title}</h3>
          <p>${price}</p>
          <p>Rating: {rating.rate} ({rating.count} reviews)</p>
          <Link to={`/product/${id}`} className="view-details-link">View Details</Link>
        </div>
      </div>

      {/* Share button */}
      <div className="share-button">
        <span onClick={handleShareClick}>Share</span>
      </div>

      {/* Conditional rendering of social share icons */}
      {showShareIcons && (
        <div className="social-share">
          <FacebookShareButton url={productUrl} quote={`Check out this product: ${title}`}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={productUrl} title={`Check out this product: ${title}`}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton url={productUrl} title={`Check out this product: ${title}`}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          {/* Custom Google Chrome share button */}
          <a href={`https://www.google.com/intl/en/chrome/browser/`} target="_blank" rel="noopener noreferrer">
            <img src="/path_to_your_google_chrome_icon.png" alt="Google Chrome" width={32} className="social-icon" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
