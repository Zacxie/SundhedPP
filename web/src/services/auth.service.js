
import axios from "axios";

const baseURL = "http://localhost:3000/rest/oauth"

class authService {

    login(user, pass){
        return axios
            .post(baseURL, {user, pass})
            .then((response) =>{
                if(response.data.accessToken){
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                console.log(response.data)
                return response.data
            })
    }

    logout(){
        localStorage.removeItem("user");
    }
}

export default new authService();