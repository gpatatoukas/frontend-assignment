import React from 'react';
import Ship from '../Ship';
import InfoWindow from '../InfoWindow/InfoWindow';
import './Marker.css';

class Marker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    inGroup: false,
  };

  render() {
    const { openInfoWindowMarkerId, setOpenInfoWindowMarkerId, index, point } = this.props
    return (              
        <div data-test="component-marker">        
          {
            this.props.inGroup
            ? <div className="marker-group">
                <Ship scale="0.55" />
              </div>
            : <div className="marker" onClick={() => {setOpenInfoWindowMarkerId(index)}}>
                  <div
                    className="pin bounce"
                    style={{ cursor: 'pointer' }}
                    title={'name'}
                  >
                    { openInfoWindowMarkerId === index && <InfoWindow waypoint={point} /> }
                  </div>
                  <Ship scale="0.55" />
                  <div className="pulse" />
              </div>
            }
        </div>
      
    );
  }
}

export default Marker;
