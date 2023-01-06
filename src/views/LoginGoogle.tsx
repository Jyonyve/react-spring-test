import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

export const LoginGoogle = (props:any) => {

    const URL :string = 'http://localhost:8080'

    return(
        <GoogleOAuthProvider clientId="642225847404-je5i44c2t5d6jskll3sk82nqh233ejlk.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={async credentialResponse => {
                    console.log(credentialResponse);
                    await axios.post(
                        URL + "/login",
                        {},
                        {
                            headers: {Authorization: `Bearer ${credentialResponse}`}

                        }
                        ,
                    )
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />;
        </GoogleOAuthProvider>
    )
}