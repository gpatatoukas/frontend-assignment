import React, { useState } from "react";
import styled from "styled-components";
import { Marker } from "react-map-gl";
import Line from "./Line";
export default function Vessel({
  color,
  latitude,
  longitude,
  shipId,
  coordinates
}) {
  const [shipRoute, setShipRoute] = useState({ id: 0, show: false });
  const VesselStyles = styled.div`
    background-color: ${color};
    width: 1.7rem;
    height: 1.2rem;
    display: block;
    left: -0.5rem;
    top: -0.5rem;
    position: relative;

    cursor: grab;
    &::after {
      content: " ";
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      background: ${color};
      transform-origin: bottom left;
      -ms-transform: skew(-30deg, 0deg);
      -webkit-transform: skew(-30deg, 0deg);
      transform: skew(30deg, 0deg);
    }
  `;

  return (
    <div>
      <Marker
        latitude={Number(latitude)}
        longitude={Number(longitude)}
        offsetLeft={-20}
        offsetTop={-10}
        anchor="bottom"
      >
        <VesselStyles
          onClick={() =>
            setShipRoute({
              id: shipId,
              show: !shipRoute.show
            })
          }
        />
      </Marker>

      {shipRoute.show && <Line coordinates={coordinates} />}
    </div>
  );
}
