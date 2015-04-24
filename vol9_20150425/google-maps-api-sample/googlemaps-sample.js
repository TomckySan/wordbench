(function(){

  'use strict';
  if (!navigator.geolocation) { alert('Cannot use geolocation'); return; }

  $(window).on('load', function() {
    var map,
        currentMarker,
        targetMarker,
        directionsRenderer;

    var initLat = 0,
        initLng = 0;

    var curLat = 0,
        curLng = 0;

    var opt = {
      zoom: 10,
      center: new google.maps.LatLng(initLat, initLng),
      mapTypeid: google.maps.MapTypeId.ROADMAP
    };

    if (document.getElementById('map')) {
      map = new google.maps.Map(document.getElementById('map'), opt);
    }

    /**
     *
     */
    var success = function(pos) {
      if (currentMarker) { currentMarker.setMap(null); }
      curLat = pos.coords.latitude;
      curLng = pos.coords.longitude;
      var curLatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      map.panTo(curLatLng);
      currentMarker = new google.maps.Marker({
        position: curLatLng,
        map: map
      });
    };

    /**
     *
     */
    var error = function(err) {
      alert('ERROR! (' + err.code + ' : ' + err.message + ')');
    };

    navigator.geolocation.getCurrentPosition(success, error);

    $('.input-address').on('change', function() {
      $('.result').text('');
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode (
        {
          'address':$(this).val(),
          'region':'jp'
        },
        function(result,status) {
          if(status === google.maps.GeocoderStatus.OK) {
            var location = result[0].geometry.location;
            var rendererOpt = {
              map: map,
              suppressMarkers: true
            };
            if (directionsRenderer) {
              directionsRenderer.setMap(null);
            }
            directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
            var directionsService = new google.maps.DirectionsService();
            var req = {
              origin: new google.maps.LatLng(curLat, curLng),
              destination: new google.maps.LatLng(location.k, location.D),
              travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            directionsService.route(req, function(result,status){
              if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
                var legs = result.routes[0].legs;
                var journey = 0;
                for (var i in legs) {
                  journey += legs[i].distance.value;
                }
                var distance = journey / 1000;
                $('.result').text('現在地から'+$('.input-address').val()+'までの距離は'+distance+'kmらしいよ');
              }
            });
          }
        }
      );
    });
  });
}).call(this);
