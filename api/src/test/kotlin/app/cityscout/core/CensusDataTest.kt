package app.cityscout.core

import app.cityscout.model.CityName
import org.junit.Assert.assertTrue
import org.junit.Test
import java.io.File
import kotlin.test.assertEquals

class CensusDataTest {

    private val censusData = CensusData()

    @Test
    fun differentNames() {

        val portland = CityName("Portland city, Oregon", "Oregon", "OR", "portland-or")
        val seattle = CityName("Seattle city, Washington", "Washington", "WA", "seattle-wa")
        val boise = CityName("Boise City city, Idaho", "Idaho", "ID", "boise-city-id")

        assertEquals(portland, censusData.getCityName("Portland, Oregon"))
        assertEquals(portland, censusData.getCityName("Portland, OR"))

        assertEquals(seattle, censusData.getCityName("Seattle, Washington"))
        assertEquals(seattle, censusData.getCityName("Seattle, WA"))

        //wrong names given by the model that are missing "City"
        assertEquals(boise, censusData.getCityName("Boise, Idaho"))
        assertEquals(boise, censusData.getCityName("Boise, ID"))
    }

    @Test
    fun getPop() {
        val portland = CityName("Portland city, Oregon", "Oregon", "OR", "portland-or")
        val population = censusData.getPopulation(portland)
        assertEquals(647176, population.total)
    }

    @Test
    fun getAllPop() {
        censusData.getAllPopulation()
    }
}