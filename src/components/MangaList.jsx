import { useContext, useEffect, useState } from "react"
import { View, Text, FlatList, Pressable, TextInput, StyleSheet } from "react-native"
import { useNavigate } from "react-router-native"
import axios from "axios"
import MangaItem from "./MangaItem"
import { UserContext } from "../Main"

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
                onChangeText = {(value) => setFilterBy(value)}
            />
        </View>
    )
}

const MangaList = () => {

    const navigate = useNavigate()
    const [user] = useContext(UserContext)
    console.log(user)

    const [mangas, setMangas] = useState([])
    const [filterBy, setFilterBy] = useState("")
    const [page, setPage] = useState(10)

    /*const fetchMore = async (q, offset) => {
        const url = filterBy ? `https://kitsu.io/api/edge/manga?filter[text]=${q}?page[limit]=10&page[offset]=${offset}` : `https://kitsu.io/api/edge/manga?page[limit]=10&page[offset]=${offset}`
        const {data} = await axios({
            method: 'GET',
            url,
            headers: {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json"
            }
        })

        setMangas([...mangas, ...data.data])
        setPage(page + 10)
    }*/

    const getMangas = async (q) => {
        const url = filterBy ? `https://kitsu.io/api/edge/manga?filter[text]=${q}` : `https://kitsu.io/api/edge/manga`
        const {data} = await axios({
            method: 'GET',
            url,
            headers: {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json"
            }
        })

        setMangas(data.data)
    }

    useEffect(() => {
        getMangas(filterBy)
    }, [filterBy])

    if (!mangas[0]) return null

    return (
        <FlatList
            data={mangas}
            ListHeaderComponent={<MangaListHeader filterBy={filterBy} setFilterBy={setFilterBy}/>}
            stickyHeaderIndices={[0]}
            onEndReached={({ distanceFromEnd }) => distanceFromEnd < 0 ? null : null}//fetchMore(filterBy, page)}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
                <Pressable onPress={() => navigate(`manga/${item.id}`, { replace: true })}>
                    <MangaItem manga={item}/>
                </Pressable>
            )}
        />
    )
}

export default MangaList