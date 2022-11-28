import { TextInput, View, StyleSheet, Text, Pressable, Alert } from "react-native"
import * as yup from "yup"
import { Formik } from "formik"
import UserContext from "../contexts/userStorageContext"
import { useNavigate } from "react-router-native"
import { useContext } from "react"
import axios from "axios"
import * as Device from "expo-device"

const formStyle = StyleSheet.create({
    input: {
        backgroundColor: "#1C1C1C",
        marginBottom: 10,
        marginTop: 10,
        height: 40,
        color: "#FFFFFF",
        width: 350,
        alignSelf: "center",
        borderRadius: 30,
        paddingLeft: 15
    },
    placeholder: {
        paddingLeft: 35,
        color: "#A9ABB8",
    },
    button: {
        backgroundColor: '#A9ABB8',
        alignSelf: 'center',
        alignItems: 'center',
        margin: 20,
        borderRadius: 10,
        paddingTop: 15,
        width: 250,
        height: 50
    }
})

const validationSchema = yup.object().shape({
    username: yup.string()
        .required("Username is required"),
    password: yup.string()
        .required("Password is required"),
    confirmPassword: yup.string()
        .required("Confirm Password is required")
})

const initialValues = {
    username: "",
    password: "",
    confirmPassword: ""
}

const SignUp = () => {

    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    const signUp = async (userName, password) => {

        const url = Device.osName == "Windows" ? "http://localhost:5142/api/crearRegistro" : "https://cb2b-2800-e2-8880-1c2f-4986-788b-ee72-cec5.ngrok.io/api/crearRegistro"
         const body = {
            userName,
            password
        }

        const { data } = await axios.post(url, body)
        return data.result
    }

    const onSubmit = async ({ username, password, confirmPassword }) => {
        if (password === confirmPassword) {
            const a = await signUp(username, password)
            if (a === true) {
                setUser(username)
                navigate(`/`, { replace: true })
            }
            else onInvalidData("Incorrect username or password")
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
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit, handleChange, handleBlur, values, isValid }) => (
                <View>
                    <Text style={formStyle.placeholder}>Username</Text>
                    <TextInput
                        onChangeText={handleChange('username')}
                        style={formStyle.input}
                        name="username"
                        value={values.username}
                        onBlur={handleBlur('username')}
                    />
                    <Text style={formStyle.placeholder}>Password</Text>
                    <TextInput
                        onChangeText={handleChange('password')}
                        style={formStyle.input}
                        name="password"
                        secureTextEntry={true}
                        value={values.password}
                        onBlur={handleBlur('password')}
                    />
                    <Text style={formStyle.placeholder}>Confirm Password</Text>
                    <TextInput
                        onChangeText={handleChange('confirmPassword')}
                        style={formStyle.input}
                        name="confirmPassword"
                        secureTextEntry={true}
                        value={values.confirmPassword}
                        onBlur={handleBlur('confirmPassword')}
                    />
                    <Pressable style={formStyle.button} onPress={isValid ? handleSubmit : () => onInvalidData("Both username and password are required")} title="log in">
                        <Text>Log in</Text>
                    </Pressable>
                </View>
            )}
        </Formik>
    )
}

export default SignUp