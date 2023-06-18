import React from "react";
import "./product.css";
import defaultImg from "../../assets/images/logo2.png";

const ProductCard = ({ id, product, description }) => {
  const getProductImage = (productName) => {
    switch (productName) {
    //   case "Spanish":
    //     return spanishImg;
    //   case "Hindi":
    //     return hindiImg;
    //   case "English":
    //     return englishImg;
      default:
        return defaultImg;
    }
  };
  return (
    <div className="product-container">
      <div className="product-image-container">
        <img src={getProductImage(product)} alt={product} className='product-image'/>
      </div>
      <div className="product-details-section">
        <div className="product-name">
        {product}
        </div>
        <div className="product-description">
        {description}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
