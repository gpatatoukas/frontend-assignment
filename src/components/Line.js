import React, { useEffect, useState } from "react";

import { Source, Layer } from "react-map-gl";

export default function Line({ coordinates }) {
  const [line, setLine] = useState({
    type: "Feature",
    
    geometry: {
      type: "LineString",
      coordinates: []
    }
  });

  useEffect(() => {
    setLine({ ...line, geometry: { ...line.geometry,coordinates :[...coordinates]  }});
  
  }, [coordinates]);

  return (
    <div>
      <Source id="route" type="geojson" data={line} />
      <Layer
        id="route"
        type="line"
        source="route"
        layout={{
          "line-join": "round",
          "line-cap": "round"
        }}
        paint={{
          "line-color": "#fff",
          "line-width": 4
        }}
      />
    </div>
  );
}
