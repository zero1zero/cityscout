package app.cityscout.core

import app.cityscout.model.CityName

class Images {

    fun getCityImage(name: CityName): String {
        return "https://datausa.io/api/profile/geo/${name.slug}/splash"
    }
}