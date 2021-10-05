import Axios from "axios"
import AuthUser from "../store/AuthUser";

const auth_key = "auth-account"
let auth = JSON.parse(localStorage.getItem(auth_key))
const user = auth ? auth.user : ""
const jwt = auth ? auth.jwt : ""

const api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:8000"
// const api_endpoint = "http://localhost:8000"

export default {
    isAuthen() {
        return (user !== "") && (jwt != "")
    },
    getUser() {
        return user
    },
    getJwt() {
        return jwt
    },

    async login({ email, password }) {
        try {
            let url = api_endpoint + "/api/auth/login"
            let body = {
                email: email,
                password: password
            }
            let res = await Axios.post(url, body)
            if (res.status === 200) {
                localStorage.setItem(auth_key, JSON.stringify(res.data))
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.access_token
                }
            } else {
                console.log("NOT 200", res)
            }
        } catch (e) {
            if (e.response.status === 400) {
                return {
                    success: false,
                    message: e.response.statusText,
                }
            } else {
                //422,401 ?
                console.error(e)
                console.log("ERROR  " + e.response.status + "  |  " + e.response.statusText)
                return {
                    success: false,
                    message: e.response.statusText,
                }
            }
        }
    },
}