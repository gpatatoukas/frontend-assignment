import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';
import ClusterMarker from './ClusterMarker/ClusterMarker';

import Marker from './Marker/Marker';

import { getWaypoints } from '../actions'
import { connect } from 'react-redux'
import './Map.css'

const MAPProps = {
  defaultZoom: 4,
  defaultCenter: { lat: 40, lng:  0 },
  options: {
    maxZoom: 19,
  },
};

const Map = (props) => {

  const { getWaypoints, waypointsList } = props
  const [openInfoWindowMarkerId, setOpenInfoWindowMarkerId] = useState('')
  const [clusters, setClusters] = useState([])

  useEffect(() => {
    getWaypoints()
  },[])

  const getClusters = (props) => {
    const clusters = supercluster(waypointsList, {
      minZoom: 0,
      maxZoom: 16,
      radius: 60,
    });

    return clusters(props);
  };

  const createClusters = props => {
    setClusters(props.bounds
        ? getClusters(props).map(({ wx, wy, numPoints, points }) => { return {
            lat: wy,
            lng: wx,
            numPoints,
            timestamp: `${numPoints}_${points[0].timestamp}`,
            points,
          }})
        : [])

  };

  const handleMapChange = ({ center, zoom, bounds }) => {
    createClusters({ center, zoom, bounds });
  };
 
  return (
    <div className="map-wrapper" data-test="component-Map">
      {
        Boolean(waypointsList.length) ? 
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBH2vfeeEQkhULaOTjeuz05WYOz0v-EcAk' }}
            defaultCenter={MAPProps.defaultCenter}
            defaultZoom={MAPProps.defaultZoom}    
            options={{
              maxZoom: 19
            }}
            yesIWantToUseGoogleMapApiInternals
            onChange={handleMapChange}    
          >
            {clusters.map((item, index) => {
                if (item.numPoints === 1) {
                  return (
                    <Marker
                      index={item.timestamp}
                      key={item.timestamp}
                      point={item.points[0]}
                      lat={item.points[0].lat}
                      lng={item.points[0].lng}
                      openInfoWindowMarkerId={openInfoWindowMarkerId}
                      setOpenInfoWindowMarkerId={setOpenInfoWindowMarkerId}
                    />
                  );
                }
                return (
                  <ClusterMarker
                    key={item.timestamp}
                    lat={item.lat}
                    lng={item.lng}
                    points={item.points}
                    openInfoWindowMarkerId={openInfoWindowMarkerId}
                    setOpenInfoWindowMarkerId={setOpenInfoWindowMarkerId}
                  />
                );
              })}
            
          </GoogleMapReact>
        : <div>Loading...</div>
      }

    </div>
  );
}

const mapDispatchToProps = {
  getWaypoints
}

const mapStateToProps = state => ({
  waypointsList: state.waypointsList.map(point => ({mmsi: point[0], status: point[1], speed: point[2], lng: parseFloat(point[3]), lat: parseFloat(point[4]), course: point[5], heading: point[6], timestamp: point[7], shipId: point[8]})) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Map);