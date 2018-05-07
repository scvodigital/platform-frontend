var $what = $('[name="keywords"]');
var $distance = $('#distance');
var $map = $('#map-full');
var $searchTerms = $('#search-terms');
var $detailedResults = $('#detailed-results-container');
var $forms = $('[action="/search"]');

//var typeaheadController = new TypeaheadController($what, terms, { highlight: true, minlength: 0 });
var vacanciesController = new VacanciesController();
var mapController = null;

//typeaheadController.addListener(searchTermsController.addTerm.bind(searchTermsController));
//searchTermsController.addListener(vacanciesController.doSearch.bind(vacanciesController));
//vacanciesController.addListener(generateMapContent);
//vacanciesController.addListener(refreshChips);

$forms.on('submit', function(evt) {
  evt.preventDefault();
  $form = $(evt.currentTarget);
  var qs = $form.serialize();
  qs += qs ? '&json' : 'json';
  console.log('Querystring:', qs);
  $.getJSON('/search?' + qs, function(results) {
    $detailedResults.html(results.detailed_results.string);
    var lat = $('[name="lat"]').val();
    var lng = $('[name="lng"]').val();
    var distance = $('[name="distance"]').val();
    var terms = {
      center: {
        latitude: lat,
        longitude: lng,
        distance: distance
      }
    };
    var historyUrl = '/search?' + $form.serialize();
    if ($map.is(":visible")) {
      historyUrl += '&view=map';
    }
    history.pushState({}, 'Goodmoves Search', historyUrl);
    generateMapContent(results.map_results.hits, terms);
  });
});

function mapView() {
  $detailedResults.hide();
  $map.removeClass('hidden');
  $map.addClass('shown');
}

function detailsView() {
  $detailedResults.show();
  $map.removeClass('shown');
  $map.addClass('hidden');
}

var autocompletePerm, autocompleteTemp, mapController;
function initMap() {
  var autocompletePermEl = $('#perm-location')[0];
  var autocompleteTempEl = $('#temp-location')[0];
  mapController = new MapController($map, 57.0268117, -5.5676529, 6);

  var autocompleteOptions = {
    'types': ['(cities)'],
    'componentRestrictions': {
      'country': 'gb'
    }
  };
  autocompletePerm = new google.maps.places.Autocomplete(autocompletePermEl, autocompleteOptions);
  autocompleteTemp = new google.maps.places.Autocomplete(autocompleteTempEl, autocompleteOptions);

  autocompletePerm.addListener('place_changed', autocompleteChange);
  autocompleteTemp.addListener('place_changed', autocompleteChange);
  
  var terms = {
    center: {
      latitude: null,
      longitude: null,
      distance: null
    }
  };
  generateMapContent(mapResults, terms);
}

function autocompleteChange(evt) {
  var place = this.getPlace();
  console.log(place.formatted_address);
  if (place.geometry.location) {
    $('[name="lat"]').val(place.geometry.location.lat());
    $('[name="lng"]').val(place.geometry.location.lng());
    $('[name="location"]').val(place.formatted_address);
  }
}

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('GEOLOCATION:', position, $distance.val());
      searchTermsController.setCenter(
        position.coords.latitude,
        position.coords.longitude,
        $distance.val()
      );
      reverseLookup(position.coords.latitude, position.coords.longitude);
    });
  } else {
    console.log('Getting All');
    vacanciesController.doSearch({});
  }
}

function reverseLookup(latitude, longitude) {
  var base = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
  var coords = latitude + ',' + longitude;
  var key = 'AIzaSyCT7vZkJdto5JoAUDx3asuHu7mHcl8UanQ';
  var url = base + coords + '&key=' + key + '&result_type=locality';
  // console.log('GeoLookup URL:', url);
  $.getJSON(url, function(place) {
    if (place.results && place.results.length > 0) {
      var locality = place.results[0].formatted_address;
      $where.val(locality);
    }
  });
}

function generateMapContent(vacancies, searchTerms) {
  var pinsOptions = [];
  var shapesOptions = [];

  var centerShapeOptions = getCenterShapeOptions(searchTerms);
  var vacancyPinsOptions = getVacancyPinsOptions(vacancies);

  if (centerShapeOptions) {
    shapesOptions.push(centerShapeOptions);
  }

  pinsOptions = pinsOptions.concat(vacancyPinsOptions);

  mapController.refreshMap(shapesOptions, pinsOptions, !searchTerms.bounds);
}

function refreshChips(vacancies, searchTerms) {
  $searchTerms.empty();
  var termCount = 0;
  var fields = Object.keys(searchTerms.terms);
  for (var f = 0; f < fields.length; ++f) {
    var field = fields[f];
    var fieldTerms = searchTerms.terms[field];
    for (var t = 0; t < fieldTerms.length; ++t) {
      var term = fieldTerms[t];
      var $chip = $('<div />')
      .addClass('mdc-chip mdc-theme--primary-bg')
      .attr({ tabindex: 0 })
      .appendTo($searchTerms);
      var chipText = $('<div />')
      .addClass('mdc-chip__text')
      .html('<strong>' + field + '</strong>: ' + term)
      .appendTo($chip);
      var chipClose = $('<i />')
      .addClass('fa fa-times-circle mdc-chip__icon mdc-chip__icon--trailing')
      .data({ field: field, term: term })
      .attr({ tabindex: 0, role: 'button' })
      .on('click', function(evt) {
        console.log(evt);
        var btn = $(evt.currentTarget);
        var field = btn.data('field');
        var term = btn.data('term');
        searchTermsController.removeTerm(field, term);
      })
      .appendTo($chip);
      termCount++;
    }
  }
  if (termCount > 0) {
    $overlay.addClass('search-overlay-terms');
  } else {
    $overlay.removeClass('search-overlay-terms');
  }
}

function getCenterShapeOptions(searchTerms) {
  if (searchTerms.center.distance) {
    var shapeOptions = {
      type: 'Circle',
      center: new google.maps.LatLng(searchTerms.center.latitude, searchTerms.center.longitude),
      fillOpacity: 0.6,
      fillColor: '#ffffff',
      strokeOpacity: 0.8,
      strokeColor: '#ffffff',
      strokeWeight: 2,
      radius: parseInt(searchTerms.center.distance, 10)
    };
    return shapeOptions;
  }
  return null;
}

function getVacancyPinsOptions(vacancies) {
  var pinsOptions = [];

  for (var i = 0; i < vacancies.length; ++i) {
    var vacancy = vacancies[i];
    // console.log('vacancy ',vacancy);
    if (vacancy.geo_vacancy_coords) {
      // console.log('vacancy.geo_vacancy_coords ',vacancy.geo_vacancy_coords);
      for (var c = 0; c < vacancy.geo_vacancy_coords.length; ++c) {
        var coords = vacancy.geo_vacancy_coords[c] || null;
        if (coords) {
          var markerOptions = {
            position: {
              lat: coords.lat,
              lng: coords.lon
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: '#58a934',
              fillOpacity: 0.6,
              strokeColor: '#58a934',
              strokeWeight: 1
            },
            title: vacancy.title,
            opacity: 1
          };
          var infoWindowOptions = {
            content: vacancy.info_window.string
          };
          var pinOptions = {
            markerOptions: markerOptions,
            infoWindowOptions: infoWindowOptions
          };
          pinsOptions.push(pinOptions);
        }
      }
    }
  }

  return pinsOptions;
}
