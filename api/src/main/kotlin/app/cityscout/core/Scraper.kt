package app.cityscout.core

import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.http.*
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class Scraper {

    suspend fun getRedfinURL(city : String) : String {
        val client = HttpClient(CIO)

        val response = client.get("https://www.redfin.com/stingray/do/location-autocomplete") {
            method = HttpMethod.Get
            url {
                parameters.append("location", city)
                parameters.append("start", "0")
                parameters.append("count", "10")
                parameters.append("v", "2")
                parameters.append("al", "3")
                parameters.append("iss", "true")
                parameters.append("ooa", "true")
                parameters.append("mrs", "false")
                //market=oregon
                //mrs=false&region_id=NaN&region_type=NaN&lat=45.54271&lng=-122.65438500000002'
                //-H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br' -H 'Connection: keep-alive' -H 'Referer: https://www.redfin.com/living-in/OR/Portland/6/30772' -H 'Cookie: RF_CORVAIR_LAST_VERSION=471.2.1; RF_BROWSER_ID=32oxNEA4QX21C-1mCzN9DA; usprivacy=1---; RF_BROWSER_CAPABILITIES=%7B%22screen-size%22%3A4%2C%22events-touch%22%3Afalse%2C%22ios-app-store%22%3Afalse%2C%22google-play-store%22%3Afalse%2C%22ios-web-view%22%3Afalse%2C%22android-web-view%22%3Afalse%7D; OptanonConsent=isGpcEnabled=0&datestamp=Mon+May+22+2023+20%3A09%3A11+GMT-0700+(Pacific+Daylight+Time)&version=202304.1.0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=C0002%3A1%2CC0003%3A1%2CC0001%3A1%2CC0004%3A1%2CSPD_BG%3A1&AwaitingReconsent=false&geolocation=US%3BOR&consentId=4f5f907a-424d-454c-968d-263a36cffb7d&interactionCount=0&browserGpcFlag=0; G_ENABLED_IDPS=google; searchMode=1; sortOrder=1; sortOption=special_blend; collapsedMapView=1; userPreferences=parcels%3Dtrue%26schools%3Dfalse%26mapStyle%3Ds%26statistics%3Dtrue%26agcTooltip%3Dfalse%26agentReset%3Dfalse%26ldpRegister%3Dfalse%26afCard%3D2%26schoolType%3D0%26lastSeenLdp%3DnoSharedSearchCookie%26viewedSwipeableHomeCardsDate%3D1684811267868; OneTrustWPCCPAGoogleOptOut=false; OptanonAlertBoxClosed=2023-05-23T03:09:11.728Z; g_state={\"i_p\":1682470921807,\"i_l\":3}; save_search_nudge_flyout=3%251681866574069%25true; RF_BUSINESS_MARKET=7; RF_LISTING_VIEWS=148145924.168139293.153041654.164146512.168269734.149625404.156678976.162601884.167186327.168076488.164733973.167353785.168246160.168097880.163243617.166716230.167787572.168251974.167506344.164924303; RF_LAST_DP_SERVICE_REGION=9798; RF_LDP_VIEWS_FOR_PROMPT=%7B%22viewsData%22%3A%7B%2204-18-2023%22%3A%7B%22163243617%22%3A1%2C%22166716230%22%3A2%2C%22167787572%22%3A1%2C%22168097880%22%3A1%2C%22168251974%22%3A1%7D%7D%2C%22expiration%22%3A%222025-03-16T17%3A53%3A47.390Z%22%2C%22totalPromptedLdps%22%3A0%7D; RF_MARKET=oregon; RF_LAST_ACCESS=1681889495240%3A99a55e33b9d965b2ebdb9470518dfbedc617d798; RF_LAST_USER_ACTION=1681875379629%3A11b4784c0b6eeac918f952ae2bf829fb2a75e50b; RF_PARTY_ID=525939; RF_AUTH=3465bba593a71f1c69cb46db0b707e9378968391; RF_W_AUTH=3465bba593a71f1c69cb46db0b707e9378968391; RF_SECURE_AUTH=f176c13a522bd9a99ee95efec5989194c10af190; RF_ACCESS_LEVEL=3; RF_VISITED=true; RF_BROWSER_ID_GREAT_FIRST_VISIT_TIMESTAMP=2023-05-22T18%3A49%3A34.493338; RF_BID_UPDATED=1; ak_bmsc=7BDF0C6AF0F2271F46705FE0FA7295DF~000000000000000000000000000000~YAAQpahkaOZwJD6IAQAAarmMRhM8DeZ+OaFmJtk/PFHh3gsUaN/Rl1Ef9q0zj6FcyqLq2o6y44ljWAek9yLIcbsOHsqaGiRjQnNGBI5m4RyGdhAWZKpaDnY1ZsuYgJwHENEd2x0QbkXqi4pJGGv/3zr/I4C667b6mn5s7ZG6iUIV2h+edo70hg+CD2HSi2dx/PfpGw68wbQJ3SI5qAHwHC6WxHTLo3uKpPf95dzBh5tiBIOuGpxHohjVgPPGEnacYYDSieCZNe6N1pK4atJ8TdFOlXjXlEvsL2sOV1E71tT/UjG6R/f8oQOiu8w4PoCwX+N0VOPjZwhPOIQsGU9Zz+an3HSo7XEEuEY62Uv3loNsoOFVZ8WePsSDdWsV2C5scEmM6aKc7/vBgp4G2kaQ2CAAt3FMIKS/G/z37FdrKf7vOEFw9sc0IDscOXfwCSAIwsyE; bm_sv=1675925BECAFB50248E39FADA9A3429C~YAAQpahkaKlqJD6IAQAAg4SMRhPiAtaPztqi+CMohPwOYN0VikqDhDRfpbjgwCsF4F1z33+Fk2bKkU5YAK9092GZYnIKB7ZOYVVhlnsV7Jdzh0BIttQCnZ3cp/q2ULtFlGdtxbfJL5/XXMW8d9WDRx5rkT3vR5rsLpJZ+FQMV+UhBpnF9tTvlMWqvFG8f4whX9f37w4RWM3O6GxPh/scQiQQ55xx3Ym6S03iWxXH0LXnH6BCGB53535Q0i4ngXCUDw==~1; AKA_A2=A; bm_mi=1C893AD2F23114CE91B9605E66934B50~YAAQpahkaDVoJD6IAQAAsGWMRhNzjhMKXkxvNmJcI507iyWvUhyhdwvzjajfRp8/51JvyBGtHPRZ0jQytezkbIZg2VyvZ0hdZw6TC050e+cL4zog5vyynnKQ3HDRUAwOzFww16F/juIFCQ+EWf3/FRsVxQnnlQ6gSgpeq4PA5Ix+RB2f6yXcyQ+c+ru8zWtDiEGMzDqzgh7pbXUOoACUb5I2vqPPRu91YzvoQ4C4Ff9m0qCdqNPOb+6DQBkW1aItU7NirZ6vEWGGWjnzc7nUfyso+pynDcZybY+Abobvc4p+EcOrKuarPWA6Rxbpbep6bOVbzbgTEY1DIgzwT2qHrA465iU=~1; RF_LAST_NAV=0; FEED_COUNT=%5B%2299%2B%22%2C%22t%22%5D; unifiedLastSearch=name%3DPortland%26subName%3DPortland%252C%2520OR%252C%2520USA%26url%3D%252Fcity%252F30772%252FOR%252FPortland%26id%3D2_30772%26type%3D2%26unifiedSearchType%3D2%26isSavedSearch%3D%26countryCode%3DUS; RF_MARKET=oregon' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-origin' -H 'TE: trailers'")
                header(
                    "User-Agent",
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/113.0"
                )
            }
        }

        val resp = response.body<String>()

        val jsonRaw = resp.substring(4)

        val json = Json.parseToJsonElement(jsonRaw).jsonObject

        //todo check if success

        val url: String = json.jsonObject.get("payload")?.jsonObject?.get("exactMatch")?.jsonObject?.get("url")?.jsonPrimitive?.content
            ?: throw IllegalStateException("Can't parse Redfin for $city")

        return "https://www.redfin.com${url}"
    }

    fun getPopulation(city: String) {

    }

    fun getImage(city: String) {

//        await fetch("https://data.census.gov/api/typeahead", {
//            "credentials": "include",
//            "headers": {
//            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/113.0",
//            "Accept": "application/json, text/plain, */*",
//            "Accept-Language": "en-US,en;q=0.5",
//            "Content-Type": "application/json",
//            "Sec-Fetch-Dest": "empty",
//            "Sec-Fetch-Mode": "cors",
//            "Sec-Fetch-Site": "same-origin"
//        },
//            "referrer": "https://data.census.gov/profile/Joseph_city;_Oregon?g=010XX00US",
//            "body": "{\"request\":{\"text\":\"joseph; oregon\"}}",
//            "method": "POST",
//            "mode": "cors"
//        });

//        {
//            "response": {
//            "searchText": "joseph; oregon",
//            "options": [
//            {
//                "type": "geography",
//                "title": "Joseph city; Oregon",
//                "facets": {
//                "geography": [
//                "160XX00US4137900"
//                ]
//            }
//        }
    }
}