import React, {useState, useEffect} from 'react';
import Marker from '../Marker/Marker';
import MarkerGroup from '../MarkerGroup/MarkerGroup';
import MarkerCounter from '../MarkerCounter/MarkerCounter';

const ClusterMarker = (props) => {

  const [clusterFaceMarkers, setClusterFaceMarkers] = useState([])

  useEffect(() => {
    setClusterFaceMarkers(props.points.slice(0, 2))
  }, [])

  const { openInfoWindowMarkerId, setOpenInfoWindowMarkerId, points } = props
  return (
    <div data-test="component-cluster-marker">
      <MarkerGroup length={points ? points.length : 0}>
        {clusterFaceMarkers.map(marker =>
          <Marker
            index={marker.timestamp}
            key={marker.timestamp}
            lat={marker.lat}
            lng={marker.lng}
            name={marker.timestamp}
            inGroup
            openInfoWindowMarkerId={openInfoWindowMarkerId}
            setOpenInfoWindowMarkerId={setOpenInfoWindowMarkerId}
          />
        )}
        {(points && (points.length > 2)) &&
          <MarkerCounter>
            +{points.length - 2}
          </MarkerCounter>}
      </MarkerGroup>
    </div>
  );
  
}

export default ClusterMarker;
