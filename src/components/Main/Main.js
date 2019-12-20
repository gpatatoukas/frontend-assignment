import React, { Component } from "react";

import Map from "../Map/Map";
import axios from "axios";
import { vessels, formatData } from "../../utilities";

import Classes from "./Main.module.scss";

class Main extends Component {
  state = { vesselData: null };

  componentDidMount() {
    this.initVesselData();
  }

  initVesselData = () => {
    // get vessel data
    const requests = Object.keys(vessels).map(vessel =>
      axios.get(
        `https://services.marinetraffic.com/api/exportvesseltrack/cf8f05df0b57bfae43e762cc61fd381239c4c042/v:2/period:daily/days:10/mmsi:${vessel}/protocol:jsono`
      )
    );
    // when all requests complete
    Promise.all(requests).then(responses => {
      const formatted = responses.map(response => formatData(response.data));
      this.setState({ vesselData: formatted });
    });
  };

  render() {
    if (this.state.vesselData === null) return null;
    return (
      <div className={Classes.main}>
        <Map vesselData={this.state.vesselData} />
      </div>
    );
  }
}

export default Main;
