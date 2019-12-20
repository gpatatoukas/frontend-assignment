import React, { Component } from "react";
import CustomPopup from "../CustomPopup/CustomPopup";
import EnahncedMarker from "react-leaflet-enhanced-marker";
import Marker from "../Marker/Marker";
import AnimationControls from "../AnimationControls/AnimationControls";
import { Polyline } from "react-leaflet";
import { vessels } from "../../utilities";

class AnimatedMarker extends Component {
  state = {
    currPos: this.props.data[0],
    currArr: 0,
    latLngs: this.props.data,
    animating: false,
    showContols: false,
    line: [[this.props.data[0].lat, this.props.data[0].lng]]
  };

  onAnimate = reAnimation => {
    if (reAnimation && !this.state.latLngs[this.state.currArr + 1])
      return this.pauseAnimate();
    if (
      this.state.currPos.lat ===
        this.state.latLngs[this.state.latLngs.length - 1].lat ||
      this.state.currPos.lng ===
        this.state.latLngs[this.state.latLngs.length - 1].lng
    )
      return this.pauseAnimate();

    let startVal = this.state.latLngs[this.state.currArr],
      endVal = this.state.latLngs[this.state.currArr + 1],
      animTime = 2000,
      startTime = performance.now();

    const animate = () => {
      if (this.state.animating === false) return;
      const elapsed = performance.now() - startTime;

      if (elapsed < animTime) {
        this.setState(prevState => {
          const newLat =
            startVal.lat + (elapsed / animTime) * (endVal.lat - startVal.lat);
          const newLng =
            startVal.lng + (elapsed / animTime) * (endVal.lng - startVal.lng);
          const newLine = [...prevState.line];
          newLine[prevState.currArr + 1] = [newLat, newLng];
          return {
            currPos: {
              ...prevState.currPos,
              lat: newLat,
              lng: newLng
            },
            line: newLine,
            animating: true
          };
        });
        requestAnimationFrame(animate);
      } else {
        const nextArr = this.state.currArr + 1;
        startVal = this.state.latLngs[nextArr];
        endVal = this.state.latLngs[nextArr + 1];
        this.setState(() => ({
          currArr: nextArr,
          currPos: this.state.latLngs[nextArr]
        }));
        this.onAnimate(true);
      }
    };

    animate();
  };

  startAnimate = () => {
    this.setState(
      {
        animating: true
      },
      this.onAnimate
    );
  };

  pauseAnimate = () => {
    this.setState({
      animating: false
    });
  };

  stopAnimate = () => {
    this.setState({
      animating: false,
      currPos: this.state.latLngs[0],
      currArr: 0,
      line: [[this.props.data[0].lat, this.props.data[0].lng]]
    });
  };

  toggleAnimate = () => {
    this.setState(prevState => {
      if (this.state.animating) {
        this.pauseAnimate();
      } else {
        this.startAnimate();
      }

      return { animating: !prevState.animating };
    });
  };

  forwardRewind = rewind => {
    if (rewind) {
      this.setState(prevState => ({
        currArr: 0,
        currPos: prevState.latLngs[0],
        animating: false
      }));
    } else {
      this.setState(prevState => ({
        currArr: prevState.latLngs.length - 1,
        currPos: prevState.latLngs[prevState.latLngs.length - 1],
        animating: false
      }));
    }
  };

  onChangeCurrArr = ({ x }) => {
    this.setState(prevState => ({
      currArr: x,
      currPos: prevState.latLngs[x],
      line: prevState.latLngs.slice(0, x + 1),
      animating: false
    }));
  };

  toggleAnimationControls = () => {
    this.setState(prevState => ({ showContols: !prevState.showContols }));
  };

  render() {
    const color = vessels[this.state.latLngs[0].MMSI].color || "red";
    return (
      <>
        <Polyline color={color} positions={this.state.line} />
        <EnahncedMarker
          position={[this.state.currPos.lat, this.state.currPos.lng]}
          icon={
            <Marker
              fillColor={color}
              angle={this.state.currPos.course}
              index={this.props.index}
            />
          }
        >
          <CustomPopup
            data={this.state.currPos}
            toggleControls={this.toggleAnimationControls}
          />
        </EnahncedMarker>
        {this.state.showContols && (
          <AnimationControls
            animating={this.state.animating}
            toggleAnimate={this.toggleAnimate}
            stopAnimate={this.stopAnimate}
            forwardRewind={this.forwardRewind}
            color={color}
            sliderMax={this.state.latLngs.length - 1}
            currArr={this.state.currArr}
            onChangeCurrArr={this.onChangeCurrArr}
          />
        )}
      </>
    );
  }
}

export default AnimatedMarker;
