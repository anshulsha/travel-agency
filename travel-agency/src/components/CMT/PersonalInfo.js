import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { newTravelEnquiry } from "../../redux/actions/enquiry";

const Example = ({ show, handleClose, formData }) => {
  const dispatch = useDispatch();
  const [personalData, setPersonalData] = useState({
    fullName: "",
    email: "",
    phone: "",
    tripDuration: 0,
    specialNotes: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonalData({ ...personalData, [name]: value });

    // Clear the validation error messages when the user starts typing again
    if (name === "phone") {
      setPhoneError(false);
    } else if (name === "tripDuration") {
      setDurationError(false);
    } else if (name === "email") {
      setEmailError(false);
    }
  };
  const handleSubmit = () => {
    // Check phone and tripDuration validity before form submission
    const phoneIsValid = /^\d{10}$/.test(personalData.phone);
    const durationIsValid = /^\d+$/.test(personalData.tripDuration);
    const emailIsValid = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    let data = { ...personalData, ...formData };

    data = {
      ...data,
      tripDuration: parseInt(data.tripDuration),
      noOfTravelers: parseInt(data.noOfTravelers),
      budgetPerPerson: parseInt(data.budgetPerPerson),
    };

    // Mark the form as submitted
    setFormSubmitted(true);
    if (!emailIsValid(personalData.email)) {
      setEmailError(true);
      return;
    }

    if (!phoneIsValid) {
      setPhoneError(true);
      return;
    }

    if (!durationIsValid) {
      setDurationError(true);
      return;
    }

    // Check if any of the fields are empty and prevent form submission
    if (
      data.fullName === "" ||
      data.email === "" ||
      data.phone.length !== 10 ||
      data.tripDuration === 0
    ) {
      return;
    }

    dispatch(newTravelEnquiry(data));
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            We need a bit more info to create your itinerary:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="fullName"
                placeholder="Anshul Sharma"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                name="email"
                placeholder="name@example.com"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone No.</Form.Label>
              <Form.Control
                name="phone"
                placeholder="##########"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Trip Duration (Days)</Form.Label>
              <Form.Control
                name="tripDuration"
                placeholder="Ex: 10 (days)"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Special Notes</Form.Label>
              <Form.Control
                name="specialNotes"
                as="textarea"
                rows={3}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-red" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="mdb-color darken-2"
            onClick={() => {
              handleSubmit();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
        {/* Show the asterisk above each field if it's required and not filled */}
        {/* Show error messages */}
        {formSubmitted && emailError && (
          <div className="text-danger ml-2">
            * Email should be a valid email
          </div>
        )}
        {formSubmitted && phoneError && (
          <div className="text-danger ml-2">
            * Phone should be a 10-digit number
          </div>
        )}
        {formSubmitted && durationError && (
          <div className="text-danger ml-2">
            * Trip Duration should be a number
          </div>
        )}
        {formSubmitted &&
          (personalData.fullName === "" ||
            personalData.email === "" ||
            personalData.phone.length !== 10 ||
            personalData.tripDuration === 0) && (
            // <div className="text-danger">* All fields are required</div>
            <div className="text-danger ml-2">* All fields are required</div>
          )}
      </Modal>
      {/* </div> */}
    </>
  );
};

export default Example;
