import Axios from "axios"
const api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000"


export default{
    async getTeamById (id){
        try{
            let res = await Axios.get(`${api_endpoint}/api/teams/${id}`)
            return res.data
        }catch (e){
            
        }

    }
}