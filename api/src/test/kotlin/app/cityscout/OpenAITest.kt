package app.cityscout

import app.cityscout.core.CensusData
import app.cityscout.core.OpenAI
import app.cityscout.model.Criterion
import app.cityscout.routes.censusData
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.ValueSource
import kotlin.test.assertEquals
import kotlin.test.assertTrue

const val resp1 =
    """1) Portland, Oregon: This city is known for its coffee culture and has a plethora of cafes to choose from. It also has a diverse bar scene, ranging from craft beer bars to speakeasies. Portland is surrounded by natural beauty, with nearby parks and hiking trails. It has a reputation for being left-leaning, but not overwhelmingly so. It is also a hub for tech and creative industries, providing ample job opportunities. The city is home to the Portland Beavers, a minor league baseball team.

2) Denver, Colorado: Denver has a thriving coffee culture and is home to a number of independent cafes. It also has a great bar scene, with a variety of breweries, cocktail bars, and live music venues. The city is situated close to the Rocky Mountains, providing easy access to nature. Denver is known for being a liberal city, but it is not as left-leaning as some other cities. It has a strong economy and is home to a number of major corporations, providing plenty of job opportunities. The city is home to the Colorado Rockies, a Major League Baseball team.

3) Seattle, Washington: Seattle is home to a number of independent cafes, as well as the global coffee giant Starbucks. It also has a diverse bar scene, with everything from dive bars to craft cocktail bars. The city is surrounded by natural beauty, with nearby mountains and waterways. Seattle is known for being a left-leaning city, but it is not as progressive as some other cities. It is a hub for technology and has a strong job market. The city is home to the Seattle Mariners, a Major League Baseball team.
"""
const val resp2 =
    """1. Bend, Oregon: 
Bend is a city located in Central Oregon and offers easy access to hiking trails and outdoor activities. Its location near the Cascade Mountains makes it a prime spot for hiking enthusiasts. Additionally, Bend has a thriving tech industry, with companies such as G5 and Five Talent Software calling it home. The city also boasts lower taxes than Portland, making it an attractive option for those looking to save money. Bend has a lively nightlife scene, with several breweries, bars, and restaurants to choose from. Despite its growing population, Bend still maintains a small town feel, making it a great place to call home.

2. Salt Lake City, Utah:
Salt Lake City is surrounded by beautiful mountains and offers easy access to hiking trails and outdoor activities. The city is also home to several tech companies, including Adobe and Overstock.com, providing job opportunities in the industry. Utah has some of the lowest taxes in the country, making it a great option for those looking to save money. Salt Lake City has a vibrant nightlife scene, with plenty of bars, restaurants, and entertainment options. Despite being a larger city, Salt Lake City still has a small town feel, with friendly locals and a strong sense of community.

3. Asheville, North Carolina:
Asheville is located in the beautiful Blue Ridge Mountains and offers easy access to hiking trails and outdoor activities. The city has a growing tech industry, with companies such as Avadim Technologies and Linamar calling it home. North Carolina also has lower taxes than Portland, making it an attractive option for those looking to save money. Asheville has a lively nightlife scene, with several breweries, bars, and music venues to choose from. Despite being a popular tourist destination, Asheville still has a small town feel, with a strong sense of community and friendly locals.
"""

const val resp3 =
    """1. Bend, Oregon: Bend is a great city for those who love hiking, with easy access to trails like Pilot Butte and the Deschutes River Trail. It's also a hub for the tech industry, with companies like G5 and Elemental Technologies located there. Bend has lower taxes than Portland, making it a more affordable option. In addition, Bend has a great nightlife scene, with plenty of breweries and bars to choose from. Despite its growing population, Bend still maintains a small town feel, with a tight-knit community and friendly locals.

2. Salt Lake City, Utah: Salt Lake City is surrounded by beautiful mountains and offers easy access to hiking trails like Mount Olympus and Ensign Peak. It's also a hub for the tech industry, with companies like Adobe and eBay having a presence there. Salt Lake City has lower taxes than Portland, making it a more affordable option. The city has a fun nightlife scene, with plenty of bars and clubs to choose from. Despite its size, Salt Lake City still maintains a small town feel, with a strong sense of community and friendly locals.

3. Boulder, Colorado: Boulder is surrounded by stunning natural beauty, with easy access to hiking trails like Chautauqua Park and Mount Sanitas. It's also a hub for the tech industry, with companies like Google and IBM having a presence there. Boulder has lower taxes than Portland, making it a more affordable option. The city has a vibrant nightlife scene, with plenty of bars and music venues to choose from. Despite its growing population, Boulder still maintains a small town feel, with a close-knit community and a strong focus on sustainability and outdoor living.
"""

const val resp4 =
    """1) Portland, Oregon: This city is known for its coffee culture and has a plethora of cafes to choose from. It also has a diverse bar scene, ranging from craft beer bars to speakeasies. Portland is surrounded by natural beauty, with nearby parks and hiking trails. It has a reputation for being left-leaning, but not overwhelmingly so. It is also a hub for tech and creative industries, providing ample job opportunities. The city is home to the Portland Beavers, a minor league baseball team.

2) Denver, Colorado: Denver has a thriving coffee culture and is home to a number of independent cafes. It also has a great bar scene, with a variety of breweries, cocktail bars, and live music venues. The city is situated close to the Rocky Mountains, providing easy access to nature. Denver is known for being a liberal city, but it is not as left-leaning as some other cities. It has a strong economy and is home to a number of major corporations, providing plenty of job opportunities. The city is home to the Colorado Rockies, a Major League Baseball team.

3) Seattle, Washington: Seattle is home to a number of independent cafes, as well as the global coffee giant Starbucks. It also has a diverse bar scene, with everything from dive bars to craft cocktail bars. The city is surrounded by natural beauty, with nearby mountains and waterways. Seattle is known for being a left-leaning city, but it is not as progressive as some other cities. It is a hub for technology and has a strong job market. The city is home to the Seattle Mariners, a Major League Baseball team.

"""

