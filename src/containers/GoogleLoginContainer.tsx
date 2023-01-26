import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const GoogleLoginContainer = (props:any) => {
    return(
        <GoogleLogin
                onSuccess={async credentialResponse => {
                    console.log(credentialResponse);
                    await axios.post(
                        "/oauth2/login",
                        {},
                        {
                            headers: {
                            "Authorization" : `Bearer ${credentialResponse.credential}`,
                            },
                            withCredentials: true,
                        }
                    )
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
    );
}