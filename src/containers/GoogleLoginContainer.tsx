import { Button } from "@material-ui/core";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";


export const GoogleLoginContainer = (props:any) => {
  
    let accessToken : string = '';

    const login = useGoogleLogin({
      onSuccess: codeResponse => {
        console.log(codeResponse);
          axios.get(
          `https://oauth2.googleapis.com/token?code=${codeResponse.code}&grant_type=authorization_code&redirect_uri=http://localhost:8080/login/oauth2/code/google`,
          { headers: { Authorization: 'Bearer <tokenResponse.access_token>' } }
          .then()

      )},
      flow: 'auth-code',
      ux_mode: 'redirect',
      redirect_uri : 'http://localhost:8080/login/oauth2/code/google',

      )
    }
    );
    
    return (
    <Button color="secondary" onClick={() => login()}>
      Sign in with Google 🚀{' '}
    </Button>
    );





    
    // let id :string = '';
    // const redirectFunction =(someId:string) =>{
    //     if (someId !== null) {
    //         console.log(`login success`)
    //         return redirect("/app");
    //     }
    //     return console.log('redirection Error, login fail')
    // }
    
    // return(
    //     <GoogleOAuthProvider clientId="642225847404-je5i44c2t5d6jskll3sk82nqh233ejlk.apps.googleusercontent.com">
    //         <GoogleLogin
    //                 type = "icon" 
    //                 theme="filled-blue"
    //                 size="medium"
    //                 shape="pill"
    //                 onSuccess={ async credentialResponse => {
    //                     console.log(credentialResponse);
    //                     id = await axios.post(
    //                         "/oauth2/login",
    //                         {},
    //                         {
    //                             headers: {
    //                             "Authorization" : `Bearer ${credentialResponse.credential}`,
    //                             },
    //                             withCredentials: true,
    //                         }
    //                     );

    //                     redirectFunction(id);
    //                 }
    //                 }
    //                 onError={() => {
    //                     console.log('Login Failed');
    //                 }}
    //                 {...props.children}
    //             />
    //     </GoogleOAuthProvider>
    // );
}