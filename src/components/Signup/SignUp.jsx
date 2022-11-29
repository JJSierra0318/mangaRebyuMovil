import { Alert } from "react-native"
import UserContext from "../../contexts/userStorageContext"
import { useNavigate } from "react-router-native"
import { useContext } from "react"
import axios from "axios"
import * as Device from "expo-device"
import SignUpContainer from "./SignUpContainer"

const SignUp = () => {

    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    const signUp = async (userName, password) => {

        const url = Device.osName == "Windows" ? "http://localhost:5142/api/crearRegistro" : "https://bccc-2800-e2-8880-1c2f-955c-1201-b28b-4c1b.ngrok.io/api/crearRegistro"
         const body = {
            userName,
            password
        }

        const { data } = await axios.post(url, body)
        return data.result
    }

    const onSubmit = async ({ username, password, confirmPassword }) => {
        if (password === confirmPassword) {
            const confirmSignUp = await signUp(username, password)
            if (confirmSignUp === true) {
                setUser(username)
                navigate(`/`, { replace: true })
            }
            else onInvalidData("Username already taken")
        }
        else onInvalidData("Passwords do not match")
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
        <SignUpContainer onSubmit={onSubmit} onInvalidData={onInvalidData} />
    )
}

export default SignUp