
import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import { adminChecker } from "../component/Rolechecker";
import { Box } from "@material-ui/core";

const  GoogleLoginTokenAndView = observer((props:any) =>{

    let {id_token, setId_token, setAdminChecker, setLogin, res} = props;

    //getting code from queryURL and issuing accesstoken
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    let bearerId_token :string|undefined ='';
    const userRoles :string|null = query.get('userRoles');
    const id : string|null = query.get('id');
    const url :string = '/login/oauth2/setter/userRoles?=' + userRoles

    const redirection = async () => 
    {
      try {
        await axios.get(
          url,
        ).then( res =>{
          localStorage.setItem('userRoles', userRoles!);
          localStorage.setItem('memberId', id!)        
        })
      }
      catch(error){
        console.error(error);    
      }
    };

    const setIdToken= async() =>{
      try {
        await axios.get(
          '/login/oauth2/setter/token/'+id
        ).then(
            res => {
            bearerId_token = res.headers['authorization'];
            setId_token(bearerId_token?.substring(7));
            localStorage.setItem('id_token', id_token);
            setLogin(true);      
            adminChecker() ? setAdminChecker(true) : setAdminChecker(false)       
            })
      } catch (error) {
        
      }
    }

    // eslint-disable-next-line
    useEffect(()=> {
        if(id_token === ''){
           redirection();
           setIdToken(); 
        } else {
            localStorage.setItem('id_token', id_token);
        }
    // eslint-disable-next-line
    },[id_token])

    return(
      
      <Box alignContent="center">
        <h2> Welcome~!</h2>
      </Box>
    );

})
export default GoogleLoginTokenAndView;