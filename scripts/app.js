(function() {
  'use strict';

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: { lat: 0, lng: 0 },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  const infowindow = new google.maps.InfoWindow();
  let markers = [];

  document.getElementById('search-button').addEventListener('click', () => {
    MarineTraffic.Validation.resetValidationErrors();
    markers = resetMarkers(markers);

    const searchCriteria = [
      'search-form__mmsi',
      'search-form__period',
      'search-form__days'
    ].map(elId => document.getElementById(elId).value);

    if (!MarineTraffic.Validation.validateCriteria(searchCriteria)) return;

    MarineTraffic.API.search(searchCriteria).then(vesselTracks => {
      console.log(vesselTracks);
      if (vesselTracks.length > 0) {
        map.setCenter(vesselTracks[0].getPosition());
        map.setZoom(5);

        vesselTracks.forEach(vesselTrack => {
          const marker = new google.maps.Marker({
            position: vesselTrack.getPosition(),
            map: map
          });
          markers.push(marker);

          google.maps.event.addListener(marker, 'click', () => {
            infowindow.setContent(getTrackDialog(vesselTrack));
            infowindow.open(map, marker);
          });
        });
      }
    });
  });

  function resetMarkers(markers) {
    markers.forEach(marker => marker.setMap(null));
    return [];
  }

  function getTrackDialog({ timestamp, lat, lon, speed }) {
    return `<b>${timestamp}</b></br>
            Lat :${lat}</br> 
            Lon :${lon}</br> 
            Speed: ${speed}</br>`;
  }
})();
