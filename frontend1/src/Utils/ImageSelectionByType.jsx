import image from '../assest/logo_blogger_40px_2x.png'
import sportsImage from '../assest/sports2.jpg'
import musicImage from '../assest/musicImage.jpg'
import foodImage from '../assest/foodImage.jpg'
import fitnessImage from '../assest/fitnessImage.jpeg'
import travelImage from '../assest/travelImage.webp'

export const sendTypeImage = (Type) => {
    if (Type == "Sports") {
        return sportsImage
    }
    else if (Type == "Music") {
        return musicImage
    }
    else if (Type == "Fitness") {
        return fitnessImage
    }
    else if (Type == "Food") {
        return foodImage
    }
    else if (Type == "Travel") {
        return travelImage
    }
    else {
        return image
    }
}