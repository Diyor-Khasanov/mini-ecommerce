import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { X } from "lucide-react";
import Loading from "../components/Loading";

const MY_API_KEY = "https://695cdeec79f2f34749d62810.mockapi.io/products";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCart = async () => {
    try {
      const res = await axios.get(MY_API_KEY);
      setCart(res.data.map((item) => ({ ...item, qty: item.qty || 1 })));
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
      setCart((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.qty,
    0
  );

  useEffect(() => {
    getCart();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <h1 className="text-2xl font-bold mb-8">Cart</h1>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty 🛒</p>
          ) : (
            <>
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-[100px_1fr_120px_100px_40px] items-center gap-4"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-xl bg-slate-100"
                    />

                    <div>
                      <h2 className="font-semibold">{item.title}</h2>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <p className="text-sm mt-1">${item.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQty(item.id, Math.max(1, item.qty - 1))
                        }
                        className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-slate-100"
                      >
                        −
                      </button>

                      <span className="w-8 text-center font-medium">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-medium text-right">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>

                    <button
                      onClick={() => deleteFromCart(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xl flex items-center justify-center py-2 rounded"
                    >
                      <X />
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t mt-8 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-violet-500 font-semibold">
                    ${Math.floor((subtotal / 100) * 10)}
                  </span>
                </div>

                <div className="flex justify-between text-xl font-bold pt-4">
                  <span>Total</span>
                  <span className="text-violet-600">
                    ${(subtotal + Math.floor((subtotal / 100) * 10)).toFixed(2)}
                  </span>
                </div>

                <div className="pt-6 text-right">
                  <button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl font-medium">
                    Check out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
