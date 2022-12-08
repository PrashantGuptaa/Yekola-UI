import React, { useState, useEffect } from "react";
import { FETCH_ALL_PRODUCTS_ENDPOINT } from "../../configs/apiEndpoints";
import HttpServices from "./../../configs/https.service";
import { Spin } from "antd";
import ProductCard from "./../../components/ProductCard/";
import "./home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const result = await HttpServices.getRequest(FETCH_ALL_PRODUCTS_ENDPOINT);
      setProducts(result.data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {!products.length ? (
        <div className="complete-center">
          <Spin tip="Loading..." size="large" />
        </div>
      ) : (
        <div className="home">
          {products.map((productObj) => {
            const { id, product } = productObj;
            return <ProductCard key={id} id={id} product={product} />;
          })}
        </div>
      )}
    </>
  );
};

export default Home;
