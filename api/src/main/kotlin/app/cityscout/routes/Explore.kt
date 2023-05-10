package app.cityscout.routes

import app.cityscout.OpenAI
import app.cityscout.model.Cities
import app.cityscout.model.City
import app.cityscout.model.Criterion
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

val openAI = OpenAI()


val dummy = Cities(listOf(
    City("Portland, OR",
        "Portland is known for its abundance of cafes and bars, as well as its liberal culture and access to nature with nearby parks and hiking trails. The city also offers a variety of job opportunities, particularly in the tech industry. Additionally, Portland is home to the Portland Trail Blazers basketball team.",
        "https://media.cntraveler.com/photos/5c002d131b3466234d813837/1:1/w_1600%2Cc_limit/GettyImages-909700234.jpg"),

    City("Seattle, WA",
        "Seattle is a city with a thriving coffee culture and a plethora of bars and breweries. It is also known for its progressive politics and access to nature with nearby mountains and waterways. The city offers a diverse range of job opportunities, particularly in the tech industry. Additionally, Seattle is home to the Seattle Mariners baseball team.",
        "https://images.pexels.com/photos/3964406/pexels-photo-3964406.jpeg"),
    City("San Francisco",
        "San Francisco is a city with a vibrant cafe and bar scene, as well as a reputation for being one of the most liberal cities in the US. It is surrounded by natural beauty, including the Golden Gate Park and nearby beaches. The city offers a variety of job opportunities, particularly in the tech industry. Additionally, San Francisco is home to the San Francisco Giants baseball team.",
        "https://images.pexels.com/photos/3584437/pexels-photo-3584437.jpeg")
))

fun Application.configureExplore() {
    routing {
        post("/explore") {
            val criterion = call.receive<Criterion>()

//            call.respond(openAI.go(criterion.criterion))

            Thread.sleep(2000)

            call.respond(dummy)
        }
    }
}
