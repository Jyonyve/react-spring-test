import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LoginView } from "./LoginView";

function GoogleLoginTokenAndView (props:any) {

    let {id_token, setId_token} = props;

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();

    const code :string|null = query.get('code');
    const scope :string|null = query.get('scope');

    const url :string = 'http://localhost:8080/login/oauth2/code/google?code=' + code + '&scope=' + scope;
    let bearerId_token :string|undefined ='';
    
    const redirection = async () => 
    await axios.get(
        url,
        {
            headers: {
                "Authorization" : `Bearer ${code}`,
            },
           //withCredentials: true,
        }
        ).then( (res) => {  bearerId_token = res.headers['authorization'];
                        console.log(bearerId_token);
                        setId_token(bearerId_token?.substring(7));
        })
    ;

    // eslint-disable-next-line
    useEffect(()=> {
        if(id_token === ''){
           redirection() 
        } else {
            localStorage.setItem('id_token', id_token); 
            console.log('localStorage saved id_token : ' + localStorage.getItem('id_token'))
        }
    },[id_token])

    return(
        <LoginView/>
    );

}
export default GoogleLoginTokenAndView;