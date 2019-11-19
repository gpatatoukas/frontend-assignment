import React from "react";
import ReactDOMServer from "react-dom/server";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";

const PopupMarker = ({
  COURSE,
  HEADING,
  LAT,
  LON,
  MMSI,
  SHIP_ID,
  SPEED,
  STATUS
}) => (
  <Marker
    position={[LAT, LON]}
    icon={L.divIcon({
      className: "",
      html: ReactDOMServer.renderToString(
        <FontAwesomeIcon icon={faArrowUp} transform={{ rotate: HEADING }} />
      )
    })}
  >
    <Tooltip>
      <h3>Waypoint Info</h3>
      <p>Course: {COURSE}</p>
      <p>Heading: {HEADING}</p>
      <p>Lat: {LAT}</p>
      <p>Lon: {LON}</p>
      <p>Mmsi: {MMSI}</p>
      <p>Ship_id: {SHIP_ID}</p>
      <p>Speed: {SPEED}</p>
      <p>Status: {STATUS}</p>
    </Tooltip>
  </Marker>
);

export default PopupMarker;
