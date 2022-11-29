import { useContext, useEffect, useState } from "react"
import { Text, View, StyleSheet, Image } from "react-native"
import axios from "axios"
import * as Device from "expo-device"
import ReviewForm from "./ReviewForm"
import UserContext from "../contexts/userStorageContext"

const reviewStyle = StyleSheet.create({
    container: {
        backgroundColor: "#1C1C1C",
        width: 350,
        alignSelf: 'center',
        borderRadius: 20,
        padding: 25,
        marginTop: 30
    },
    title: {
        color: "#FFFFFF",
        fontSize: 20,
        marginBottom: 20
    },
    disclaimer: {
        color: "#A9ABB8",
        alignItems: "center"
    },
    review: {
        backgroundColor: "#2B2F3E",
        padding: 15,
        borderRadius: 20,
        marginTop: 30
    },
    user: {
        flexDirection: "row"
    },
    username: {
        color: "#FFFFFF",
        fontSize: 20,
        marginLeft: 10
    },
    userIcon: {
        width: 30,
        height: 30
    }
})

const MangaReview = ({ id }) => {

    const [reviews, setReviews] = useState([])
    const [user] = useContext(UserContext)

    const getReviews = async (idManga) => {

        const { data } = await axios({
            method: "get",
            //Si se conecta un dispositivo móvil se conecta por medio de un tunel con ngrok (ngrok 5142)
            url: Device.osName == "Windows" ? "http://localhost:5142/api/sendDataMovil" : "https://7923-2800-e2-8880-1c2f-1572-df45-c023-f4b.ngrok.io/api/sendDataMovil",
            params: {
                idManga
            }
        })
        setReviews(data)
    }

    useEffect(() => {
        getReviews(id)
    }, [])

    console.log(reviews);
    

    return (
        <View style={reviewStyle.container}>
            <Text style={reviewStyle.title}>Reviews</Text>
            {reviews
                ? null
                : <><Text style={reviewStyle.disclaimer}>There are no reviews for this manga yet</Text><Text style={reviewStyle.disclaimer}>be the first!</Text></>}
            {user
                ? <View style={reviewStyle.review}>
                    <View style={reviewStyle.user}>
                        <Image style={reviewStyle.userIcon} source={{ uri: "https://cdn-icons-png.flaticon.com/128/2102/2102633.png" }} />
                        <Text style={reviewStyle.username}>{user}{'\n'}</Text>
                    </View>
                    <ReviewForm id={id}/>
                </View>
                : <Text style={reviewStyle.disclaimer}>{'\n\nYou have to be logged in to make a review'}</Text>}
        </View>
    )
}

export default MangaReview