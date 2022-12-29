import autobind from "autobind-decorator";
import axios from "axios";

@autobind
class MainService {
    
    BASE_URL = 'http://localhost:8080/';

    getHelloWorld  = async () :Promise<string>  => {
        let message : string = '';
        try { 
            await axios.get(this.BASE_URL+'main').then(res => message = res.data)
        } catch (error) {
           console.error(error); 
        }
        return message;
    }
}
export default new MainService();