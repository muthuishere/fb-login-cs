
var GoogleClient = {
    auth2: null,
    successCallback:null,
    signout: function() {

        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
           
        });

    },
    init: function (loginButtonId,googleConfig,successCallback) {

        GoogleClient.successCallback = successCallback;

   
        gapi.load('auth2', function () {
   
            GoogleClient.auth2 = gapi.auth2.init({
                client_id: googleConfig.client_id
            });

   
            GoogleClient.auth2.attachClickHandler(loginButtonId, {}, GoogleClient.onSuccess, GoogleClient.onFailure);
        });

    },
    onSuccess(user) {
        
        console.log(user)
        console.log('Signed in as ' + user.getBasicProfile().getName());

        if (null != GoogleClient.successCallback) {

            var result = {}
            var profile = user.getBasicProfile()
            result.email = profile.getEmail()
            result.imageurl = profile.getImageUrl()
            result.firstname = profile.getGivenName()
            result.lastname = profile.getFamilyName()
            result.name = profile.getName();

            result.socialid = profile.getId()

            result.authtoken = user.getAuthResponse().id_token;
            GoogleClient.successCallback(result);

        }
       
    },
    onFailure: function (error) {

        console.log(error);

    }

}


