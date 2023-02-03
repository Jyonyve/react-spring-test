import { Button } from "@material-ui/core";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { observer } from "mobx-react";

export const GoogleLoginButtonContainer = (observer((props:any) => {
  
    let {id_token, setId_token }= props;

    //send a request for getting code
    const login = useGoogleLogin({
      onSuccess: codeResponse => {
        console.log(codeResponse.code);
      },
      flow: 'auth-code',
      ux_mode: 'redirect',
      redirect_uri : 'http://localhost:3000/login/oauth2/code/google',
    });

    const logout = (props:any) => {
      localStorage.clear()
      googleLogout()
      setId_token('')
    };

    return (
      <div>
        {!id_token ?
        <Button variant="text" size="small" color="primary" onClick={() => {login()}}>
          Sign in with Google 🚀
        </Button>
        
        : 
        <Button variant="text" size="small" color="secondary" onClick={() => {logout(props)}}>
          Sign out
        </Button>}
      </div>
    );
}))