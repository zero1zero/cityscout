package app.cityscout

import app.cityscout.core.Scraper
import kotlinx.coroutines.runBlocking
import org.junit.Test
import kotlin.test.assertEquals

class ScraperTest {
    @Test
    fun redfin() {
        val scraper = Scraper()

        runBlocking {
            assertEquals("https://www.redfin.com/city/30772/OR/Portland", scraper.getRedfinURL("Portland, OR"))
        }
    }
}