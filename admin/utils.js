const fs = require('fs');

// Export such that I can access it in other files.
module.exports = {
    initFirebase: function(firebase) {
        // Firebase credentials
        var config = {
            apiKey: "AIzaSyAwZ5nPtILN-zyVQp6mVxtQxewwwm_rPRc",
            authDomain: "thorcc-74bc0.firebaseapp.com",
            databaseURL: "https://thorcc-74bc0.firebaseio.com",
            projectId: "thorcc-74bc0",
            storageBucket: "",
            messagingSenderId: "27759849125"
        };

        // Initialize firebase
        var app = firebase.initializeApp(config);

        return app;
    },

    displayFirebaseError: function() {
         // Display errors from firebase
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("[" + errorCode + "] " + errorMessage);
    }
}
