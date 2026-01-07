import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import useTheme from "../context/useTheme";

const Details = () => {
  const MY_API_KEY = "https://695cdeec79f2f34749d62810.mockapi.io/products";
  
  const {theme} = useTheme();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(productData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async (product) => {
    try {
      const res = await axios.get(MY_API_KEY);
      const existingItem = res.data.find(
        (item) => item.title === product.title
      );

      if (existingItem) {
        await axios.put(`${MY_API_KEY}/${existingItem.id}`, {
          ...existingItem,
          qty: existingItem.qty + 1,
        });
        alert("Product quantity increased in cart ✅");
      } else {
        await axios.post(MY_API_KEY, {
          title: product.title,
          price: product.price,
          description: product.description,
          brand: product.brand,
          category: product.category,
          thumbnail: product.images[0],
          qty: 1,
        });
        alert("Product added to cart 🛒");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-12xl mx-auto my-auto px-4 py-10">
        <div className={`flex flex-col md:flex-row items-center md:items-start gap-8 ${theme === "dark" ? "bg-slate-800 text-white" : "bg-white text-slate-800"}`}>
          {/* Product Image */}
          <div className="flex-1 w-full md:w-auto flex justify-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full max-w-md rounded-xl shadow-lg object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col gap-4 w-full">
            <h1 className="text-3xl md:text-4xl font-bold">
              {product.title}
            </h1>
            <p className="text-xl font-semibold text-violet-600">
              ${product.price}
            </p>
            <p>
              Brand: {product.brand || "No Brand available"}
            </p>
            <p>Category: {product.category}</p>
            <p>{product.description}</p>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product)}
              className="mt-6 w-full md:w-auto bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-md"
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
