import React, { useState, useEffect } from "react";
import { FETCH_ALL_PRODUCTS_ENDPOINT } from "../../configs/apiEndpoints";
import HttpServices from "./../../configs/https.service";
import { Spin, Card } from "antd";
import ProductCard from "./../../components/ProductCard/";
import "./home.css";
import defaultImg from "../../assets/images/logo2.png";
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;
const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
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

  const handleProductSelection = (product) => {
    navigate(`/home/room-list/Yekola`)
  }
  return (
    <>
      {!products.length ? (
        <div className="complete-center">
          <Spin tip="Loading..." size="large" />
        </div>
      ) : (
        <div className="home">
          {products.map((productObj) => {
            const { id, product, description } = productObj;
            return (
              <Card
                onClick={() => handleProductSelection(product)}
                key={id}
                hoverable
                style={{
                  width: 240,
                  height: 350,
                }}
                cover={<img alt="example" src={defaultImg} />}
              >
                <Meta title={product} description={description} />
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Home;
