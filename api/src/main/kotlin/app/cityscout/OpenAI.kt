package app.cityscout

import app.cityscout.model.Cities
import app.cityscout.model.City
import com.aallam.openai.api.BetaOpenAI
import com.aallam.openai.api.chat.ChatCompletionRequest
import com.aallam.openai.api.chat.ChatMessage
import com.aallam.openai.api.chat.ChatRole
import com.aallam.openai.api.model.ModelId
import com.aallam.openai.client.OpenAI
import io.ktor.server.application.*
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.util.function.Supplier
import java.util.stream.Collector

const val special = "⁜"

class OpenAI {

    private val openAI = OpenAI("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")

    @OptIn(BetaOpenAI::class)
    suspend fun go(criterion : List<String>): Cities {
        val content = "Give me 3 cities in the US that: " + criterion.joinToString(";") + ". Respond in form <city>" + special + "<a 4 sentence reason>."

        val modelId = ModelId("gpt-3.5-turbo")
        val messages = listOf(ChatMessage(ChatRole.User, content))
        val chatRequest = ChatCompletionRequest(
            modelId, messages, .2
        )

        val completion = openAI.chatCompletion(chatRequest)

        val response = completion.choices[0].message?.content ?: throw RuntimeException("whatever")

        val cities = response
            .replace("\n\n", "\n") //trim empty lines
            .split("\n")

        return Cities(cities.stream()
            .map { it.split(special) }
            .map { City(it[0], it[1], "https://media.cntraveler.com/photos/5c002d131b3466234d813837/1:1/w_1600%2Cc_limit/GettyImages-909700234.jpg") }
            .toList())
    }
}