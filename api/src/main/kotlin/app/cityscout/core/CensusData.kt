package app.cityscout.core

import app.cityscout.model.CityName
import app.cityscout.model.Population
import org.ktorm.database.Database
import org.ktorm.dsl.*
import org.ktorm.schema.Column
import org.ktorm.schema.Table
import org.ktorm.schema.int
import org.ktorm.schema.varchar
import org.slf4j.LoggerFactory
import java.io.File
import java.util.NoSuchElementException

/**
 * CREATE TABLE [Cities] (
 * 	[NAME] text,
 * 	[state] integer,
 * 	[place] integer,
 * 	[city] text,
 * 	[state_name] text,
 * 	[abbr] text,
 * 	[population-total] integer,
 * 	[population-total-male] integer,
 * 	[population-total-male-under-5-years] integer,
 * 	[population-total-male-5-to-9-years] integer,
 * 	[population-total-male-10-to-14-years] integer,
 * 	[population-total-male-15-to-17-years] integer,
 * 	[population-total-male-18-and-19-years] integer,
 * 	[population-total-male-20-years] integer,
 * 	[population-total-male-21-years] integer,
 * 	[population-total-male-22-to-24-years] integer,
 * 	[population-total-male-25-to-29-years] integer,
 * 	[population-total-male-30-to-34-years] integer,
 * 	[population-total-male-35-to-39-years] integer,
 * 	[population-total-male-40-to-44-years] integer,
 * 	[population-total-male-45-to-49-years] integer,
 * 	[population-total-male-50-to-54-years] integer,
 * 	[population-total-male-55-to-59-years] integer,
 * 	[population-total-male-60-and-61-years] integer,
 * 	[population-total-male-62-to-64-years] integer,
 * 	[population-total-male-65-and-66-years] integer,
 * 	[population-total-male-67-to-69-years] integer,
 * 	[population-total-male-70-to-74-years] integer,
 * 	[population-total-male-75-to-79-years] integer,
 * 	[population-total-male-80-to-84-years] integer,
 * 	[population-total-male-85-years-and-over] integer,
 * 	[population-total-female] integer,
 * 	[population-total-female-under-5-years] integer,
 * 	[population-total-female-5-to-9-years] integer,
 * 	[population-total-female-10-to-14-years] integer,
 * 	[population-total-female-15-to-17-years] integer,
 * 	[population-total-female-18-and-19-years] integer,
 * 	[population-total-female-20-years] integer,
 * 	[population-total-female-21-years] integer,
 * 	[population-total-female-22-to-24-years] integer,
 * 	[population-total-female-25-to-29-years] integer,
 * 	[population-total-female-30-to-34-years] integer,
 * 	[population-total-female-35-to-39-years] integer,
 * 	[population-total-female-40-to-44-years] integer,
 * 	[population-total-female-45-to-49-years] integer,
 * 	[population-total-female-50-to-54-years] integer,
 * 	[population-total-female-55-to-59-years] integer,
 * 	[population-total-female-60-and-61-years] integer,
 * 	[population-total-female-62-to-64-years] integer,
 * 	[population-total-female-65-and-66-years] integer,
 * 	[population-total-female-67-to-69-years] integer,
 * 	[population-total-female-70-to-74-years] integer,
 * 	[population-total-female-75-to-79-years] integer,
 * 	[population-total-female-80-to-84-years] integer,
 * 	[population-total-female-85-years-and-over] integer,
 * 	[population-geography] text,
 * 	[median-rent-by-bedrooms-median-gross-rent-total] integer,
 * 	[median-rent-by-bedrooms-median-gross-rent-total-no-bedroom] integer,
 * 	[median-rent-by-bedrooms-median-gross-rent-total-1-bedroom] integer,
 * 	[median-rent-by-bedrooms-median-gross-rent-total-2-bedrooms] integer,
 * 	[median-rent-by-bedrooms-median-gross-rent-total-3-bedrooms] integer,
 * 	[median-rent-by-bedrooms-median-gross-rent-total-4-bedrooms] integer,
 * 	[median-rent-by-bedrooms-median-gross-rent-total-5-or-more-bedrooms] integer,
 * 	[median-rent-by-bedrooms-geography] text,
 * 	[price-asked-home-value-total] integer,
 * 	[price-asked-home-value-total-less-than-$10,000] integer,
 * 	[price-asked-home-value-total-$10,000-to-$14,999] integer,
 * 	[price-asked-home-value-total-$15,000-to-$19,999] integer,
 * 	[price-asked-home-value-total-$20,000-to-$24,999] integer,
 * 	[price-asked-home-value-total-$25,000-to-$29,999] integer,
 * 	[price-asked-home-value-total-$30,000-to-$34,999] integer,
 * 	[price-asked-home-value-total-$35,000-to-$39,999] integer,
 * 	[price-asked-home-value-total-$40,000-to-$49,999] integer,
 * 	[price-asked-home-value-total-$50,000-to-$59,999] integer,
 * 	[price-asked-home-value-total-$60,000-to-$69,999] integer,
 * 	[price-asked-home-value-total-$70,000-to-$79,999] integer,
 * 	[price-asked-home-value-total-$80,000-to-$89,999] integer,
 * 	[price-asked-home-value-total-$90,000-to-$99,999] integer,
 * 	[price-asked-home-value-total-$100,000-to-$124,999] integer,
 * 	[price-asked-home-value-total-$125,000-to-$149,999] integer,
 * 	[price-asked-home-value-total-$150,000-to-$174,999] integer,
 * 	[price-asked-home-value-total-$175,000-to-$199,999] integer,
 * 	[price-asked-home-value-total-$200,000-to-$249,999] integer,
 * 	[price-asked-home-value-total-$250,000-to-$299,999] integer,
 * 	[price-asked-home-value-total-$300,000-to-$399,999] integer,
 * 	[price-asked-home-value-total-$400,000-to-$499,999] integer,
 * 	[price-asked-home-value-total-$500,000-to-$749,999] integer,
 * 	[price-asked-home-value-total-$750,000-to-$999,999] integer,
 * 	[price-asked-home-value-total-$1,000,000-to-$1,499,999] integer,
 * 	[price-asked-home-value-total-$1,500,000-to-$1,999,999] integer,
 * 	[price-asked-home-value-total-$2,000,000-or-more] integer,
 * 	[price-asked-home-value-geography] text
 * )
 */
