import { Button } from "@material-ui/core";
import { useGoogleLogin } from '@react-oauth/google';


export const GoogleLoginContainer = (props:any) => {
  
    let accessToken = props.accessToken;
    let code: string ='';

    const login = useGoogleLogin({
      onSuccess: codeResponse => {
        code = codeResponse.code
      },
      flow: 'auth-code',
      ux_mode: 'redirect',
      redirect_uri : 'http://localhost:3000/login/oauth2/code/google',
    });
    
    return (
    <Button color="secondary" onClick={() => {login()}}>
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