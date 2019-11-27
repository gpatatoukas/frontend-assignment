MarineTraffic.API = (function() {
  'use strict';

  function search([mmsi, period, days]) {
    return fetch(
      `https://services.marinetraffic.com/api/exportvesseltrack/cf8f05df0b57bfae43e762cc61fd381239c4c042/v:2/period:${period}/days:${days}/mmsi:${mmsi}/protocol:json`
    )
      .then(response => response.json())
      .then(tracks =>
        tracks.map(track => new MarineTraffic.VesselTrack(track))
      );
  }

  return {
    search
  };
})();
