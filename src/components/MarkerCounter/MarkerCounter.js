import React from 'react'
import './MarkerCounter.css'

const MarkerCounter = (props) => {
  return (
    <div className="marker-counter" data-test="component-marker-counter">
      {props.children}
    </div>
  )
}

export default MarkerCounter;
