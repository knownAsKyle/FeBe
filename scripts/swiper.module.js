(function() {
    var landingPageImageSmall = document.getElementById("landingPageImageSmall");
    var landingPageImage = document.getElementById("landingPageImage");
    var userName = document.getElementById("userName");
    //INIT SWIPER
    var swiperSettings = {};
    swiperSettings.noSwiping = true;
    swiperSettings.nextButton = ".swiper-button-next";
    swiperSettings.prevButton = ".swiper-button-prev";
    swiperSettings.scrollbar = ".swiper-scrollbar";
    var mySwiper = new Swiper('.swiper-container', swiperSettings);
    mySwiper.lockSwipes();

    mySwiper.on("slideChangeStart", handleSlideChangeStart);
    mySwiper.on("slideChangeEnd", handleSlideChangeEnd);

    function handleSlideChangeStart() {
        if (mySwiper.activeIndex !== 0) {
            landingPageImage.style.opacity = 0;
            landingPageImageSmall.style.opacity = 1;
        }

    }

    function handleSlideChangeEnd() {
        console.log(mySwiper)
        if (mySwiper.activeIndex === 0) {
            landingPageImage.style.opacity = 1;
            landingPageImageSmall.style.opacity = 0;
        }

    }

    var auth = firebase.auth();
    auth.onAuthStateChanged(function(user) {
        if (auth.currentUser) {
            console.log(user.uid, " = ", user.email, auth.currentUser);
            mySwiper.unlockSwipes();
            userName.innerHTML = user.email;
            mySwiper.slideTo(1);

            console.dir(userName)
        } else {
            console.log("not logged in");
        }
    });
})();
