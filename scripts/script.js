$('.swiper-slide select').on('mousedown touchstart MSPointerDown', stopProp);
$('.swiper-slide input').on('mousedown touchstart MSPointerDown', stopProp);
$('.swiper-slide textarea').on('mousedown touchstart MSPointerDown', stopProp);

function stopProp(e) {
    e.stopPropagation();
}
(function() {
    //DOM
    var landingPageImageSmall = document.getElementById("landingPageImageSmall");
    var landingPageImage = document.getElementById("landingPageImage");
    var userName = $("#userName");
    var currentLocInput = document.getElementById("myCurrentLocationInput");
    var myCurrentLocationInput = $("#myCurrentLocationInput");
    var map = document.getElementById("map");
    var categoryWrapper = $("#categoryWrapper");
    /*************************************
    **************************************
        SWIPER STUFF
    **************************************
    **************************************/
    var swiper = new swiperService();
    swiper.changeStart(handleSlideChangeStart);
    swiper.changeEnd(handleSlideChangeEnd);

    function handleSlideChangeStart() {
        if (swiper.getCurrentSlide() !== 0) {
            landingPageImage.style.opacity = 0;
            landingPageImageSmall.style.opacity = 1;
        }
    }

    function handleSlideChangeEnd() {
        if (swiper.getCurrentSlide() === 0) {
            landingPageImage.style.opacity = 1;
            landingPageImageSmall.style.opacity = 0;
        }
    }
    /*************************************
    **************************************
        FIREBASE STUFF
    **************************************
    **************************************/
    //FIREBASE AUTH
    var fb = new firebaseService();
    fb.onAuth(function handleAuthChange(user) {
        if (fb.auth.currentUser) {
            fb.update("users/" + user.uid, {"lastLoggedIn":new Date(), "userName": user.displayName || user.email}, updateUserComplete.bind(this));
            fb.get("categories",function handleLoadCategoriesComplete(data){
                console.dir(data);
                for(var cat in data){
                    var c = $("<p>",{class:"category", id: cat});
                    c.text(cat);
                    categoryWrapper.append(c);
                }
            });
        } else {
            swiper.slideTo(0);
            swiper.lock();
            userName.text(" ");
            console.log("not logged in");
        }
    });

    function updateUserComplete(){
        fb.get("users/" + fb.auth.currentUser.uid , handleGetUserProfile.bind(this));
    }

    function handleGetUserProfile(data){
        swiper.unlock();
        userName.text(data.userName);
        if(data.myLocation){
            myCurrentLocationInput.val(data.myLocation.address);
            loadMap(data.myLocation);
            swiper.slideTo(2);
        }else{
            swiper.slideTo(1);
        }
    }
    var searchRadius = (1609.34 * 15);
    function loadMap(data){
        var myLongLat = new google.maps.LatLng(data.lat, data.lng);
        var myMap = new google.maps.Map(map, {
            center: myLongLat,
            zoom: 9,
            draggable: false,
            disableDefaultUI: true
        });
        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: myMap,
            center: myMap.center,
            radius: searchRadius
        });

    }
    /*************************************
    **************************************
        GOOGLE AUTO COMPLETE STUFF
    **************************************
    **************************************/
    var locationOptions = {
        types: ['(cities)'],
        componentRestrictions: {
            country: "us"
        }
    };
    
    myCurrentLocationInput.on("change keyup", handleCurrentLocationInputKeyUp);
    var autocompleteLocation = new google.maps.places.Autocomplete(currentLocInput, locationOptions);
    google.maps.event.addListener(autocompleteLocation, 'place_changed', handleInputLocationChange);

    function handleCurrentLocationInputKeyUp() {}

    function handleInputLocationChange() {
        var currentLocation = autocompleteLocation.getPlace();
        var myLocation = {
            "myLocation": {
                "address": currentLocation.formatted_address, 
                "placeId":currentLocation.place_id,
                "lng": currentLocation.geometry.location.lng(),
                "lat": currentLocation.geometry.location.lat()
            }
        };
        fb.update("users/" + fb.auth.currentUser.uid, myLocation);
        loadMap(myLocation.myLocation);

    }
    /**********************************
            OTHER
    **********************************/
    userName.on("click", handleUserNameClick);

    function handleUserNameClick() {
        fb.auth.signOut();
    }
})();