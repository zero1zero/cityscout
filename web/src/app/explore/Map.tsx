import {AspectRatio} from "@chakra-ui/react";
import React from "react";
import {Cities} from "@/model/Cities";

export const Map = ({cities}: { cities: Cities }) => {
    return (
        <AspectRatio
            ratio={16 / 9}>
            <iframe width="600" height="450" loading="lazy" allowFullScreen
                    src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJJ3SpfQsLlVQRkYXR9ua5Nhw&key=<key>"></iframe>
        </AspectRatio>
    )
}

