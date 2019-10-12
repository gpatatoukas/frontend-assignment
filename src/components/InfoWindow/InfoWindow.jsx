import React from 'react'
import { AISStatus, timeDifference } from '../../config'
import './InfoWindow.css'

const InfoWindow = (props) => {
  const { waypoint } = props;
  return (
    <div className="info-window" data-test="component-infoWindow">
      <div className="info-header">
        { waypoint ? `MMSI: ${waypoint.mmsi}`: '' }
      </div>
      <div>
        <span className="grey-text">
          { waypoint ? `Status: ${AISStatus[waypoint.status]}` : '' }
        </span>
      </div>
      <div>
        <span className="orange-text">
        { waypoint ? `Speed/Course: ${(parseFloat(waypoint.speed)/100).toFixed(2)} kn / ${waypoint.course} °` : '' }
        </span>
      </div>
      <div>
        <span className="gray-text">
        { waypoint ? `Longitude: ${waypoint.lng}, Latitude: ${waypoint.lat}` : '' }
        </span>
      </div>
      <div className="info-footer">
        <span className="green-text">{ waypoint ? `Received: ${timeDifference(new Date(), new Date(waypoint.timestamp))} ` : '' }</span>
      </div>
    </div>
  );
};

export default InfoWindow;