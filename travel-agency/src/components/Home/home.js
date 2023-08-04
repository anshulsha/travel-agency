import React, { useState } from "react";

import CreateMyTrip from "../CMT/CreateMyTrip";
import IndividualIntervalsExample from "../CMT/Carousels";

const Home = () => {
  return (
    <div>
      <div className="container-fluid" style={{ padding: "0", margin: "0" }}>
        <section className="text-center" >
          <IndividualIntervalsExample />
          <CreateMyTrip />
        </section>
      </div>
    </div>
  );
};

export default Home;
