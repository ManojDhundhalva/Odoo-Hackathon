import React from 'react';
import './History.css';

const History = () => {
  const transactions = [
    {
      userName: 'John Doe',
      email: 'john@example.com',
      contactNumber: '123-456-7890',
      wasteType: 'Electronic',
      price: '$50',
      transactionId: 'TXN12345'
    },
    {
      userName: 'Jane Smith',
      email: 'jane@example.com',
      contactNumber: '987-654-3210',
      wasteType: 'Battery',
      price: '$30',
      transactionId: 'TXN12346'
    },
    // Add more transactions here
  ];

  return (
    <div className="history-container">
      <h2>Transaction History</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Waste Type</th>
            <th>Price</th>
            <th>Transaction ID</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.userName}</td>
              <td>{transaction.email}</td>
              <td>{transaction.contactNumber}</td>
              <td>{transaction.wasteType}</td>
              <td>{transaction.price}</td>
              <td>{transaction.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
