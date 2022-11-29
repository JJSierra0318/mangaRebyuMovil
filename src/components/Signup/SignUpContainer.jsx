import { TextInput, View, StyleSheet, Text, Pressable } from "react-native"
import * as yup from "yup"
import { Formik } from "formik"

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
        .oneOf([yup.ref("password"), null], "Password must match")
})

const initialValues = {
    username: "",
    password: "",
    confirmPassword: ""
}

const SignUpContainer = ({ onSubmit, onInvalidData }) => {
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
                        testID="usernameField"
                    />
                    <Text style={formStyle.placeholder}>Password</Text>
                    <TextInput
                        onChangeText={handleChange('password')}
                        style={formStyle.input}
                        name="password"
                        secureTextEntry={true}
                        value={values.password}
                        onBlur={handleBlur('password')}
                        testID="passwordField"
                    />
                    <Text style={formStyle.placeholder}>Confirm Password</Text>
                    <TextInput
                        onChangeText={handleChange('confirmPassword')}
                        style={formStyle.input}
                        name="confirmPassword"
                        secureTextEntry={true}
                        value={values.confirmPassword}
                        onBlur={handleBlur('confirmPassword')}
                        testID="confirmPasswordField"
                    />
                    <Pressable style={formStyle.button} onPress={isValid ? handleSubmit : () => onInvalidData("All fields are required and passwords must match")} testID="signUpButton">
                        <Text>Log in</Text>
                    </Pressable>
                </View>
            )}
        </Formik>
    )
}

export default SignUpContainer