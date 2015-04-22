(function() {

  'use strict';
  if (!navigator.geolocation) { alert('Cannot use geolocation'); return; }

  /**
   *
   */
  var success = function(pos) {
    console.log(pos.coords);
    var info = '緯度:' + pos.coords.latitude + '<br/>' /
             + '軽度:' + pos.coords.longitude + '<br/>' /
             + '高度:' + pos.coords.altitude + '<br/>' /
             + '緯度・経度の誤差:' + pos.coords.accuracy + '<br/>' /
             + '高度の誤差:' + pos.coords.altitudeAccuracy + '<br/>' /
             + '方角:' + pos.coords.heading + '<br/>' /
             + '速度:' + pos.coords.speed + '<br/>';
    document.getElementById('current_info').innerHTML = info;
  };

  /**
   *
   */
  var error = function(err) {
    alert('ERROR! (' + err.code + ' : ' + err.message + ')');
  };

  navigator.geolocation.getCurrentPosition(success, error);

}).call(this);
