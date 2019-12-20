import React from "react";
import Control from "react-leaflet-control";
import Slider from "react-input-slider";
import {
  MdPlayArrow,
  MdPause,
  MdFastForward,
  MdFastRewind,
  MdStop
} from "react-icons/md";

import Classes from "./AnimationControls.module.scss";

const AnimationControls = ({
  toggleAnimate,
  stopAnimate,
  animating,
  forwardRewind,
  color,
  sliderMax,
  currArr,
  onChangeCurrArr
}) => (
  <Control position="bottomleft">
    <div style={{ background: color }} className={Classes.controlWrapper}>
      <button
        className={Classes.controlButton}
        onClick={forwardRewind.bind(this, true)}
      >
        <MdFastRewind className={Classes.controlIcon} />
      </button>
      <button className={Classes.controlButton} onClick={toggleAnimate}>
        {animating ? (
          <MdPause className={Classes.controlIcon} />
        ) : (
          <MdPlayArrow className={Classes.controlIcon} />
        )}
      </button>
      <button className={Classes.controlButton} onClick={stopAnimate}>
        <MdStop className={Classes.controlIcon} />
      </button>
      <button
        className={Classes.controlButton}
        onClick={forwardRewind.bind(this, false)}
      >
        <MdFastForward className={Classes.controlIcon} />
      </button>
      <div className={Classes.sliderContainer}>
        <Slider
          axis="x"
          xmin={0}
          xmax={sliderMax}
          x={currArr}
          onChange={onChangeCurrArr}
          styles={{
            thumb: {
              borderRadius: "0",
              height: 25,
              width: 15
            }
          }}
        />
      </div>
    </div>
  </Control>
);

export default AnimationControls;
