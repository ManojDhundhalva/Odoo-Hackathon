import React, { useState } from 'react';
import '../CSS/CollectorDashboard.css';

const initialTasks = [
  {
    username: 'User1',
    disposerName: 'Disposer1',
    timeSlot: '09:00 AM - 10:00 AM',
    wasteType: 'Electronics',
    status: 'Pending',
    contactNumber: '123-456-7890',
    address: '123 Main St, City, Country'
  },
  {
    username: 'User2',
    disposerName: 'Disposer2',
    timeSlot: '10:00 AM - 11:00 AM',
    wasteType: 'Batteries',
    status: 'Completed',
    contactNumber: '987-654-3210',
    address: '456 Elm St, City, Country'
  },
  // Add up to 4 tasks
];

const CollectorDashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleStatusClick = (index) => {
    const task = tasks[index];
    if (task.status === 'Pending') {
      const confirmChange = window.confirm('Are you sure you want to change the status to completed?');
      if (confirmChange) {
        const updatedTasks = tasks.map((t, i) => (
          i === index ? { ...t, status: 'Completed' } : t
        ));
        setTasks(updatedTasks);
      }
    }
  };

  return (
    <div className="collector-dashboard">
      <h1 className="dashboard-heading"><b>Collector Dashboard</b></h1>
      <div className="tasks-container">
        {tasks.map((task, index) => (
          <div className="task-card" key={index}>
            <div className="left-aligned">
              <p><b>Username:</b> {task.username}</p>
              <p><b>Time Slot:</b> {task.timeSlot}</p>
              <p>
                <b>Status:</b>
                <span 
                  className="status-update" 
                  onClick={() => handleStatusClick(index)}
                >
                  {task.status}
                </span>
              </p>
            </div>
            <div className="right-aligned">
              <p><b>Disposer Name:</b> {task.disposerName}</p>
              <p><b>Waste Type:</b> {task.wasteType}</p>
              <p><b>Contact Number:</b> {task.contactNumber}</p>
              <p><b>Address:</b> {task.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectorDashboard;
