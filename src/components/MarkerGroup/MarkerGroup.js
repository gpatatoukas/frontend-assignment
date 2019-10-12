import React from 'react'
import './MarkerGroup.css'

const MarkerGroup = (props) => {
  return (
    <div className="marker-group" data-test="component-marker-group">
      {props.children}
    </div>
  )
}

export default MarkerGroup;
