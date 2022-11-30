import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";


const reviewStyle = StyleSheet.create({
    user: {
        flexDirection: "row"
    },
    userIcon: {
        width: 30,
        height: 30
    },
    username: {
        color: "#FFFFFF",
        fontSize: 20,
        marginLeft: 10
    },
    comment: {
        color: "#A9ABB8",
        marginTop: 10,
        marginBottom: 30
    }
})

const ratingStyle = StyleSheet.create({
    starBar: {
        flexDirection: "row",
        marginTop: 10
    },
    star: {
        width: 20,
        height: 20
    }
})

const Rating = ({ rating }) => {

    const filledStar = "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png"
    const emptyStar = "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png"
    const maxRating = [1, 2, 3, 4, 5]

    return (
        <View style={ratingStyle.starBar}>
            {maxRating.map(star => {
                return (
                    <Image key={star} style={ratingStyle.star} source={star <= rating ? { uri: filledStar } : { uri: emptyStar }} />
                )
            })}
        </View>
    )
}

const SingleReview = ({ review }) => {

    return (
        <View>
            <View style={reviewStyle.user} testID="singleReviewContainer">
                <Image style={reviewStyle.userIcon} source={{ uri: "https://cdn-icons-png.flaticon.com/128/2102/2102633.png" }} />
                <Text style={reviewStyle.username}>{review[1]}</Text>
            </View>
            <Rating rating={review[2]} />
            <Text style={reviewStyle.comment}>{review[3]}</Text>
        </View>
    )
}

export default SingleReview