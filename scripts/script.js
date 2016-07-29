$('.swiper-slide select').on('mousedown touchstart MSPointerDown', function(e) {
    e.stopPropagation();
});
$('.swiper-slide input').on('mousedown touchstart MSPointerDown', function(e) {
    e.stopPropagation();
});
$('.swiper-slide textarea').on('mousedown touchstart MSPointerDown', function(e) {
    e.stopPropagation();
});


var locationOptions = {
    types: ['(cities)'],
    componentRestrictions: {
        country: "us"
    }
};

var currentLocInput = document.getElementById("myCurrentLocationInput");
var myCurrentLocationInput = $("#myCurrentLocationInput");

myCurrentLocationInput.on("change keyup", handleCurrentLocationInputKeyUp);
var autocompleteLocation = new google.maps.places.Autocomplete(currentLocInput, locationOptions);
google.maps.event.addListener(autocompleteLocation, 'place_changed', handleInputLocationChange);

function handleCurrentLocationInputKeyUp(e) {
    console.dir(autocompleteLocation)
    console.log(e.target.value)
}

function handleInputLocationChange() {
    var currentLocation = autocompleteLocation.getPlace();
    localStorage.setItem("FeBe_UserProfile", currentLocation.formatted_address);
    console.log(currentLocation);
}

setTimeout(function() {
    if (localStorage.getItem("FeBe_UserProfile")) {
        currentLocInput.value = localStorage.getItem("FeBe_UserProfile");
        // google.maps.event.trigger(autocompleteLocation, 'place_changed', handleInputLocationChange.bind(this));
        autocompleteLocation.setOptions({ address: currentLocInput.value })
        console.dir(autocompleteLocation)

    }
}, 1000)
