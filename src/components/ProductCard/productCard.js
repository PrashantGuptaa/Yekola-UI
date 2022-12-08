import React, { useState } from "react";
import "./product.css";
import spanishImg from "../../assets/images/products/Spanish.png";
import hindiImg from "../../assets/images/products/Hindi.png";
import englishImg from "../../assets/images/products/English.png";
import defaultImg from "../../assets/images/logo2.png";

const ProductCard = ({ id, product }) => {
  const getProductImage = (productName) => {
    console.log("Image F-3", productName)
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
      <p>
        {product}
      </p>
    </div>
  );
};

export default ProductCard;
