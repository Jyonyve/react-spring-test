
import { InputAdornment, TextField } from "@material-ui/core";
import axios from "axios";
import { toJS } from "mobx";
import React, { useEffect, useState } from "react";


function OAuthRedirectSuccess (props:any) {

    const BASE_URL = '/login/oauth2';
    const [accessToken, setAccessToken] : any[] = useState();

    const loginSuccess  = async () :Promise<any>  => {  
        try { 
            await axios.get(
                BASE_URL+'/success',
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                ).then(res => {
                    setAccessToken(res.headers.getAuthorization);
                    console.log(toJS(accessToken));
                    localStorage.setItem('accessToken', toJS(accessToken))
                })
        } catch (error) {
           console.error(error); 
        }
        return accessToken;
    }

    useEffect( () => {
        loginSuccess();
    }, [accessToken])

    return(
        <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
                {`accessToken : ${accessToken}`}
            </InputAdornment>
          ),
        }}
      />
    )

}
export default OAuthRedirectSuccess;