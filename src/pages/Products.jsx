import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  let navigate = useNavigate();
  let [data, setData] = useState([]);
  let [limit, setLimit] = useState(10);

  useEffect(() => {
    async function fetchData() {
      let products = await axios.get(
        `https://dummyjson.com/products?limit=${limit}`
      );
      setData(products.data.products);
    }

    fetchData();
  }, [limit]);

  const handleShowMore = () => {
    setLimit(limit + 10);
  };

  const navigateToDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <header className="flex items-center justify-around mt-4 w-full">
        <form className="flex items-center gap-2 w-1/2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded pr-24 border-2 border-violet-600 focus:outline-violet-200 focus:outline-2"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded font-semibold"
          >
            Search
          </button>
        </form>

        <select className="p-2 rounded">
          <option value="">Select Category</option>
        </select>
      </header>
      <div className="grid grid-cols-5 gap-4 px-24 py-6">
        {data.map((product) => {
          return (
            <div className="col-span-1" key={product.id}>
              <img src={product.images[0]} alt={product.title} />
              <div className="flex items-center gap-2">
                <strong>${product.price}</strong>
              </div>
              <p>{product.title}</p>
              <p className="p-2 font-semibold text-xl">
                Category:{" "}
                {product.category[0].toUpperCase() + product.category.slice(1)}
              </p>
              <button
                onClick={() => navigateToDetails(product.id)}
                className="mt-4 bg-purple-600 text-white px-6 py-2 rounded font-semibold w-full"
              >
                Details
              </button>
            </div>
          );
        })}
      </div>
      <button
        className="mt-4 bg-purple-600 text-white rounded font-semibold text-xl px-8 cursor-pointer py-3 my-3"
        onClick={handleShowMore}
      >
        Show More
      </button>
    </div>
  );
};

export default Products;
