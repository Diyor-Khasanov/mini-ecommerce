import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";

const Products = () => {
  const MY_API_KEY = "https://695cdeec79f2f34749d62810.mockapi.io/products";
  let navigate = useNavigate();
  let [data, setData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  let [limit, setLimit] = useState(10);
  let [loading, setLoading] = useState(true);
  let [search, setSearch] = useState("");
  let [category, setCategory] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        let products = await axios.get(
          `https://dummyjson.com/products?limit=${limit}`
        );
        setData(products.data.products);
        setFilteredData(products.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [limit]);

  const handleShowMore = () => {
    setLimit(limit + 10);
    setSearch("");
    setCategory("");
  };

  const navigateToDetails = (id) => {
    navigate(`/product/${id}`);
  };

  const handleSearch = () => {
    let result = data.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    if (category) {
      result = result.filter((product) => product.category === category);
    }
    setFilteredData(result);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    let result = data;
    if (value) result = result.filter((p) => p.category === value);
    if (search)
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    setFilteredData(result);
  };

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

  const categories = [...new Set(data.map((p) => p.category))];

  if (loading) return <Loading />;

  return (
    <div className="px-4 py-6 md:px-10 md:py-10 bg-gray-50 min-h-screen">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <form
          className="flex gap-2 w-full md:w-1/2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded-md w-full border-2 border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 md:px-6 py-2 rounded-md font-semibold hover:bg-purple-700 transition-colors"
          >
            Search
          </button>
        </form>

        <select
          className="p-2 rounded-md w-full md:w-1/4 border border-gray-300"
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat[0].toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {filteredData.map((product) => (
          <div
            key={product.id}
            className="bg-stone-100 rounded-lg shadow-lg border border-gray-200 p-4 flex flex-col items-center gap-3 transition-colors"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="font-semibold text-lg text-black text-center">
              {product.title}
            </h2>
            <p className="text-violet-600 font-bold">${product.price}</p>
            <p className="text-gray-500 text-sm text-center">
              Category:{" "}
              {product.category[0].toUpperCase() + product.category.slice(1)}
            </p>

            <button
              onClick={() => navigateToDetails(product.id)}
              className="mt-2 text-purple-600 hover:underline font-semibold"
            >
              Details
            </button>

            <button
              onClick={() => addToCart(product)}
              className="mt-2 w-full bg-purple-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-purple-700 transition-colors"
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>

      {/* Show More */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleShowMore}
          className="bg-purple-600 text-white rounded-md font-semibold text-lg px-6 py-2 hover:bg-purple-700 transition-colors"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Products;
