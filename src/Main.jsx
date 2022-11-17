import { View, StyleSheet } from "react-native"
import { Route, Routes } from "react-router-native"
import AppBar from "./components/AppBar";
import MangaList from './components/MangaList'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      flexShrink: 1,
      backgroundColor: '#B2F7EF'
    },
  });

const Main = () => {

    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<MangaList />}/>
            </Routes>
        </View>
    )
}

export default Main