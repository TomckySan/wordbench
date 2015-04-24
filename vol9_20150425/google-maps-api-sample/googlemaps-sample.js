(function(){

  'use strict';
  if (!navigator.geolocation) { alert('Cannot use geolocation'); return; }

  $(window).on('load', function() {
    var map,
        currentMarker,
        targetMarker;

    var initLat = 0,
        initLng = 0;

    var curLat = 0,
        curLng = 0;

    var opt = {
      zoom: 16,
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
      // TODO
      // 目的地入力欄。住所を入れるとそこにピンを立ててルート表示
      // 住所を座標に変換する処理
      var req = {
        origin: new google.maps.LatLng(curLat, curLng),
        destination: targetLatLng,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      };
    });
  });
}).call(this);
