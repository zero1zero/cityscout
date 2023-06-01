package app.cityscout.core

import app.cityscout.model.Cities
import app.cityscout.model.City
import com.aallam.openai.api.BetaOpenAI
import com.aallam.openai.api.chat.ChatCompletionRequest
import com.aallam.openai.api.chat.ChatMessage
import com.aallam.openai.api.chat.ChatRole
import com.aallam.openai.api.http.Timeout
import com.aallam.openai.api.model.ModelId
import com.aallam.openai.client.OpenAI
import com.aallam.openai.client.OpenAIConfig
import kotlin.time.Duration

const val special = "⁜"

class OpenAI {

    private val openAI = OpenAI(OpenAIConfig("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", timeout = Timeout(
        Duration.INFINITE)))

    data class CityAndReason(
        val city: String,
        val reason: String
    )

    @OptIn(BetaOpenAI::class)
    suspend fun go(criterion : List<String>): List<CityAndReason> {
        val content = "List 3 cities that match all these attributes: \n" + criterion.joinToString("\n") + ". Give 1 paragraph reasoning for each."

        print(content)

        val modelId = ModelId("gpt-3.5-turbo")
        val messages = listOf(ChatMessage(ChatRole.User, content))
        val chatRequest = ChatCompletionRequest(
            modelId, messages, .6
        )

        val completion = openAI.chatCompletion(chatRequest)

        val response = completion.choices[0].message?.content ?: throw RuntimeException("whatever")

        println(response)

        if (response.contains("As an AI language model")) {
            return emptyList()
        }

        val cities = response
            .replace("\n\n", "\n") //trim empty lines
            .split("\n")


        return cities.stream()
            .map { it.replace(Regex("\\d. "), "") }
            .map { it.split(" - ", ": ") }
            .map { CityAndReason(it[0], it[1]) }
            .toList()
    }
}