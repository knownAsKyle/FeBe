(function() {
    /*FIREBASE HOOK*/
    var config = {
        apiKey: "AIzaSyC03DhOY_MFozanY9Ajd438hJC-AazSRd0",
        authDomain: "febe-84cc9.firebaseapp.com",
        databaseURL: "https://febe-84cc9.firebaseio.com",
    };
    var uiConfig = {
        'signInSuccessUrl': (document.location.hostname === "localhost") ? '/' : 'kyleuhan.com/dev51',
        'signInOptions': [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
    };
    var app = firebase.initializeApp(config);
    var db = app.database();
    var auth = app.auth();
    var ui = new firebaseui.auth.AuthUI(auth);
    if (!auth.currentUser) {
        ui.start('#firebaseLoginUi', uiConfig);
    }
})();
