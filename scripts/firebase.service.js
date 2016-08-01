var firebaseService = (function() {
    function firebaseService(config) {
        config = config || {};
        this.config = config.hook || {
            apiKey: "AIzaSyC03DhOY_MFozanY9Ajd438hJC-AazSRd0",
            authDomain: "febe-84cc9.firebaseapp.com",
            databaseURL: "https://febe-84cc9.firebaseio.com",
        }
        this.uiConfig = config.uiConfig || {
            'signInSuccessUrl': (document.location.hostname === "localhost") ? '/' : 'kyleuhan.com/dev51',
            'signInOptions': [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ]
        };
        this.firebaseApp = firebase.initializeApp(config);
        this.db = this.firebaseApp.database();
        this.auth = this.firebaseApp.auth();
        this.ui = new firebaseui.auth.AuthUI(auth);
        if (!this.auth.currentUser) {
            this.ui.start('#firebaseLoginUi', uiConfig);
        }
    };
    var p = firebaseService.prototype;
    p.onAuth = function(fn) {
        this.auth.onAuthStateChanged(fn);
    }
    return firebaseService;
})();