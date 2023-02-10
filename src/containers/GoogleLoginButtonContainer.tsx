import {  Button } from "@material-ui/core";
import { Google } from "@mui/icons-material";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { observer } from "mobx-react";
import { useEffect } from "react";

export const GoogleLoginButtonContainer = (observer((props:any) => {
  
    let {id_token, setId_token ,setAdminChecker, setLogin, currentEmail}= props;

    //send a request for getting code
    const login = useGoogleLogin({
      onSuccess: codeResponse => {
        console.log(codeResponse.code);
      },
      flow: 'auth-code',
      ux_mode: 'redirect',
      redirect_uri : 'http://localhost:3000/login/oauth2/code/google',
    });

    const logout = () => {
      localStorage.clear()
      googleLogout()
      setId_token('')
      setLogin(false)
      setAdminChecker(false)
    };
    
    useEffect(()=>{
    },[currentEmail])

    return (
      <div>
        {!id_token ?
        <Button endIcon={<Google/>} color="primary" onClick={() => {login()}}> Sign in with Google </Button>        
        :
        <Button endIcon={<Google />} color="secondary" onClick={() => { logout(); } }>
          {currentEmail}
        </Button>
        }
      </div>
    );
}))