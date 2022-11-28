import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import Constants from 'expo-constants'
import { Link } from "react-router-native"
import { useContext } from "react"
import UserContext from "../contexts/userStorageContext"

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 5,
        height: 75,
        flexDirection: 'row',
        padding: 15,
        marginTop: 10
    },
    text: {
        color: "#FFFFFF",
        paddingRight: 20,
    }
})

const AppBar = () => {

    const [user, setUser] = useContext(UserContext)

    const onLogout = () => {
        setUser("")
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to='/'><Text style={styles.text}>Home</Text></Link>
                {user 
                ? <Pressable onPress={onLogout}><Text style={styles.text}>Log Out</Text></Pressable>
                : <>
                    <Link to="/login"><Text style={styles.text}>Log In</Text></Link>
                    <Link to="/signup"><Text style={styles.text}>Sign Up</Text></Link>
                </>}
            </ScrollView>
        </View>
    )
}

export default AppBar