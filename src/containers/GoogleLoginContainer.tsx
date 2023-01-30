import { Button } from "@material-ui/core";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';



export const GoogleLoginContainer = (props:any) => {
  
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
        <Button color="primary" onClick={() => {login()}}>
          Sign in with Google 🚀{' '}
        </Button>
        : 
        <Button color="secondary" onClick={() => {logout(props)}}>
          Sign out
        </Button>}
      </div>
    );
}