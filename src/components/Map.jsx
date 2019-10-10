import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from './Marker';

import { getWaypoints } from '../actions'
import { connect } from 'react-redux'
import './Map.css'

const Map = (props) => {

  const { getWaypoints, waypointsList } = props
  const [openInfoWindowMarkerId, setOpenInfoWindowMarkerId] = useState('')
  const [center] = useState({lat: 0, lng: 0 });
  const [zoom] = useState(1);

  useEffect(() => {
    getWaypoints()
  },[])
  
  return (
    <div className="map-wrapper" data-test="component-Map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBH2vfeeEQkhULaOTjeuz05WYOz0v-EcAk' }}
        defaultCenter={center}
        defaultZoom={zoom}        
      >
        {
          waypointsList.length &&
          waypointsList.map((marker, index) => (
            <Marker
              key={index}
              index={index}
              lng={marker[3]}
              lat={marker[4]}
              name={`ship id: ${marker[8]}`}
              color="red"
              waypoint={marker}
              onClick={() => setOpenInfoWindowMarkerId(index)}
              openInfoWindowMarkerId={openInfoWindowMarkerId}
            />
          ))
        }
        
      </GoogleMapReact>
    </div>
  );
}

const mapDispatchToProps = {
  getWaypoints
}

const mapStateToProps = state => ({
  waypointsList: state.waypointsList 
})

export default connect(mapStateToProps, mapDispatchToProps)(Map);