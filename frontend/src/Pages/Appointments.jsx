import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Appointments.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobal } from "../Context/globalData";
import { toast } from "react-hot-toast";

const Appointments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [userName, setUserName] = useState("");
  const [type, setType] = useState("");
  const { users } = useGlobal();

  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState([]);

  const sampleSlots = {
    "2024-07-01": [
      { time: "09:00 AM", available: true },
      { time: "10:00 AM", available: false },
      { time: "11:00 AM", available: true },
      { time: "12:00 PM", available: true },
      { time: "01:00 PM", available: true },
    ],
    "2024-07-02": [
      { time: "01:00 PM", available: true },
      { time: "02:00 PM", available: false },
      { time: "03:00 PM", available: true },
    ],
    // Add more sample slots here
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    const formattedDate = formatDate(selectedDate);
    setSlots(sampleSlots[formattedDate] || []);
  };

  const tileDisabled = ({ date, view }) => {
    return view === "month" && date < new Date();
  };

  // Filter out booked slots
  const availableSlots = slots.filter((slot) => slot.available);

  let ok = false;
  const verifyAppointment = () => {
    if (ok) {
      return;
    }
    ok = true;
    if (!queryParams.has("username") || !queryParams.has("type")) {
      toast("Please, select username and type!", {
        icon: "👏",
      });
      navigate("/");
      return;
    }

    const tempUserName = queryParams.get("username");
    const tempType = queryParams.get("type");

    if (tempUserName === null || tempType === null) {
      toast("Please, select username and type!", {
        icon: "👏",
      });
      navigate("/");
      return;
    }

    const isTypePresent = users.some((user) => user.type === tempType);
    if (!isTypePresent) {
      toast("Please, select username and type!", {
        icon: "👏",
      });
      navigate("/");
      return;
    }

    setUserName(tempUserName);
    setType(tempType);
  };

  useEffect(() => {
    verifyAppointment();
  }, []);

  return (
    <div className="appointments-container">
      <h1>
        <b>Appointments</b>
      </h1>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileDisabled={tileDisabled}
      />
      <div className="slots-container">
        {availableSlots.length > 0 && (
          <>
            <h2 className="available-slots-heading">Available Slots</h2>
            <div className="buttons-container">
              {availableSlots.map((slot, index) => (
                <button key={index}>{slot.time}</button>
              ))}
            </div>
          </>
        )}
        {availableSlots.length === 0 && <p>No available slots</p>}
      </div>
    </div>
  );
};

export default Appointments;
