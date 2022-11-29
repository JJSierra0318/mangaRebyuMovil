import { useContext } from "react"
import * as Device from "expo-device"
import { Alert } from "react-native"
import UserContext from "../../contexts/userStorageContext"
import { useNavigate } from "react-router-native"
import axios from "axios"
import LogInContainer from "./LogInContainer"

const LogIn = () => {

    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    const logIn = async (userName, password) => {

        const { data } = await axios({
            method: "get",
            //Si se conecta un dispositivo móvil se conecta por medio de un tunel con ngrok (ngrok 5142)
            url: Device.osName == "Windows" ? "http://localhost:5142/api/consultarIngreso" : "https://bccc-2800-e2-8880-1c2f-955c-1201-b28b-4c1b.ngrok.io/api/consultarIngreso",
            params: {
                userName,
                password
            }
        })
        return data.result
    }

    const onSubmit = async ({ username, password }) => {
        const confirmLogIn = await logIn(username, password)
        if (confirmLogIn === true) {
            setUser(username)
            navigate(`/`, { replace: true })
        }
        else onInvalidData("Incorrect username or password")
    }

    const onInvalidData = (message) =>
        Alert.alert(
            "Invalid Inputs",
            message,
            [
                {
                    text: "Ok",
                    style: "cancel"
                }
            ]
        )

    return (
        <LogInContainer onSubmit={onSubmit} onInvalidData={onInvalidData}/>
    )
}

export default LogIn