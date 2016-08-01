var swiperService = (function() {
    function slider(settings) {
        var swiperSettings = settings || {};
        swiperSettings.noSwiping = true;
        swiperSettings.nextButton = ".swiper-button-next";
        swiperSettings.prevButton = ".swiper-button-prev";
        swiperSettings.scrollbar = ".swiper-scrollbar";
        this.slider = new Swiper('.swiper-container', swiperSettings);
    }
    var p = slider.prototype;
    p.changeStart = function(fn) {
        this.slider.on("slideChangeStart", fn);
    }
    p.changeEnd = function(fn) {
        this.slider.on("slideChangeEnd", fn);
    }
    p.lock = function() {
        this.slider.lockSwipes();
    }
    p.unlock = function() {
        this.slider.unlockSwipes();
    }
    p.getSlider = function() {
        return this.slider;
    }
    p.getCurrentSlide = function() {
        return this.slider.activeIndex;
    }
    p.slideTo = function(index) {
        this.swiper.slideTo(1);
    }
    return slider;
})();