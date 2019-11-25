import React, { useState } from "react";

import ReactMapGl,  { GeolocateControl, NavigationControl} from "react-map-gl";
import Ship from "./Ship";
import { getMapKey } from "../utilities/utilities";

const MAP_API_KEY = getMapKey;

export default function MapViw() {
  const [viewportMap, setViewportMap] = useState({
    viewport: {
      width: "200vh",
      height: "100vh",
      longitude: -62.45,
      latitude: 37.78,
      zoom: 3
    }
  });


  return (
 
    <ReactMapGl
      {...viewportMap.viewport}
      onViewportChange={viewport => setViewportMap({ viewport })}
      mapboxApiAccessToken={MAP_API_KEY}
      mapStyle={"mapbox://styles/mapbox/navigation-preview-night-v2"}
    >
      <GeolocateControl />
      <Ship shipId={310624000} color='red' />
      <Ship shipId={235106595} color='blue' />
      <Ship shipId={308516000} color='green' />

      <div className="MapInfo">click at a boat to get its route or click at marker to get its info </div>
      <NavigationControl />
    </ReactMapGl>
  );
}


