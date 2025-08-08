'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
          setOrders(response.data.orders); // Expecting a flat list of items
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
              <p><strong>Item:</strong> {order.name}</p>
              <p><strong>Price:</strong> ₹{order.price}</p>
              <p><strong>Quantity:</strong> {order.total}</p>
              <p><strong>User ID:</strong> {order.userId}</p>
              {order.orderDate && (
                <p><strong>Ordered On:</strong> {new Date(order.orderDate).toLocaleString()}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
