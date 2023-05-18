package app.cityscout.plugins

import io.ktor.server.metrics.dropwizard.*
import com.codahale.metrics.*
import io.ktor.server.plugins.callloging.*
import org.slf4j.event.*
import io.ktor.server.request.*
import io.ktor.server.application.*
import java.util.concurrent.TimeUnit

fun Application.configureMonitoring() {
//    install(DropwizardMetrics) {
//      Slf4jReporter.forRegistry(registry)
//        .outputTo(this@configureMonitoring.log)
//        .convertRatesTo(TimeUnit.SECONDS)
//        .convertDurationsTo(TimeUnit.MILLISECONDS)
//        .build()
//        .start(10, TimeUnit.SECONDS)
//    }
//    install(CallLogging) {
//        level = Level.INFO
//        filter { call -> call.request.path().startsWith("/") }
//    }
}
