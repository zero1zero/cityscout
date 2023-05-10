package app.cityscout

import app.cityscout.model.Criterion
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import kotlinx.coroutines.runBlocking
import org.junit.Test
import kotlin.test.assertEquals

class OpenAITest {

    val openAI = OpenAI()

    @Test
    fun testOpenAI() {

        val criterion = Criterion(listOf(
            "cafes",
            "bars",
            "nature",
            "liberal",
            "job opportunities",
            "baseball team")
        )

        runBlocking {
            val go = openAI.go(criterion.criterion)
            println(go)
            assertEquals(3, go.cities.size)
        }
    }
}