import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LoginView } from "./LoginView";

function OAuthRedirectWait (props:any) {

    let {accessToken, setAccessToken} = props;

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();

    const code :string|null = query.get('code');
    const scope :string|null = query.get('scope');

    const url :string = 'http://localhost:8080/login/oauth2/code/google?code=' + code + '&scope=' + scope;
    let bearerAccessToken :string|undefined ='';
    
    const redirection = async () => 
    await axios.get(
        url,
        {
            headers: {
                "Authorization" : `Bearer ${code}`,
            },
           //withCredentials: true,
        }
        ).then( (res) => {  bearerAccessToken = res.headers['authorization'];
                        setAccessToken(bearerAccessToken?.substring(7));
                        console.log(accessToken);
                        localStorage.setItem('access_token', accessToken!); 
                        console.log('localStorage' + localStorage.getItem('access_token'))
        })
    ;

    // eslint-disable-next-line
    useEffect(()=> {
        if(accessToken === ''){
           redirection() 
        }
    },[accessToken])

    return(
        <LoginView/>
    );

}
export default OAuthRedirectWait;