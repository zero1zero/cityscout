package app.cityscout.routes

import app.cityscout.core.CensusData
import app.cityscout.core.Images
import app.cityscout.core.OpenAI
import app.cityscout.model.Cities
import app.cityscout.model.City
import app.cityscout.model.Criterion
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.slf4j.LoggerFactory

val openAI = OpenAI()
val censusData = CensusData()
val images = Images()

fun Application.configureExplore() {
    routing {
        post("/explore") {
            val logger = LoggerFactory.getLogger(this.javaClass)

            val criterion = call.receive<Criterion>()

            val cityAndReasons = openAI.go(criterion.criterion)

            val cities = cityAndReasons.stream()
                .map {
                    val name = censusData.getCityName(it.city)
                    City(
                        name,
                        it.reason,
                        images.getCityImage(name),
                        population = censusData.getPopulation(name)
                    )
                }
                .toList()

            logger.debug(cities.toString())

            call.respond(Cities(cities))
//            val cities = dummy
//
//            cities.cities.map {
////                City(it.city, it.reason)
////                it.population = "23423234234"
//            }
//
//            Thread.sleep(2000)
//
//            call.respond(dummy)
        }
    }
}
