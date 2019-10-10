import React from 'react'
import { AISStatus, timeDifference } from '../config'
import './InfoWindow.css'

const InfoWindow = (props) => {
  const { waypoint } = props;

  return (
    <div className="info-window" data-test="component-infoWindow">
      <div className="info-header">
        { waypoint ? `MMSI: ${waypoint[0]}`: '' }
      </div>
      <div>
        <span className="grey-text">
          { waypoint ? `Status: ${AISStatus[waypoint[1]]}` : '' }
        </span>
      </div>
      <div>
        <span className="orange-text">
        { waypoint ? `Speed/Course: ${(parseFloat(waypoint[2])/100).toFixed(2)} kn / ${waypoint[5]} °` : '' }
        </span>
      </div>
      <div>
        <span className="gray-text">
        { waypoint ? `Longitude: ${waypoint[3]}, Latitude: ${waypoint[4]}` : '' }
        </span>
      </div>
      <div className="info-footer">
        <span className="green-text">{ waypoint ? `Received: ${timeDifference(new Date(), new Date(waypoint[7]))} ` : '' }</span>
      </div>
    </div>
  );
};

export default InfoWindow;