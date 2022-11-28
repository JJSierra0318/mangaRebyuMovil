import { createContext, useState } from "react";
import { View, StyleSheet } from "react-native"
import { Route, Routes } from "react-router-native"
import AppBar from "./components/AppBar";
import LogIn from "./components/LogIn";
import MangaList from './components/MangaList'
import SingleManga from "./components/SingleManga";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "#0E0E0E"
        //backgroundColor: '#3c096c'
    },
});

export const UserContext = createContext()

const Main = () => {

    const [user, setUser] = useState("")

    return (
        <View style={styles.container}>
            <UserContext.Provider value={[user, setUser]}>
                <AppBar />
                <Routes>
                    <Route path="/" element={<MangaList />} />
                    <Route path="/manga/:id" element={<SingleManga />} />
                    <Route path="/login" element={<LogIn />} />
                </Routes>
            </UserContext.Provider>
        </View>
    )
}

export default Main