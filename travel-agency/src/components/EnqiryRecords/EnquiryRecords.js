import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllTravelEnquiries } from "../../redux/actions/enquiry";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const EnquiryTable = () => {
  const dispatch = useDispatch();
  const data =
    useSelector((state) => state.travelEnquiry.allTravelEnquiry) ?? [];

  useEffect(() => {
    dispatch(getAllTravelEnquiries());
  }, []);

  function handleSearch() {
    dispatch(
      getAllTravelEnquiries(
        startDate ? moment(startDate, "DD/MM/YYYY").format("DD/MM/YYYY") : null,
        endDate ? moment(endDate, "DD/MM/YYYY").format("DD/MM/YYYY") : null
      )
    );
  }

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (date, name) => {
    if (name == "startDate") {
      setStartDate(date);
    } else if (name == "endDate") {
      setEndDate(date);
    }
  };

  return (
    <>
      <section className="pb-3 text-center" style={{ marginTop: "4rem" }}>
        <div className="container" style={{ marginTop: "10%" }}>
          <div className="container d-flex">
            <div className="col-xl-4 col-md-3 d-flex">
              <h6>Start Date:</h6>
              <DatePicker
                selected={startDate}
                onChange={(e) => handleDateChange(e, "startDate")}
                dateFormat="dd/MM/yyyy" // You can customize the date format
                className="form-control" // Add the Bootstrap form-control class
              />
            </div>

            <div className="col-4 d-flex">
              <h6>End Date:</h6>
              <DatePicker
                selected={endDate}
                onChange={(e) => handleDateChange(e, "endDate")}
                dateFormat="dd/MM/yyyy" // You can customize the date format
                className="form-control" // Add the Bootstrap form-control class
              />
            </div>
            <div
              className="col-4 btn btn-primary btn-md ml-0 mt-0 mdb-color darken-2"
              role="button"
              tabIndex={0}
              onClick={() => handleSearch()}
            >
              Search
              <i class="fa fa-filter ml-2" />
            </div>
          </div>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Destination</th>
              <th>Interests</th>
              <th>No. of Travelers</th>
              <th>Budget Per Person</th>
              <th>Special Notes</th>
              <th>Travel Month</th>
              <th>Trip Duration</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td>{enquiry.id}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.fullName}</td>
                  <td>{enquiry.phone}</td>
                  <td>{enquiry.destination.join(", ")}</td>
                  <td>{enquiry.interests.join(", ")}</td>
                  <td>{enquiry.noOfTravelers}</td>
                  <td>{enquiry.budgetPerPerson}</td>
                  <td>{enquiry.specialNotes}</td>
                  <td>{enquiry.travelMonth}</td>
                  <td>{enquiry.tripDuration}</td>
                  <td>{new Date(enquiry.createdAt).toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default EnquiryTable;
