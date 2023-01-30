
import { LoginView } from "./LoginView";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function GoogleLoginTokenAndView (props:any) {

    let {id_token, setId_token} = props;

    //getting code from queryURL and issuing accesstoken
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();

    const code :string|null = query.get('code');
    const scope :string|null = query.get('scope');

    const url :string = 'http://localhost:8080/login/oauth2/code/google?code=' + code + '&scope=' + scope;
    let bearerId_token :string|undefined ='';
    let userRoles : string[];

    const redirection = async () => 
    {
      try {
        await axios.get(
          url,
          {
              headers: {
                  "Authorization" : `Bearer ${code}`,
              },
            //withCredentials: true,
          }
        )
        .then( (res) => {  
          bearerId_token = res.headers['authorization'];
          setId_token(bearerId_token?.substring(7));
          userRoles = res.data;
          console.log(userRoles);
          localStorage.setItem('userRoles', userRoles.toString());
                      
        })
      }
      catch(error){
        console.error(error);    
      }
      return userRoles;
    };

    // eslint-disable-next-line
    useEffect(()=> {
        if(id_token === ''){
           redirection() 
        } else {
            localStorage.setItem('id_token', id_token);
            console.log(`${localStorage.getItem('userRoles')}, ${localStorage.getItem('id_token')}`)
        }
    // eslint-disable-next-line
    },[id_token])

    

    return(
        <LoginView/>
    );

}
export default GoogleLoginTokenAndView;