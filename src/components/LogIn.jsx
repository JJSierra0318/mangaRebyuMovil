import { useEffect, useState } from "react"
import axios from "axios"
import * as Device from "expo-device"

const LogIn = () => {

    const [user, setUser] = useState("")

    const logIn = async () => {

        const {data} = await axios({
            method: "get",
            //Si se conecta un dispositivo móvil se conecta por medio de un tunel con ngrok (ngrok 5142)
            url: Device.osName == "Windows" ? "http://localhost:5142/api/consultarIngreso" : "https://cb2b-2800-e2-8880-1c2f-4986-788b-ee72-cec5.ngrok.io/api/consultarIngreso",
            params: {
                userName: "Sierra",
                password: "321"
            }
        })
        setUser(data)
    }

    useEffect(() => {
        logIn()
    }, [])

    console.log(user);
}

export default LogIn