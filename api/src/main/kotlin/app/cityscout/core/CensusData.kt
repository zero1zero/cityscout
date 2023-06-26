package app.cityscout.core

import app.cityscout.model.CityName
import app.cityscout.model.Population
import app.cityscout.model.Weather
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import org.ktorm.database.Database
import org.ktorm.database.asIterable
import org.ktorm.dsl.*
import org.ktorm.schema.Column
import org.ktorm.schema.Table
import org.ktorm.schema.int
import org.ktorm.schema.varchar
import org.ktorm.support.sqlite.SQLiteDialect
import org.slf4j.LoggerFactory
import java.io.File
import java.math.BigDecimal
import java.sql.ResultSet

object CityBase : Table<Nothing>("all") {
    val long_name = varchar("NAME").primaryKey()
    val state_id = int("state")
    val place_id = int("place")
    val city = varchar("city")
    val state = varchar("state_name")
    val slug = varchar("slug")
    val abbr = varchar("abbr")
    val lat = int("lat")
    val lon = int("lon")
}

class CensusData {

    private val logger = LoggerFactory.getLogger(this.javaClass)

    private val sqlite = System.getenv().getOrDefault("CITIES_FILE", "${File(".").absolutePath}./data/census/data/all.sqlite")

    private val database: Database = Database.connect(
        url = "jdbc:sqlite://${sqlite}",
        driver = "org.sqlite.JDBC",
        dialect = SQLiteDialect()
    )

    fun getCityName(longName: String): CityName {
        val split = longName.split(", ")
        val city = split[0].trim()
        val state = split[1].trim()
        //long version of state
        val stateCol = if (state.length > 2) CityBase.state else CityBase.abbr

        return try {
            tryQueryCityName(stateCol, state, city)
        } catch (e: NoSuchElementException) {
            logger.warn("Bad city name: $longName")
            tryQueryCityName(stateCol, state, "$city City")
        }
    }

    private fun tryQueryCityName(stateCol: Column<String>, state: String, city: String): CityName {
        return database.from(CityBase)
            .select(CityBase.city, CityBase.state, CityBase.abbr, CityBase.slug)
            .where((stateCol eq state) and (CityBase.city eq city))
            .map { CityName(it[CityBase.city]!!, it[CityBase.state]!!, it[CityBase.abbr]!!, it[CityBase.slug]!!) }
            .first()
    }

    fun change(oldValue: Number, newValue: Number): BigDecimal {
        if (oldValue == 0) {
            return BigDecimal(-1)
        }
        val change = newValue.toDouble() - oldValue.toDouble()
        return BigDecimal((change / oldValue.toDouble()) * 100.0)
    }

