import axios from "axios";

import { NEW_TRAVEL_ENQUIRY, GET_ALL_TRAVEL_ENQUIRY } from "./types";

export const newTravelEnquiry = (payload) => {
  const request = axios
    .post("/api/v1/travel/enquiry/new", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);

  return {
    type: NEW_TRAVEL_ENQUIRY,
    payload: request,
  };
};

export const getAllTravelEnquiries = (startDate = null, endDate = null) => {
  const request = axios
    .post(
      "/api/v1/travel/enquiry",
      { startDate, endDate },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data);

  return {
    type: GET_ALL_TRAVEL_ENQUIRY,
    payload: request,
  };
};
