import React from "react";
import { Popup } from "react-leaflet";
import { statusMap, getCardinal } from "../../utilities";
import Classes from "./CustomPopup.module.scss";
import "./CustomPopup.scss";

const CustomPopup = ({ data, toggleControls }) => {
  return (
    <Popup>
      <div className={Classes.PopupSection}>
        <h4 className={Classes.PopupHeader}>Position</h4>
        <div>
          <h5 className={Classes.PopupTitle}>Latitude:</h5>
          <span className={Classes.PopupBody}>{data.lat.toFixed(5)}</span>
        </div>
        <div>
          <h5 className={Classes.PopupTitle}>Longtitude:</h5>
          <span className={Classes.PopupBody}>{data.lng.toFixed(5)}</span>
        </div>
        <div>
          <h5 className={Classes.PopupTitle}>Speed:</h5>
          <span className={Classes.PopupBody}>{data.speed / 10} kn</span>
        </div>
        <div>
          <h5 className={Classes.PopupTitle}>Status:</h5>
          <span className={Classes.PopupBody}>{statusMap[data.status]}</span>
        </div>
      </div>
      <div className={Classes.PopupSection}>
        <h4 className={Classes.PopupHeader}>Direction</h4>
        <div>
          <h5 className={Classes.PopupTitle}>{getCardinal(data.course)}:</h5>
          <span className={Classes.PopupBody}>{data.course}°</span>
        </div>
      </div>
      <button onClick={toggleControls} className={Classes.controlButton}>
        Animation Controls
      </button>
    </Popup>
  );
};

export default CustomPopup;
