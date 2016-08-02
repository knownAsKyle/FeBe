var firebaseService = (function() {
    function firebaseService() {
        this.config = {
            apiKey: "AIzaSyC03DhOY_MFozanY9Ajd438hJC-AazSRd0",
            authDomain: "febe-84cc9.firebaseapp.com",
            databaseURL: "https://febe-84cc9.firebaseio.com"
        };
        this.uiConfig = {
            'signInSuccessUrl': (document.location.hostname === "localhost") ? '/' : 'kyleuhan.com/dev51',
            'signInOptions': [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ]
        };
        this.firebaseApp = firebase.initializeApp(this.config);
        this.db = this.firebaseApp.database();
        this.auth = this.firebaseApp.auth();
        this.ui = new firebaseui.auth.AuthUI(this.auth);
        if (!this.auth.currentUser) {
            this.ui.start('#firebaseLoginUi', this.uiConfig);
        }
    }
    var p = firebaseService.prototype;
    p.onAuth = function(fn) {
        this.auth.onAuthStateChanged(fn);
    };
    p.update = function(ref,data,cb){
        this.db.ref(ref).update(data).then(function(){
            if(cb){
                cb();
            }
        });
    };
    p.get = function(ref,cb){
        this.db.ref(ref).once("value").then(function(data){
            cb(data.val());
        });
    };
    return firebaseService;
})();