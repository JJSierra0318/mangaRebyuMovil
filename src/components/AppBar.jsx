import { ScrollView, StyleSheet, Text, View } from "react-native"
import Constants from 'expo-constants'
import { Link } from "react-router-native"

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 5,
        backgroundColor: "#1F1F23",
        height: 75,
        flexDirection: 'row',
        padding: 15
    },
    text: {
        color: "#FFFFFF"
    }
})

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to='/'><Text style={styles.text}>Home</Text></Link>
            </ScrollView>
        </View>
    )
}

export default AppBar