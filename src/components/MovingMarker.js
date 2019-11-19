import React from "react";
import ReactDOMServer from "react-dom/server";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Marker from "react-leaflet-animated-marker";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const MovingMarker = () => (
  <Marker
    position={[30, 53]}
    icon={L.divIcon({
      className: "",
      html: ReactDOMServer.renderToString(<FontAwesomeIcon icon={faArrowUp} />)
    })}
  ></Marker>
);

export default MovingMarker;
