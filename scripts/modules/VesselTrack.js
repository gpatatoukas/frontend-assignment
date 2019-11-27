MarineTraffic.VesselTrack = (function() {
  'use strict';

  function VesselTrack([
    mmsi,
    status,
    speed,
    lon,
    lat,
    course,
    heading,
    timestamp,
    ship_id
  ]) {
    this.mmsi = mmsi;
    this.status = status;
    this.speed = speed;
    this.lon = +lon;
    this.lat = +lat;
    this.course = course;
    this.heading = heading;
    this.timestamp = timestamp.replace(/T/g, ' - ');
    this.ship_id = ship_id;
  }

  VesselTrack.prototype.getPosition = function() {
    return { lat: this.lat, lng: this.lon };
  };

  return VesselTrack;
})();
