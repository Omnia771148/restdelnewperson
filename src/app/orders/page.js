'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const rest = typeof window !== "undefined" ? localStorage.getItem("restlocation") : null;


  useEffect(() => {
    const restaurantId = localStorage.getItem("restid");

    if (!restaurantId) {
      alert("No Restaurant ID found in localStorage");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders?restaurantId=${restaurantId}`);
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          alert("Failed to load orders");
        }
      } catch (err) {
        console.error("Fetch orders error:", err);
        alert("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  async function acceptOrder(orderId) {
    try {
      const res = await axios.post("/api/orders/accept", { orderId,rest });
      if (res.data.success) {
        alert("✅ Order accepted!");
        setOrders(orders.filter(order => order._id !== orderId));
      } else {
        alert("❌ " + res.data.message);
      }
    } catch (err) {
      console.error("❌ Accept order error:", err);
      alert("Something went wrong while accepting the order.");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>🧾 Orders for Your Restaurant</h2>
      
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {orders.map((order, index) => (
            <li 
              key={index}
              style={{
                marginBottom: '12px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <p><strong>Item(s):</strong></p>
              {Array.isArray(order.items) && order.items.length > 0 ? (
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} — ₹{item.price} × {item.quantity}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items found in this order.</p>
              )}
              
              <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
              <p><strong>User ID:</strong> {order.userId}</p>
              {order.orderDate && (
                <p><strong>Ordered On:</strong> {new Date(order.orderDate).toLocaleString()}</p>
              )}

              <button
                onClick={() => acceptOrder(order._id)}
                style={{
                  marginTop: "8px",
                  padding: "6px 12px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Accept
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
