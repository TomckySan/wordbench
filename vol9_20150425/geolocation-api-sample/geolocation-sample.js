(function() {

  'use strict';
  if (!navigator.geolocation) { alert('Cannot use geolocation'); return; }

  /**
   *
   */
  var success = function(pos) {
    console.log(pos.coords);
    var info = '緯度:' + pos.coords.latitude + '<br/>' +
               '経度:' + pos.coords.longitude + '<br/>';
    console.log(info);
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