object Cities : Table<Nothing>("all") {
    val long_name = varchar("NAME").primaryKey()
    val state_id = int("state")
    val place_id = int("place")
    val city = varchar("city")
    val state = varchar("state_name")
    val slug = varchar("slug")
    val abbr = varchar("abbr")

    val populationTotal = int("population-total")
    val populationTotalMale = int("population-total-male")
    val populationTotalMaleUnder5Years = int("population-total-male-under-5-years")
    val populationTotalMale5To9Years = int("population-total-male-5-to-9-years")
    val populationTotalMale10To14Years = int("population-total-male-10-to-14-years")
    val populationTotalMale15To17Years = int("population-total-male-15-to-17-years")
    val populationTotalMale18And19Years = int("population-total-male-18-and-19-years")
    val populationTotalMale20Years = int("population-total-male-20-years")
    val populationTotalMale21Years = int("population-total-male-21-years")
    val populationTotalMale22To24Years = int("population-total-male-22-to-24-years")
    val populationTotalMale25To29Years = int("population-total-male-25-to-29-years")
    val populationTotalMale30To34Years = int("population-total-male-30-to-34-years")
    val populationTotalMale35To39Years = int("population-total-male-35-to-39-years")
    val populationTotalMale40To44Years = int("population-total-male-40-to-44-years")
    val populationTotalMale45To49Years = int("population-total-male-45-to-49-years")
    val populationTotalMale50To54Years = int("population-total-male-50-to-54-years")
    val populationTotalMale55To59Years = int("population-total-male-55-to-59-years")
    val populationTotalMale60And61Years = int("population-total-male-60-and-61-years")
    val populationTotalMale62To64Years = int("population-total-male-62-to-64-years")
    val populationTotalMale65And66Years = int("population-total-male-65-and-66-years")
    val populationTotalMale67To69Years = int("population-total-male-67-to-69-years")
    val populationTotalMale70To74Years = int("population-total-male-70-to-74-years")
    val populationTotalMale75To79Years = int("population-total-male-75-to-79-years")
    val populationTotalMale80To84Years = int("population-total-male-80-to-84-years")
    val populationTotalMale85YearsAndOver = int("population-total-male-85-years-and-over")
    val populationTotalFemale = int("population-total-female")
    val populationTotalFemaleUnder5Years = int("population-total-female-under-5-years")
    val populationTotalFemale5To9Years = int("population-total-female-5-to-9-years")
    val populationTotalFemale10To14Years = int("population-total-female-10-to-14-years")
    val populationTotalFemale15To17Years = int("population-total-female-15-to-17-years")
    val populationTotalFemale18And19Years = int("population-total-female-18-and-19-years")
    val populationTotalFemale20Years = int("population-total-female-20-years")
    val populationTotalFemale21Years = int("population-total-female-21-years")
    val populationTotalFemale22To24Years = int("population-total-female-22-to-24-years")
    val populationTotalFemale25To29Years = int("population-total-female-25-to-29-years")
    val populationTotalFemale30To34Years = int("population-total-female-30-to-34-years")
    val populationTotalFemale35To39Years = int("population-total-female-35-to-39-years")
    val populationTotalFemale40To44Years = int("population-total-female-40-to-44-years")
    val populationTotalFemale45To49Years = int("population-total-female-45-to-49-years")
    val populationTotalFemale50To54Years= int("population-total-female-50-to-54-years")
    val populationTotalFemale55To59Years = int("population-total-female-55-to-59-years")
    val populationTotalFemale60And61Years = int("population-total-female-60-and-61-years")
    val populationTotalFemale62To64Years = int("population-total-female-62-to-64-years")
    val populationTotalFemale65And66Years = int("population-total-female-65-and-66-years")
    val populationTotalFemale67To69Years = int("population-total-female-67-to-69-years")
    val populationTotalFemale70To74Years = int("population-total-female-70-to-74-years")
    val populationTotalFemale75To79Years = int("population-total-female-75-to-79-years")
    val populationTotalFemale80To84Years = int("population-total-female-80-to-84-years")
    val populationTotalFemale85YearsAndOver = int("population-total-female-85-years-and-over")
}

