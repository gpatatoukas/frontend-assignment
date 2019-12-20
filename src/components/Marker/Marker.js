// https://www.onlinewebfonts.com/icon/251550

import React from "react";

const Marker = ({ fillColor, index }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <svg height="50" width="50">
        <circle cx="25" cy="25" r="13" fill={fillColor} />
      </svg>
      <h4
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontWeight: "900",
          fontSize: "1.25em"
        }}
      >
        {index + 1}
      </h4>
    </div>
  );
};

export default Marker;
