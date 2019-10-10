import React from 'react';
import InfoWindow from './InfoWindow'
import './Marker.css';

const Marker = (props) => {
    const { index, color, name, openInfoWindowMarkerId, waypoint } = props;
    return (
      <div data-test="component-Marker">
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={name}
          onClick={props.onClick}
        />
        {openInfoWindowMarkerId === index && <InfoWindow waypoint={waypoint} />}
        <div className="pulse" />
      </div>
    );
  };

  export default Marker;