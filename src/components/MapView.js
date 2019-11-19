import React, { Component } from "react";
import MarkersList from "./MarkersList";
import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { DriftMarker } from "leaflet-drift-marker";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { delay } from "q";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

class MapView extends Component {
  state = {
    lat: 37,
    lng: 23,
    zoom: 8,
    markers: [],
    position: [37, 23],
    markerSpeed: 300,
    waypointIndex: 0,
    moveMarker: false
  };

  componentDidMount() {
    /* Use the api to populate our data */
    fetch(
      "https://services.marinetraffic.com/api/exportvesseltrack/v:2/cf8f05df0b57bfae43e762cc61fd381239c4c042/days:1/mmsi:229767000/protocol:jsono"
    )
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error receiving data");
      })
      .then(data => this.setState({ markers: data }))
      .catch(error => {
        console.log(error);
        this.setState({ markers: [] });
      });
  }
  /* create an array of coordinates for our ships route */
  waypointList = function() {
    return this.state.markers.map(o => [o.LAT, o.LON]);
  };
  async moveMapMarker(waypointArray) {
    for (let index = 0; index < waypointArray.length; index++) {
      /* if movemarker is falsy eg we press the stop ship button our ship stops */
      if (this.state.moveMarker === false) {
        break;
      }
      const element = waypointArray[index];
      await this.setNextWaypoint(element, index);
    }
  }

  async startMovingMarker() {
    const waypointList = this.waypointList();
    let lastindex = this.state.waypointIndex;
    /* If the ship has completed its route start at the begining */
    if (lastindex >= waypointList.length) {
      lastindex = 0;
      this.setState({ waypointIndex: 0 });
    }
    const position =
      lastindex === 0 ? waypointList[0] : waypointList[lastindex];
    const waypointArray = waypointList.filter((o, i) => i >= lastindex);
    await this.setState({ position: position, moveMarker: true });
    this.moveMapMarker(waypointArray);
  }

  async setNextWaypoint(latlon) {
    /* set waypointIndex to ++ in order to keep track of the vessel, 
    alse delay the loop to much the speed of the vessel in order to 
    have a relatively smooth animation */
    this.setState(prevState => ({
      position: latlon,
      waypointIndex: prevState.waypointIndex + 1
    }));
    await delay(this.markerSpeed);
  }

  setMarkerSpeed(speed) {
    this.setState({ markerSpeed: speed });
  }
  stopShip() {
    this.setState({ moveMarker: false });
  }

  render() {
    const position =
      this.state.markers.length > 0
        ? [
            this.state.markers[this.state.markers.length - 1].LAT,
            this.state.markers[this.state.markers.length - 1].LON
          ]
        : [37, 23];
    return (
      <div>
        <div className="map-buttons">
          <button
            className="btn btn-primary"
            onClick={() => this.startMovingMarker()}
            disabled={this.state.moveMarker}
          >
            Start Ship course
          </button>
          <button
            className="btn btn-primary ml-10"
            onClick={() => this.stopShip()}
            disabled={!this.state.moveMarker}
          >
            Stop ship
          </button>
          <button
            className="btn btn-primary ml-10"
            onClick={() => this.setMarkerSpeed(100)}
            disabled={this.state.markerSpeed === 100}
          >
            Set speed fast
          </button>
          <button
            className="btn btn-primary ml-10"
            onClick={() => this.setMarkerSpeed(300)}
            disabled={this.state.markerSpeed === 300}
          >
            Set speed medium
          </button>
          <button
            className="btn btn-primary ml-10"
            onClick={() => this.setMarkerSpeed(700)}
            disabled={this.state.markerSpeed === 700}
          >
            Set speed slow
          </button>
        </div>

        <Map center={position} zoom={this.state.zoom} maxZoom="20">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup>
            <MarkersList markers={this.state.markers} />
          </MarkerClusterGroup>
          {/* If the ship is in the starting position the marker should not appear */}
          {this.state.waypointIndex === 0 ? (
            ""
          ) : (
            <DriftMarker
              // if position changes, marker will drift its way to new position
              position={this.state.position}
              // time in ms that marker will take to reach its destination
              duration={this.state.markerSpeed}
              keepAtCenter={true}
            ></DriftMarker>
          )}
          )}
        </Map>
      </div>
    );
  }
}

export default MapView;
