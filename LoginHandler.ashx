<%@ WebHandler Language="C#" Class="LoginHandler" %>

using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

public class LoginHandler : IHttpHandler
{


    
    public void ProcessRequest(HttpContext context)
    {

        //Get loginType
        //Get user details 

        var LoginType = context.Request["logintype"];//.QueryString["logintype"];

        if (LoginType.Equals("facebook"))
        {
            ValidateFacebookLogin(context);
        }
        else if (LoginType.Equals("google"))
        {
            ValidateGoogleLogin(context);
        }
        else
        {
            ProcessCreds(context);
        }

    }


    public void ValidateFacebookLogin(HttpContext context)
    {

        //Now Check whether user already exists
        //If user already exists redirect 

       
        string token = context.Request["authtoken"];

        //NOTE  This is Just for Access token validation
        if (!IsValidFacebookAccessToken(token))
        {

            context.Response.Redirect("index.html?err=Invalid Access Token");
            return;

        }

        //=======================

        ProcessSocialLogin(context);

    }


    public void ValidateGoogleLogin(HttpContext context)
    {
 

       
        string token = context.Request["authtoken"];

        //NOTE  This is Just for Access token validation
        if (!IsValidGoogleAccessToken(token))
        {

            context.Response.Redirect("index.html?err=Invalid Access Token");
            return;

        }

        //=======================

        ProcessSocialLogin(context);

    }

    public void ProcessCreds(HttpContext context)
    {
        //TODO start normal login procedure here
    }


    

    public void ProcessSocialLogin(HttpContext context)
    {
        

        //Now Check whether user already exists
        //If user already exists redirect 



        var email = context.Request.QueryString["email"];
        if (IsEmailExistsInDatabase(email))
        {

            //TODO change ur logic
            //Set Session variables
            //DO login Logic
            context.Response.Redirect("userdashboard.html");

        }
        else
        {
                

            //TODO change ur logic
            //User Register Logic , First Time User 
            //Either use it as session vars or pass as parames or directly register now
            var socialid = context.Request["socialid"];
            var imageurl = context.Request["imageurl"];
            var firstname = context.Request["firstname"];
            var lastname = context.Request["lastname"];
            var loginType = context.Request["logintype"];

            //Set The variables in session or pass as parameters
            context.Response.Redirect("register.html");

        }

    }
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }


    public bool IsEmailExistsInDatabase(string email)
    {

        //TODO Add logic for validation here
        return true;
    }


    public bool IsValidFacebookAccessToken(string token)
    {



        string url = "https://graph.facebook.com/me";
        string queryString = "?access_token=" + token;
        //   string token =
        //     "EAADIszNJZB8wBAAIqudqG9XV45F7TlzRUfXbawKiadSNq6rWZA5muZCKX8g4WXCY86YlZCl498NkmX9rDjfquKcTHZAfMiSTQmv8y4mBfUB5UzrFf25TxTDIwN04PIps6ZBzNi6WQ9HnkEEnBvvYvZBxtgDcZAfk8GNTxi4beRqLHN2iFa5aax3S9UAPGyfpZBTprvY8tKMZARFwZDZD";


        return IsValidHttpResult(url, queryString);

    }


    public bool IsValidGoogleAccessToken(string token)
    {

        string url = "https://www.googleapis.com/oauth2/v3/tokeninfo";
        string queryString = "?id_token=" + token;


        return IsValidHttpResult(url, queryString);

    }

    public bool IsValidHttpResult(string url, string reqparams)
    {

        HttpClient client = new HttpClient();
        client.BaseAddress = new Uri(url);

        // Add an Accept header for JSON format.
        client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

        // List data response.
        HttpResponseMessage response = client.GetAsync(reqparams).Result;  // Blocking call!

        return (response.IsSuccessStatusCode);


    }
}



