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
      let products = await axios.get(
        `https://dummyjson.com/products?limit=${limit}`
      );
      try {
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

    if (value) {
      result = result.filter((p) => p.category === value);
    }

    if (search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <Header />

      {/* SEARCH & FILTER */}
      <header className="flex items-center justify-around mt-4 w-full">
        <form
          className="flex items-center gap-2 w-1/2"
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
            className="p-2 rounded pr-24 border-2 border-violet-600 focus:outline-violet-200 focus:outline-2"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded font-semibold"
          >
            Search
          </button>
        </form>

        <select
          className="p-2 rounded"
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
      </header>

      {/* PRODUCTS */}
      <div className="grid grid-cols-5 gap-4 px-24 py-6">
        {filteredData.map((product) => (
          <div
            className="col-span-1 shadow-lg rounded-lg p-4 shadow-violet-200 border border-violet-400"
            key={product.id}
          >
            <img src={product.images[0]} alt={product.title} />
            <strong>${product.price}</strong>
            <p>{product.title}</p>
            <p className="p-2 font-semibold text-xl">
              Category:{" "}
              {product.category[0].toUpperCase() + product.category.slice(1)}
            </p>

            <button
              onClick={() => navigateToDetails(product.id)}
              className="mt-4 hover:underline text-purple-600 font-semibold mx-auto block"
            >
              Details
            </button>

            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded font-semibold w-full"
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>

      <button
        className="mt-4 bg-purple-600 text-white rounded font-semibold text-xl px-8 py-3 my-3"
        onClick={handleShowMore}
      >
        Show More
      </button>
    </div>
  );
};

export default Products;
