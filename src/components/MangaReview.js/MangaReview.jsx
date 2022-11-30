import { useContext, useEffect, useState } from "react"
import axios from "axios"
import * as Device from "expo-device"
import UserContext from "../../contexts/userStorageContext"
import MangaReviewContainer from "./MangaReviewContainer"
import { StyleSheet, View } from "react-native"
import ReviewForm from "../ReviewForm"

const reviewStyle = StyleSheet.create({
    container: {
        backgroundColor: "#1C1C1C",
        width: 350,
        alignSelf: 'center',
        borderRadius: 20,
        padding: 25,
        marginTop: 30,
        paddingBottom: 0
    }
})

const MangaReview = ({ id }) => {

    const [reviews, setReviews] = useState([])
    const [user] = useContext(UserContext)

    const getReviews = async (idManga) => {

        const { data } = await axios({
            method: "get",
            //Si se conecta un dispositivo móvil se conecta por medio de un tunel con ngrok (ngrok 5142)
            url: Device.osName == "Windows" ? "http://localhost:5142/api/sendDataMovil" : "https://bccc-2800-e2-8880-1c2f-955c-1201-b28b-4c1b.ngrok.io/api/sendDataMovil",
            params: {
                idManga
            }
        })
        setReviews(data.data)
    }

    useEffect(() => {
        getReviews(id)
    }, [])

    return (
        <View style={reviewStyle.container}>
            <MangaReviewContainer reviews={reviews} user={user} id={id}/>
            <ReviewForm id={id}/>
        </View>
    )
}

export default MangaReview