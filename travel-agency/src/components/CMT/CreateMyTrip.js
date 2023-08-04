import React, { useEffect, useState } from "react";
import PersonalInfo from "./PersonalInfo";
import { countries, interests, months, travellers, budget } from "./constants";
import successImg from "../../assets/check-circle-success.svg";

const CreateMyTrip = ({ options }) => {
  const [formData, setFormData] = useState({
    destination: [],
    travelMonth: "",
    interests: [],
    noOfTravelers: 0,
    budgetPerPerson: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (typeof formData[name] === "object") {
      // Check if the option is already selected
      const isOptionSelected = formData[name].includes(value);
      let updatedArr;
      if (isOptionSelected) {
        // If the option is already selected, remove it from the array
        updatedArr = formData[name].filter((option) => option !== value);
      } else {
        // If the option is not selected, add it to the array
        updatedArr = [...formData[name], value];
      }
      setFormData({ ...formData, [name]: updatedArr });
    } else {
      // If it's not an array (number or string), update the value directly
      setFormData({ ...formData, [name]: value });
    }
  };

  const [show, setShow] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    // Mark the form as submitted
    setFormSubmitted(true);

    // Check if any of the fields are empty and prevent form submission
    if (
      formData.destination.length === 0 ||
      formData.travelMonth === "" ||
      formData.interests.length === 0 ||
      formData.noOfTravelers === 0 ||
      formData.budgetPerPerson === 0
    ) {
      return;
    }
    handleShow();
  };

  return (
    <div>
      <section className="pb-3 text-center" style={{ marginTop: "2rem" }}>
        <PersonalInfo
          show={show}
          formData={formData}
          handleClose={handleClose}
          handleShow={handleShow}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-0 mb-3 ">
              <select
                className="h-100 form-select"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
              >
                <option value="">Destination ?</option>
                {countries.map((option) => (
                  <option key={option.value} value={option.value}>
                    {formData.destination.includes(option.value) ? (
                      <>&#10003; {option.label}</>
                    ) : (
                      option.label
                    )}
                  </option>
                ))}
              </select>

              {formData.destination.length > 1 && (
                <div className="ml-2">(Multiple Destinations)</div>
              )}
            </div>

            <div className="col-md-0 mb-3">
              <select
                className="h-100 form-select"
                name="travelMonth"
                value={formData.travelMonth}
                onChange={handleChange}
              >
                <option value="">Travel Month ?</option>
                {months.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-0 mb-3">
              <select
                className="h-100 form-select"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
              >
                <option value="">Your Interests ?</option>
                {interests.map((option) => (
                  <option key={option.value} value={option.value}>
                    {formData.interests.includes(option.value) ? (
                      <>&#10003; {option.label}</>
                    ) : (
                      option.label
                    )}
                  </option>
                ))}
              </select>

              {formData.interests.length > 1 && (
                <div className="ml-2">(Multiple Interests)</div>
              )}
            </div>

            <div className="col-md-0 mb-3">
              <select
                className="h-100 form-select"
                name="noOfTravelers"
                value={formData.noOfTravelers}
                onChange={handleChange}
              >
                <option value="">No. of travelers ?</option>
                {travellers.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <select
                className="h-100 form-select"
                name="budgetPerPerson"
                value={formData.budgetPerPerson}
                onChange={handleChange}
              >
                <option value="">Budget Per Person ?</option>
                {budget.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <div
                className="h-100 btn btn-primary btn-md ml-0 mt-0 mdb-color darken-2 h-1000 w-1000"
                role="button"
                tabIndex={0}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Create My Trip
                <i class="fa fa-paper-plane-o ml-2" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Show the asterisk above each field if it's required and not filled */}
      {formSubmitted &&
        (formData.destination.length === 0 ||
          formData.travelMonth === "" ||
          formData.interests.length === 0 ||
          formData.noOfTravelers === 0 ||
          formData.budgetPerPerson === 0) && (
          <div className="text-danger">* All fields are required</div>
        )}
    </div>
  );
};

export default CreateMyTrip;
