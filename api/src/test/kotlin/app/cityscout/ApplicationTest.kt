package app.cityscout

import app.cityscout.model.Criterion
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.testing.*
import kotlin.test.Test
import kotlin.test.assertEquals

class ApplicationTest {

    @Test
    fun testRoot() {
        testApplication {
            val client = createClient {
                install(ContentNegotiation) {
                    json()
                }
            }

            application {
                module()
            }

            val criterion = Criterion(listOf(
                "cafes",
                "bars",
                "nature",
                "liberal",
                "job opportunities",
                "baseball team")
            )

            client.post("/explore") {
                contentType(ContentType.Application.Json)
                accept(ContentType.Application.Json)
                setBody(criterion)
            }.apply {
                assertEquals(HttpStatusCode.OK, status)
            }
        }
    }
}
