import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { TileLayer, Marker, Tooltip, Polyline } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import TooltipText from './tooltipText';
import * as S from './styled';

const Map = ({ positions, setSelectionDisabled }) => {
    const [state, setState] = useState({
        latlng: [51.935750, 3.149473],
        zoom: 3,
        markers: [],
        polylines: []
    });

    useEffect(() => {
        if (positions.length) {
            let polylines = [];
            let markers = [];
            for (let i = 0; i < positions.length; i++) {
                setTimeout(() => {
                    const currentPosition = positions[i];
                    markers.push({
                        details: currentPosition,
                        latlng: [currentPosition.LAT, currentPosition.LON],
                    });
                    const isLastPosition = i === positions.length - 1;
                    if (i > 0) {
                        const previousPosition = positions[i - 1];
                        polylines.push({ from: [previousPosition.LAT, previousPosition.LON], to: [currentPosition.LAT, currentPosition.LON] })
                    }
                    setState({
                        markers,
                        polylines,
                        latlng: [currentPosition.LAT, currentPosition.LON],
                        zoom: isLastPosition ? 4 : 6
                    });
                    if (isLastPosition) {
                        setSelectionDisabled(false);
                    }
                }, i * 1000);
            }
        }
    }, [positions]);

    return (
        <S.Map center={state.latlng} zoom={state.zoom} maxZoom={10}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                state.markers.length > 0 && (
                    <MarkerClusterGroup animate={true} animateAddingMarkers={true}>
                        {state.markers.map((marker, index) => (
                            <Marker key={index} position={marker.latlng}>
                                <Tooltip>
                                    <TooltipText 
                                        status={marker.details.STATUS}
                                        speed={marker.details.SPEED}
                                        timestamp={marker.details.TIMESTAMP}
                                        />
                                </Tooltip>
                            </Marker>
                        ))}
                    </MarkerClusterGroup>
                )
            }
            {
                state.polylines.map((p, index) => (
                    <Polyline key={index} positions={[
                        p.from, p.to,
                    ]} color={'red'} />
                ))
            }
        </S.Map>
    );
}

Map.propTypes = {
    positions: PropTypes.arrayOf(
        PropTypes.shape({
            MMSI: PropTypes.string,
            COURSE: PropTypes.string,
            LAT: PropTypes.string,
            LON: PropTypes.string,
            SHIP_ID: PropTypes.string,
            SPEED: PropTypes.string,
            STATUS: PropTypes.string,
            TIMESTAMP: PropTypes.string
        })
    ),
    setSelectionDisabled: PropTypes.func.isRequired
};

export default memo(Map);
