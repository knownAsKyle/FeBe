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
    var userName = document.getElementById("userName");
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
    fb.onAuth(handleAuthChange);

    function handleAuthChange(user) {
        if (auth.currentUser) {
            console.log(user.uid, " = ", user.email, auth.currentUser);
            // mySwiper.unlockSwipes();
            userName.innerHTML = user.email;
            // mySwiper.slideTo(1);
            // console.dir(userName)
        } else {
            console.log("not logged in");
        }
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
        // localStorage.setItem("FeBe_UserProfile", currentLocation.formatted_address);
        console.log(currentLocation);
    }
})();
// setTimeout(function() {
//     if (localStorage.getItem("FeBe_UserProfile")) {
//         currentLocInput.value = localStorage.getItem("FeBe_UserProfile");
//         // google.maps.event.trigger(autocompleteLocation, 'place_changed', handleInputLocationChange.bind(this));
//         autocompleteLocation.setOptions({
//             address: currentLocInput.value
//         })
//         console.dir(autocompleteLocation)
//     }
// }, 1000)