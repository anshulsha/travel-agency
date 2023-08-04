import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerExample = ({
  label,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  name,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    if (name == "startDate") {
      setStartDate(date);
    } les
    setSelectedDate(date);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-0">
          <h3>{label}</h3>
        </div>
        <div className="col-md-3">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy" // You can customize the date format
            className="form-control" // Add the Bootstrap form-control class
          />
        </div>
      </div>
    </div>
  );
};

export default DatePickerExample;
