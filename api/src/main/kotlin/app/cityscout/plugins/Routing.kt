package app.cityscout.plugins

import io.ktor.server.application.*
import io.ktor.server.plugins.autohead.*
import io.ktor.server.resources.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    install(Resources)

    install(AutoHeadResponse)

    routing {
        get("/") {
            call.respondText("Hello World!")
        }

        // Static plugin. Try to access `/static/index.html`
//        staticResources("/static") {
//            resources("static")
//        }
    }
}
