

var LoginClient = {


     dologout: function() {
         //Login Page
         alert("CHange in login-client.js to redirect login page")
        // window.location = "index.html";
     },
     doCredentialsLogin: function () {

        $("#logintype").val("");

     },
     submitForm: function() {

         $("#frmlogin").submit();

     },
     doGoogleLogin: function (result) {

        console.log(result)
        LoginClient.setSocialData(result);
        $("#logintype").val("google");
        LoginClient.submitForm();

     },

    doFacebookLogin: function(result) {

        LoginClient.setSocialData(result);
        $("#logintype").val("facebook");
        LoginClient.submitForm();

    },
    setSocialData: function(result) {

        $("#email").val(result.email);
        $("#imageurl").val(result.imageurl);
        $("#firstname").val(result.firstname);
        $("#lastname").val(result.lastname);
        $("#socialid").val(result.socialid);
        $("#authtoken").val(result.authtoken);
        $("#name").val(result.name);


    }
   

}