const val resp5 =
    """1) Marblemount, Washington: Marblemount is a small town located in the North Cascades region of Washington. It has easy access to hiking trails in the surrounding mountains and forests, including the popular Cascade Pass trail. With a population of only around 200 people, it definitely meets the criteria of having less than 500 people. The town is surrounded by fertile farmland, making it a great location for farming. It also receives less rain than Portland, with an average of 60 inches of precipitation per year compared to Portland's 43 inches.

2) Boonville, California: Boonville is a small town located in Mendocino County, California. It is surrounded by the beautiful Anderson Valley, which offers many hiking opportunities, including the famous Mendocino Coast Trail. With a population of around 1,000 people, it is slightly larger than the criteria given, but still a small town with a rural feel. The area is known for its excellent farming land, particularly for wine grapes. Boonville also receives less rain than Portland, with an average of 36 inches of precipitation per year.

3) Tiller, Oregon: Tiller is a ghost town located in Douglas County, Oregon. While it technically has a population of 0, it was once a small town with around 200 residents. Tiller is located in the Umpqua National Forest, making it an ideal location for hiking and outdoor recreation. The surrounding area is also known for its fertile farmland, particularly for timber and Christmas trees. Tiller receives less rain than Portland, with an average of 29 inches of precipitation per year. While Tiller may not currently have any residents, it still meets the criteria given and could potentially be a great location for someone looking for a rural lifestyle with easy access to outdoor recreation.

"""

const val resp6 =
    """
1. Seattle, WA - With a population of over 750,000, Seattle is a bustling city that offers easy access to hiking in the nearby Cascade and Olympic mountain ranges. The city is also home to many tech companies such as Amazon, Microsoft, and Boeing, providing ample job opportunities in the tech industry. Compared to Portland, Seattle has slightly lower taxes and a similar fun nightlife scene with a variety of bars, clubs, and restaurants.

2. Denver, CO - Denver has a population of around 727,000 and is surrounded by beautiful mountains perfect for hiking. The city also has a thriving tech industry, with companies such as Google, IBM, and Oracle having a presence there. Denver has lower taxes than Portland and a fun nightlife scene with a variety of bars, breweries, and music venues.

3. Austin, TX - Austin has a population of over 950,000 and is known for its outdoor recreation opportunities, including hiking in nearby parks and green spaces. The city is also home to many tech companies, including Dell, IBM, and Apple, providing ample job opportunities in the tech industry. Compared to Portland, Austin has significantly lower taxes and a vibrant nightlife scene with live music, bars, and restaurants.
        
"""

//const val resp7 =
//    """
//1) Medford, Oregon - With a population of over 82,000, Medford meets the population requirement. It also has lower taxes than Portland, making it a more affordable option. The city is known for its conservative-leaning community and is located on the west coast. Medford has a small-town feel with a charming downtown area and plenty of outdoor activities nearby, including the nearby mountains of the Cascade Range.
//
//2) Redding, California - Redding has a population of over 90,000 and has lower taxes than Portland. It is also known for its conservative-leaning community and is located on the west coast. The city has a small-town feel with a historic downtown area and easy access to outdoor activities, including the nearby mountains of the Trinity Alps.
//
//3) Coeur d'Alene, Idaho - While not technically on the west coast, Coeur d'Alene is located near the border of Washington state and has a population of over 50,000. It has lower taxes than Portland and is known for its conservative-leaning community. The city has a charming downtown area and plenty of outdoor activities nearby, including the nearby mountains of the Idaho Panhandle National Forest. Despite its growing population, Coeur d'Alene still maintains a small-town feel.
//
//"""

class OpenAITest {

    val openAI = OpenAI()

    @Test
    fun testOpenAI() {

        val criterion = Criterion(
            listOf(
                "has cafes",
                "good bars",
                "close to nature",
                "left leaning but not too left",
                "has job opportunities",
                "has a baseball team"
            )
        )

        runBlocking {
            val go = openAI.go(criterion.criterion)
            println(go)
            assertEquals(3, go.size)
        }
    }

//    @Test
    fun testSmallTown() {

        val criterion = Criterion(
            listOf(
                "less rain than portland",
                "less than 500 people",
                "good farming land",
                "easy access to hiking"
            )
        )

        runBlocking {
            val go = openAI.go(criterion.criterion)
            println(go)
            assertEquals(3, go.size)
        }
    }

    @ParameterizedTest
    @ValueSource(strings = arrayOf(resp1, resp2, resp3, resp4, resp5, resp6))
    fun parseReply(reply: String) {

        val parsed = openAI.parseReply(reply)

        assertEquals(3, parsed.size)
        for (city in parsed) {
            assertTrue(city.city != "")
            assertTrue(city.city.contains(","))
            assertTrue(city.reason != "")
        }

        parsed.stream()
            .map {
                val name = censusData.getCityName(it.city)
                val census = censusData.getCensus(name)

                print(census)
            }
    }
}