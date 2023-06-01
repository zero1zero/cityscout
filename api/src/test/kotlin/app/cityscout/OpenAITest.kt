package app.cityscout

import app.cityscout.core.OpenAI
import app.cityscout.model.Criterion
import kotlinx.coroutines.runBlocking
import org.junit.Test
import kotlin.test.assertEquals

class OpenAITest {

    val openAI = OpenAI()

    @Test
    fun testOpenAI() {

        val criterion = Criterion(listOf(
            "has cafes",
            "good bars",
            "close to nature",
            "left leaning but not too left",
            "has job opportunities",
            "has a baseball team")
        )

        runBlocking {
            val go = openAI.go(criterion.criterion)
            println(go)
            assertEquals(3, go.size)
        }
    }
}