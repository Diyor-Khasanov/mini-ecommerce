import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      let productData = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(productData.data);
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="flex items-center justify-evenly">
      <img src={product.thumbnail} alt={product.title} />
      <div className="max-w-150 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <p>Price: ${product.price}</p>
        <p>Brand: {product.brand || 'No Brand available'}</p>
        <p>Category: {product.category}</p>
        <p>Description: {product.description}</p>
      </div>
    </div>
  );
};

export default Details;