import React from 'react';
import ShipImg from './ship.png'

const Ship = (props) => {
  const styles = {
    transform: `scale(${props.scale})`,
    width: '50px',
    height: '50px',
    position: 'fixed'
  };

  return (
    <div
      
      xmlns="http://www.w3.org/2000/svg"
      style={styles}
    >
      <img style={{width: '50px',
    height: '50px'}}src={ShipImg} />
    </div>
  );
}

export default Ship;
