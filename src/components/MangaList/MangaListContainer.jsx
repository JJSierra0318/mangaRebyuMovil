import { View, FlatList, Pressable, TextInput, StyleSheet } from "react-native"
import MangaItem from "./MangaItem"

const headerStyle = StyleSheet.create({
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
    }
})

const MangaListHeader = ({ filterBy, setFilterBy }) => {
    return (
        <View>
            <TextInput
                style={headerStyle.input}
                placeholder="Search"
                value={filterBy}
                onChangeText={(value) => setFilterBy(value)}
            />
        </View>
    )
}

const MangaListContainer = ({ mangas, filterBy, setFilterBy, onSearch }) => {

    return (
        <FlatList
            data={mangas}
            ListHeaderComponent={<MangaListHeader filterBy={filterBy} setFilterBy={setFilterBy} />}
            stickyHeaderIndices={[0]}
            renderItem={({ item }) => (
                <Pressable onPress={() => onSearch(item.id)} testID="singleMangaContainer">
                    <MangaItem manga={item} />
                </Pressable>
            )}
        />
    )
}

export default MangaListContainer