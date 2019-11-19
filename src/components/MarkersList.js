import React, { Fragment } from "react";
import PopupMarker from "./PopupMarker";

const MarkersList = ({ markers }) => {
  var shipCourse = null;
  const items = markers.map(function({ ...props }) {
    if (props.COURSE !== shipCourse) {
      shipCourse = props.COURSE;
      return <PopupMarker key={props.TIMESTAMP} {...props} />;
    }
  });
  return <Fragment>{items}</Fragment>;
};

export default MarkersList;
