<div class="contact-maps-section">
  <div class="wrap-maps">
    <div class="left-map">
      <div id="left-map"></div>
    </div>
    <div class="right-map">
      <div id="right-map"></div>
    </div>
  </div>
</div>

<script type="text/javascript" src="js/infobubble-compiled.js"></script>

<script type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKus-6grL7OZgnEogkvih8hiRGUhXjPjU"></script>

<script type="text/javascript">
  // When the window has finished loading create our google map below
  google.maps.event.addDomListener(window, 'load', init);

  function init() {

    var styles = [{
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
    }, {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
    }, {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [{"visibility": "off"}]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#fefefe"}, {"lightness": 20}]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]
    }, {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{"color": "#dedede"}, {"lightness": 21}]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
    }, {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]
    }, {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]}];


    leftMap();
    rightMap();

    function leftMap() {

      var infoContent = '<div class="infowindow-content">' +
        '<h4>Headquarters</h4>' +
        '<div class="address">' +
        'Nilex AB<br>' +
        'East Sandgatan 12<br>' +
        '252 27  Helsingborg<br>' +
        'Sweden' +
        '</div>' +
        '</div>';

      var mapOptions = {
        zoom: 15,
        scrollwheel: false,
        center: new google.maps.LatLng(42.424254, 19.272448),
        styles: styles
      };
      var mapElement = document.getElementById('left-map');
      var map = new google.maps.Map(mapElement, mapOptions);
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(42.424254, 19.272448),
        map: map,
        icon: '/images/pin-o.png',
        title: 'Snazzy!'
      });

      var infoBubble = new InfoBubble({
        map: map,
        content: infoContent,
        position: new google.maps.LatLng(-32.0, 149.0),
        shadowStyle: 0,
        padding: 16,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 0,
        arrowSize: 10,
        disableAnimation: false,
        borderWidth: 0,
        borderColor: 'rgba(0,0,0,0.6)',
        closeSrc: '/images/close-pin.png',
        disableAutoPan: false,
        hideCloseButton: false,
        minWidth: 215,
        minHeight: 140,
        arrowStyle: 0,
        backgroundClassName: 'infowindow primary'
      });


      marker.addListener('click', function () {
        infoBubble.open(map, marker);
      });

      google.maps.event.addListenerOnce(map, 'idle', function(){
        infoBubble.open(map, marker);
      });


    }

    function rightMap() {

      var infoContent = '<div class="infowindow-content">' +
        '<h4>Headquarters</h4>' +
        '<div class="address">' +
        'Nilex AB<br>' +
        'East Sandgatan 12<br>' +
        '252 27  Helsingborg<br>' +
        'Sweden' +
        '</div>' +
        '</div>';

      var mapOptions = {
        zoom: 15,
        scrollwheel: false,
        center: new google.maps.LatLng(42.446284, 19.250572),
        styles: styles
      };
      var mapElement = document.getElementById('right-map');
      var map = new google.maps.Map(mapElement, mapOptions);
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(42.446284, 19.250572),
        map: map,
        icon: '/images/pin-g.png',
        title: 'Snazzy!'
      });


      var infoBubble = new InfoBubble({
        map: map,
        content: infoContent,
        position: new google.maps.LatLng(-32.0, 19.0),
        shadowStyle: 0,
        padding: 16,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 0,
        arrowSize: 10,
        disableAnimation: false,
        borderWidth: 0,
        borderColor: 'rgba(0,0,0,0.6)',
        closeSrc: '/images/close-pin.png',
        disableAutoPan: false,
        hideCloseButton: false,
        minWidth: 215,
        minHeight: 140,
        arrowStyle: 0,
        backgroundClassName: 'infowindow secondary'
      });


      marker.addListener('click', function () {
        infoBubble.open(map, marker);
      });

      google.maps.event.addListenerOnce(map, 'idle', function(){
        infoBubble.open(map, marker);
      });

    }

  }
</script>