class CensusData {

    private val logger = LoggerFactory.getLogger(this.javaClass)

    private val database: Database = Database.connect(
        url = "jdbc:sqlite://${File(".").absolutePath}./data/census/data/all.sqlite",
        driver = "org.sqlite.JDBC",
    )

    fun getCityName(longName: String): CityName {
        val split = longName.split(", ")
        val city = split[0]
        val state = split[1]
        //long version of state
        val stateCol = if(state.length > 2) Cities.state else Cities.abbr

        try {
            return tryQueryCityName(stateCol, state, city)
        } catch (e: NoSuchElementException) {
            logger.warn("Bad city name: $longName")
            return tryQueryCityName(stateCol, state, "$city City")
        }
    }

    fun tryQueryCityName(stateCol : Column<String>, state: String, city: String): CityName {
        return database.from(Cities)
            .select(Cities.city, Cities.state, Cities.abbr, Cities.slug)
            .where((stateCol eq state) and (Cities.city eq city))
            .map { CityName(it[Cities.city]!!, it[Cities.state]!!, it[Cities.abbr]!!, it[Cities.slug]!!) }
            .first()
    }

    private val mapPopulation = fun(row : QueryRowSet): Population {
        return Population(
            row[Cities.populationTotal]!!.toLong(),
            row[Cities.populationTotalMale]!!.toLong(),
            row[Cities.populationTotalMaleUnder5Years]!!.toLong() +
                    row[Cities.populationTotalMale5To9Years]!!.toLong() +
                    row[Cities.populationTotalMale10To14Years]!!.toLong() +
                    row[Cities.populationTotalMale15To17Years]!!.toLong(),

            row[Cities.populationTotalMale18And19Years]!!.toLong() +
                    row[Cities.populationTotalMale20Years]!!.toLong() +
                    row[Cities.populationTotalMale21Years]!!.toLong() +
                    row[Cities.populationTotalMale22To24Years]!!.toLong(),

            row[Cities.populationTotalMale25To29Years]!!.toLong(),

            row[Cities.populationTotalMale30To34Years]!!.toLong() +
                    row[Cities.populationTotalMale35To39Years]!!.toLong(),

            row[Cities.populationTotalMale40To44Years]!!.toLong() +
                    row[Cities.populationTotalMale45To49Years]!!.toLong(),

            row[Cities.populationTotalMale50To54Years]!!.toLong() +
                    row[Cities.populationTotalMale55To59Years]!!.toLong(),

            row[Cities.populationTotalMale60And61Years]!!.toLong() +
                    row[Cities.populationTotalMale62To64Years]!!.toLong() +
                    row[Cities.populationTotalMale65And66Years]!!.toLong() +
                    row[Cities.populationTotalMale67To69Years]!!.toLong() +
                    row[Cities.populationTotalMale70To74Years]!!.toLong() +
                    row[Cities.populationTotalMale75To79Years]!!.toLong() +
                    row[Cities.populationTotalMale80To84Years]!!.toLong() +
                    row[Cities.populationTotalMale85YearsAndOver]!!.toLong(),

            row[Cities.populationTotalFemale]!!.toLong(),
            row[Cities.populationTotalFemaleUnder5Years]!!.toLong() +
                    row[Cities.populationTotalFemale5To9Years]!!.toLong() +
                    row[Cities.populationTotalFemale10To14Years]!!.toLong() +
                    row[Cities.populationTotalFemale15To17Years]!!.toLong(),

            row[Cities.populationTotalFemale18And19Years]!!.toLong() +
                    row[Cities.populationTotalFemale20Years]!!.toLong() +
                    row[Cities.populationTotalFemale21Years]!!.toLong() +
                    row[Cities.populationTotalFemale22To24Years]!!.toLong(),

            row[Cities.populationTotalFemale25To29Years]!!.toLong(),

            row[Cities.populationTotalFemale30To34Years]!!.toLong() +
                    row[Cities.populationTotalFemale35To39Years]!!.toLong(),

            row[Cities.populationTotalFemale40To44Years]!!.toLong() +
                    row[Cities.populationTotalFemale45To49Years]!!.toLong(),

            row[Cities.populationTotalFemale50To54Years]!!.toLong() +
                    row[Cities.populationTotalFemale55To59Years]!!.toLong(),

            row[Cities.populationTotalFemale60And61Years]!!.toLong() +
                    row[Cities.populationTotalFemale62To64Years]!!.toLong() +
                    row[Cities.populationTotalFemale65And66Years]!!.toLong() +
                    row[Cities.populationTotalFemale67To69Years]!!.toLong() +
                    row[Cities.populationTotalFemale70To74Years]!!.toLong() +
                    row[Cities.populationTotalFemale75To79Years]!!.toLong() +
                    row[Cities.populationTotalFemale80To84Years]!!.toLong() +
                    row[Cities.populationTotalFemale85YearsAndOver]!!.toLong(),
        )
    }

    fun getPopulation(name: CityName): Population {
        return database.from(Cities).select()
            .where(Cities.slug eq name.slug)
            .map(mapPopulation)
            .first()
    }

    fun getAllPopulation(): List<Population> {
        return database.from(Cities).select()
            .map(mapPopulation)
    }
}