import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

const MY_API_KEY = "https://695cdeec79f2f34749d62810.mockapi.io/products";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCart = async () => {
    try {
      const res = await axios.get(MY_API_KEY);
      setCart(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFromCart = async (id) => {
    if (!window.confirm("Remove this product from cart?")) return;

    try {
      await axios.delete(`${MY_API_KEY}/${id}`);
      setCart(cart.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        Loading cart...
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 mt-6">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty 🛒</p>
        ) : (
          <div className="grid gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center gap-6 p-4 border rounded-xl shadow-sm"
              >
                {/* Image */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.brand}</p>
                  <p className="mt-2 font-medium">${item.price}</p>
                </div>

                {/* Actions */}
                <button
                  onClick={() => deleteFromCart(item.id)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      F
    </div>
  );
}
