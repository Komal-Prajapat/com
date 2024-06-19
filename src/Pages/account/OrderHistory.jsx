import React from 'react';

const OrderHistory = () => {
  // Sample order data (replace this with real data from your backend)
  const orders = [
    { id: 1, date: '2023-07-24', total: 50.0 },
    { id: 2, date: '2023-07-20', total: 75.0 },
    // Add more order entries as needed
  ];

  return (
    <div className='order-history'>
      <h3>Order History</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order ID: {order.id} | Date: {order.date} | Total: ${order.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;