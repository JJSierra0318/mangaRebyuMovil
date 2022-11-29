import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native"
import { Route, Routes, useNavigate, useParams } from "react-router-native"
import AppBar from "./components/AppBar";
import LogIn from "./components/Login/LogIn";
import MangaList from './components/MangaList'
import SingleManga from "./components/SingleManga";
import SignUp from "./components/Signup/SignUp"
import UserContext from "./contexts/userStorageContext";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "#0E0E0E"
        //backgroundColor: '#3c096c'
    },
});

const RefreshPage = () => {

    const navigate = useNavigate()
    const id = useParams().id

    useEffect(() => {
        console.log("Success");
        navigate(`/manga/${id}`, {replace: true})
    }, [])
}

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
                    <Route path="/signup" element={<SignUp /> } />
                    <Route path="/refresh/:id" element={<RefreshPage /> } />
                </Routes>
            </UserContext.Provider>
        </View>
    )
}

export default Main