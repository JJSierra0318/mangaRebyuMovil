import { View, StyleSheet } from "react-native"
import { Route, Routes } from "react-router-native"
import AppBar from "./components/AppBar";
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

const Main = () => {

    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={ <MangaList /> }/>
                <Route path="/manga/:id" element={ <SingleManga /> }/>
            </Routes>
        </View>
    )
}

export default Main