    val mapPopulation = fun(row: ResultSet): Population {
        return Population(
            all = row.getLong("2021-population-total"),
            all_change = change(
                row.getInt("2019-population-total"),
                row.getInt("2021-population-total")
            ),

            median_age = row.getLong("2019-median-age-median-age-total"),
            median_age_change = change(
                row.getInt("2019-median-age-median-age-total"),
                row.getInt("2021-median-age-median-age-total")
            ),

            poverty_rate = BigDecimal(
                row.getDouble("2021-poverty-level-total-income-in-the-past-12-months-below-poverty-level")
                        / row.getDouble("2021-poverty-level-total")
            ),
            poverty_rate_change = change(
                row.getInt("2019-poverty-level-total-income-in-the-past-12-months-below-poverty-level"),
                row.getInt("2021-poverty-level-total-income-in-the-past-12-months-below-poverty-level")
            ),

            unemployment_rate = BigDecimal(
                row.getDouble("2021-unemployed-total-in-labor-force-civilian-labor-force-unemployed")
                        / row.getDouble("2021-unemployed-total-in-labor-force-civilian-labor-force")
            ),
            unemployment_rate_change = change(
                row.getBigDecimal("2019-unemployed-total-in-labor-force-civilian-labor-force-unemployed"),
                row.getBigDecimal("2021-unemployed-total-in-labor-force-civilian-labor-force-unemployed")
            ),

            median_income = row.getLong("2021-income-total"),
            median_income_change = change(
                row.getLong("2019-income-total"),
                row.getLong("2021-income-total")
            ),

            median_home_price = row.getLong("2021-median-home-value-median-value-total"),
            median_home_price_change = change(
                row.getLong("2019-median-home-value-median-value-total"),
                row.getLong("2021-median-home-value-median-value-total")
            ),

            median_rent_price = row.getLong("2021-median-rent-median-gross-rent"),
            median_rent_price_change = change(
                row.getLong("2019-median-rent-median-gross-rent"),
                row.getLong("2021-median-rent-median-gross-rent")
            ),

            occupations = listOf(
                Population.Occupation(
                    "Agriculture, forestry, fishing and hunting, and mining",
                    row.getLong("2021-occupation-total-agriculture-forestry-fishing-and-hunting-and-mining")
                ),
                Population.Occupation(
                    "Construction",
                    row.getLong("2021-occupation-total-construction")
                ),
                Population.Occupation(
                    "Manufacturing",
                    row.getLong("2021-occupation-total-manufacturing")
                ),
                Population.Occupation(
                    "Wholesale",
                    row.getLong("2021-occupation-total-wholesale-trade")
                ),
                Population.Occupation(
                    "Retail",
                    row.getLong("2021-occupation-total-retail-trade")
                ),
                Population.Occupation(
                    "Transportation and warehousing, and utilities",
                    row.getLong("2021-occupation-total-transportation-and-warehousing-and-utilities")
                ),
                Population.Occupation(
                    "Information",
                    row.getLong("2021-occupation-total-information")
                ),
                Population.Occupation(
                    "Finance and insurance, and real estate, and rental and leasing",
                    row.getLong("2021-occupation-total-finance-and-insurance-and-real-estate-and-rental-and-leasing")
                ),
                Population.Occupation(
                    "Professional, scientific, and management, and administrative, and waste management services",
                    row.getLong("2021-occupation-total-professional-scientific-and-management-and-administrative-and-waste-management-services")
                ),
                Population.Occupation(
                    "Educational services, and health care and social assistance",
                    row.getLong("2021-occupation-total-educational-services-and-health-care-and-social-assistance")
                ),
                Population.Occupation(
                    "Arts, entertainment, and recreation, and accommodation and food services",
                    row.getLong("2021-occupation-total-arts-entertainment-and-recreation-and-accommodation-and-food-services")
                ),
                Population.Occupation(
                    "Other services, except public administration",
                    row.getLong("2021-occupation-total-other-services-except-public-administration")
                ),
                Population.Occupation(
                    "Public administration",
                    row.getLong("2021-occupation-total-public-administration")
                ),
                Population.Occupation(
                    "Management, business, science, and arts occupations",
                    row.getLong("2021-occupation-total-management-business-science-and-arts-occupations")
                ),
            ),
            occupation_all = row.getLong("2021-occupation-total"),
            commute = listOf(
                Population.Commute(
                    "Drove Alone",
                    row.getLong("2021-commute-total-car-truck-or-van-drove-alone")
                ),
                Population.Commute(
                    "Carpool",
                    row.getLong("2021-commute-total-car-truck-or-van-carpooled")
                ),
                Population.Commute(
                    "Public Transport",
                    row.getLong("2021-commute-total-public-transportation-(excluding-taxicab)")
                ),
                Population.Commute(
                    "Walked",
                    row.getLong("2021-commute-total-walked")
                ),
                Population.Commute(
                    "Biked",
                    row.getLong("2021-commute-total-bicycle")
                ),
                Population.Commute(
                    "WFH",
                    row.getLong("2021-commute-total-worked-from-home")
                ),
                Population.Commute(
                    "Other",
                    row.getLong("2021-commute-total-taxicab-motorcycle-or-other-means")
                ),
            ),
            commute_all = row.getLong("2021-commute-total"),
            ages = Population.Ages(
                male = row.getLong("2021-population-total-male"),
                male_under_18 = row.getLong("2021-population-total-male-under-5-years") +
                        row.getLong("2021-population-total-male-5-to-9-years") +
                        row.getLong("2021-population-total-male-10-to-14-years") +
                        row.getLong("2021-population-total-male-15-to-17-years"),
                male_18_to_24 = row.getLong("2021-population-total-male-18-and-19-years") +
                        row.getLong("2021-population-total-male-20-years") +
                        row.getLong("2021-population-total-male-21-years") +
                        row.getLong("2021-population-total-male-22-to-24-years"),
                male_25_to_29 = row.getLong("2021-population-total-male-25-to-29-years"),
                male_30_to_39 = row.getLong("2021-population-total-male-30-to-34-years") +
                        row.getLong("2021-population-total-male-35-to-39-years"),
                male_40_to_49 = row.getLong("2021-population-total-male-40-to-44-years") +
                        row.getLong("2021-population-total-male-45-to-49-years"),
                male_50_to_59 = row.getLong("2021-population-total-male-50-to-54-years") +
                        row.getLong("2021-population-total-male-55-to-59-years"),
                male_60_and_over = row.getLong("2021-population-total-male-60-and-61-years") +
                        row.getLong("2021-population-total-male-62-to-64-years") +
                        row.getLong("2021-population-total-male-65-and-66-years") +
                        row.getLong("2021-population-total-male-67-to-69-years") +
                        row.getLong("2021-population-total-male-70-to-74-years") +
                        row.getLong("2021-population-total-male-75-to-79-years") +
                        row.getLong("2021-population-total-male-80-to-84-years") +
                        row.getLong("2021-population-total-male-85-years-and-over"),

                female = row.getLong("2021-population-total-female"),
                female_under_18 = row.getLong("2021-population-total-female-under-5-years") +
                        row.getLong("2021-population-total-female-5-to-9-years") +
                        row.getLong("2021-population-total-female-10-to-14-years") +
                        row.getLong("2021-population-total-female-15-to-17-years"),
                female_18_to_24 = row.getLong("2021-population-total-female-18-and-19-years") +
                        row.getLong("2021-population-total-female-20-years") +
                        row.getLong("2021-population-total-female-21-years") +
                        row.getLong("2021-population-total-female-22-to-24-years"),
                female_25_to_29 = row.getLong("2021-population-total-female-25-to-29-years"),
                female_30_to_39 = row.getLong("2021-population-total-female-30-to-34-years") +
                        row.getLong("2021-population-total-female-35-to-39-years"),
                female_40_to_49 = row.getLong("2021-population-total-female-40-to-44-years") +
                        row.getLong("2021-population-total-female-45-to-49-years"),
                female_50_to_59 = row.getLong("2021-population-total-female-50-to-54-years") +
                        row.getLong("2021-population-total-female-55-to-59-years"),
                female_60_and_over = row.getLong("2021-population-total-female-60-and-61-years") +
                        row.getLong("2021-population-total-female-62-to-64-years") +
                        row.getLong("2021-population-total-female-65-and-66-years") +
                        row.getLong("2021-population-total-female-67-to-69-years") +
                        row.getLong("2021-population-total-female-70-to-74-years") +
                        row.getLong("2021-population-total-female-75-to-79-years") +
                        row.getLong("2021-population-total-female-80-to-84-years") +
                        row.getLong("2021-population-total-female-85-years-and-over"),
            )
        )
    }

