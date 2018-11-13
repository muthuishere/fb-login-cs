
var FacebookClient = {
    authresponse: null,
    successCallback: null,
    connected:false,
    signout: function () {

        if (!FacebookClient.connected)
            return;


        

        FB.logout(function (response) {

            FacebookClient.connected = false;
        });

    },

   
    getUserDetails: function() {

        FB.api('/me?fields=email,name,first_name,last_name', function (response) {
            

            
           
            
            FacebookClient.onSuccess(response)
        });

    },
    setResponse: function (response) {
     
        FacebookClient.authresponse = response.authResponse;
        FacebookClient.connected = (response.status == "connected");
    },
    login: function() {

        
        


                FB.login(function (response) {
                        if (response.authResponse) {

                            FacebookClient.setResponse(response)
                            FacebookClient.getUserDetails();

                        } else {
                            FacebookClient.onFailure('User cancelled login or did not fully authorize.');
                        }
                }, { scope: "public_profile,email" });
        

       
       
    },
    getCurrentStatus: function() {

        FB.getLoginStatus(function (response) {
            console.log("getCurrentStatus")
         
            FacebookClient.setResponse(response)


        })

    },
    init: function (loginButtonId,fbConfig, successCallback) {

        FacebookClient.successCallback = successCallback;
        FacebookClient.connected = false;

        document.getElementById(loginButtonId).addEventListener("click", function() {


            if (FacebookClient.connected) 
                FacebookClient.getUserDetails();
            else
                FacebookClient.login()
               

        });


        window.fbAsyncInit = function () {
            FB.init({
                appId: fbConfig.appId,
                cookie: true,
                xfbml: true,
                version: 'v2.8'
            });

           // FB.AppEvents.logPageView();
            FacebookClient.getCurrentStatus();


        };
        

    },
    onSuccess(response) {

        console.log(response)
     
        if (null != FacebookClient.successCallback) {

            
            var result = {}

            result.email = response.email;
            result.imageurl = "https://graph.facebook.com/" + response.id + "/picture?type=small";
            result.firstname = response.first_name;
            result.lastname = response.last_name;
            result.name = response.name;
            result.socialid = response.id;


            result.authtoken = FacebookClient.authresponse.accessToken;
            FacebookClient.successCallback(result);

        }

    },
    onFailure: function (error) {

        console.log(error);

    }

}


