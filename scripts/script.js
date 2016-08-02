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
        console.log("user", user)
        if (fb.auth.currentUser) {
            swiper.unlock();
            swiper.slideTo(1);
            userName.text(user.email);
            console.log(userName)
        } else {
            swiper.slideTo(0);
            swiper.lock();
            userName.text(" ");
            console.log("not logged in");
        }
    });
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
    /**********************************
            OTHER
    **********************************/
    userName.on("click", handleUserNameClick);

    function handleUserNameClick() {
        console.log(fb.auth.s)
        fb.auth.signOut();
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