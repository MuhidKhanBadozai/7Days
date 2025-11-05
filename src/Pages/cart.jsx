import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://putratraders.com/api"; // ✅ your backend API base

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const user_id = localStorage.getItem("user_id");

  // ✅ Fetch cart items
  const fetchCart = async () => {
    if (!user_id) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/fetch_cart.php?user_id=${user_id}`);
      const data = await res.json();

      if (Array.isArray(data)) setCartItems(data);
      else setCartItems([]);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setMessage("❌ Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Update quantity
  const handleQuantityChange = async (cart_id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await fetch(`${API_BASE}/update_cart.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart_id, quantity: newQuantity }),
      });

      const data = await res.json();
      if (data.success) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === cart_id ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        setMessage("❌ Failed to update quantity.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error while updating.");
    }
  };

  // ✅ Remove from cart
  const handleRemove = async (cart_id) => {
    if (!window.confirm("Remove this item from your cart?")) return;

    try {
      const res = await fetch(`${API_BASE}/remove_from_cart.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart_id }),
      });

      const data = await res.json();
      if (data.success) {
        setCartItems((prev) => prev.filter((item) => item.id !== cart_id));
        setMessage("🗑️ Item removed successfully.");
      } else {
        setMessage("❌ Failed to remove item.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error while removing item.");
    }

    setTimeout(() => setMessage(null), 3000);
  };

  // ✅ Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="w-[1000px] mx-auto my-20 p-10 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {message && (
        <div
          className={`text-center p-3 mb-4 rounded ${
            message.startsWith("❌")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-center py-10 text-gray-500">Loading cart...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center py-10 text-gray-500">
          Your cart is empty.{" "}
          <button
            onClick={() => navigate("/catalogue")}
            className="text-blue-600 underline"
          >
            Shop now
          </button>
        </p>
      ) : (
        <>
          <div className="grid grid-cols-12 font-semibold border-b py-3 text-gray-700">
            <div className="col-span-4">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-center">Subtotal</div>
            <div className="col-span-2 text-center">Action</div>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 items-center border-b py-3 hover:bg-gray-50"
            >
              <div
                className="col-span-4 flex items-center gap-3 cursor-pointer"
                onClick={() => navigate(`/product/${item.sku}`)}
              >
                <img
                  src={
                    item.image_url?.startsWith("http")
                      ? item.image_url
                      : `${API_BASE.replace("/api", "")}/${item.image_url}`
                  }
                  alt={item.name}
                  className="w-16 h-16 object-contain rounded"
                />
                <span className="text-gray-800 font-medium">{item.name}</span>
              </div>

              <div className="col-span-2 text-center">${item.price}</div>

              <div className="col-span-2 text-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="w-16 border text-center rounded-md p-1"
                />
              </div>

              <div className="col-span-2 text-center font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <div className="col-span-2 text-center">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* ✅ Cart Summary */}
          <div className="text-right mt-6">
            <h2 className="text-xl font-semibold">
              Total: <span className="text-orange-600">${calculateTotal()}</span>
            </h2>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 bg-[#0B2347] text-white px-6 py-2 rounded hover:bg-[#143d7a] transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
