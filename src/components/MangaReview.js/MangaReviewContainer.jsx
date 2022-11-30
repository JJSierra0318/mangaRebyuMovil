import { Text, View, StyleSheet, Image } from "react-native"
import SingleReview from "./SingleReview"

const reviewStyle = StyleSheet.create({
    title: {
        color: "#FFFFFF",
        fontSize: 20,
        marginBottom: 20
    },
    disclaimer: {
        color: "#A9ABB8",
        alignItems: "center"
    },
})

const MangaReviewContainer = ({ reviews }) => {
    return (
        <View style={reviewStyle.container} testID="reviewContainer">
            <Text style={reviewStyle.title}>Reviews</Text>
            {reviews
                ? reviews.map(review => <SingleReview review={review} key={review[0]} testID="singleReviewContainer"/>)
                : <><Text style={reviewStyle.disclaimer}>There are no reviews for this manga yet</Text><Text style={reviewStyle.disclaimer}>be the first!</Text></>}
        </View>
    )
}

export default MangaReviewContainer