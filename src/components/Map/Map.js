import React, { Component } from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import AnimatedMarker from "../AnimatedMarker/AnimatedMarker";

import MarkerClusterGroup from "react-leaflet-markercluster";

class Map extends Component {
  state = {
    lat: 53.0177903,
    lng: 10.2957541,
    zoom: 5
  };

  render() {
    const { lat, lng, zoom } = this.state;
    return (
      <div>
        <LeafletMap
          center={[lat, lng]}
          zoom={zoom}
          maxZoom={15}
          doubleClickZoom={false}
          style={{ height: "100vh" }}
        >
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <MarkerClusterGroup animate={true}>
            {this.props.vesselData.map((markerData, index) => (
              <AnimatedMarker
                data={markerData}
                index={index}
                key={`marker-${index}`}
              />
            ))}
          </MarkerClusterGroup>
        </LeafletMap>
      </div>
    );
  }
}

export default Map;