    val mapWeather = fun(row: ResultSet): Weather {
        val monthlyMeans = Json.parseToJsonElement(row.getString("monthly-means")).jsonObject
        return Weather(

            days_of_sun = row.getLong("days-of-sun"),
            temp_high = row.getBigDecimal("high-temp"),
            temp_low = row.getBigDecimal("low-temp"),
            temp_mean = row.getBigDecimal("mean-temp"),
            snow_inches = row.getBigDecimal("snow-inches"),
            rain_inches = row.getBigDecimal("rain-inches"),
            monthly_means = Weather.Monthly_means(
                month = monthlyMeans["month"]!!.jsonObject.values.map { it.jsonPrimitive.content }.toList(),
                temperature_2m_mean = monthlyMeans["temperature_2m_mean"]!!.jsonObject.values.map { it.jsonPrimitive.content }
                    .toList(),
                temperature_2m_max = monthlyMeans["temperature_2m_max"]!!.jsonObject.values.map { it.jsonPrimitive.content }
                    .toList(),
                temperature_2m_min = monthlyMeans["temperature_2m_min"]!!.jsonObject.values.map { it.jsonPrimitive.content }
                    .toList(),
            )
        )
    }

    data class CensusDetails(
        val lat: BigDecimal,
        val long: BigDecimal,
        val population: Population,
        val weather: Weather
    )

    fun getCensus(name: CityName): CensusDetails {
        database.useConnection { conn ->
            val sql = """
                SELECT * FROM `all` WHERE slug = ?
            """
            conn.prepareStatement(sql).use { statement ->
                statement.setString(1, name.slug)
                return statement.executeQuery().asIterable()
                    .map {
                        CensusDetails(
                            it.getBigDecimal("lat"),
                            it.getBigDecimal("lon"),
                            mapPopulation(it),
                            mapWeather(it)
                        )
                    }
                    .first()
            }
        }
    }
}