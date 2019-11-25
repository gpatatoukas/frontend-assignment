import React, { useState, useCallback } from "react";

import { Marker, Popup  } from "react-map-gl";
import styled from "styled-components";

const ShipMarker = ({ shipData, color, info }) => {
  const [popup, setPopUp] = useState(false);

  const MarkerStyles = styled.div`
    background-color: ${color};
    width: 0.9rem;
    height: 0.9rem;
    display: block;
    left: -0.5rem;
    top: -0.5rem;
    position: relative;
    border-radius: 1.5rem 1.5rem 0;
    transform: rotate(45deg);
    border: 1px solid #ffffff;
    cursor: grab;
  `;

  const openPopUp = useCallback(() => {
    setPopUp(!popup);
  }, [popup]);

  return (
    <div>
      <Marker
        latitude={Number(shipData.LAT)}
        longitude={Number(shipData.LON)}
        offsetLeft={-20}
        offsetTop={-10}
        anchor="bottom"
      >
        <MarkerStyles onClick={openPopUp} />
      </Marker>
      {popup && (
        <Popup
          latitude={Number(shipData.LAT)}
          longitude={Number(shipData.LON)}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setPopUp(false)}
          anchor="top"
        >
          <div>
            <h3>{info.name}</h3>
            <div><img src={info.imgUrl } alt={info.name}/></div>
            <p>status: {shipData.STATUS}</p>
            <p>speed: {shipData.SPEED}</p>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default ShipMarker;
