import {AspectRatio, Box} from "@chakra-ui/react";
import React, {useEffect, useRef} from "react";
import {Cities} from "@/model/Cities";
import {Wrapper} from "@googlemaps/react-wrapper";

const MapComponent = ({cities}: {
    cities: Cities
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const map = new window.google.maps.Map(ref.current as HTMLDivElement, {
            center: { lat: 45.549630, lng: -122.656130 },
            zoom: 4,
            mapTypeId: 'roadmap',
            mapId:"f6c09cba9af1a1fc"
        });

        var bounds = new google.maps.LatLngBounds();

        Promise.all([google.maps.importLibrary("maps"), google.maps.importLibrary("marker")])
            .then(mapAndMarker => {
                const { Map, InfoWindow } = mapAndMarker[0] as google.maps.MapsLibrary;
                const { AdvancedMarkerElement, PinElement } = mapAndMarker[1] as google.maps.MarkerLibrary;

                const createMarker = (city: string, place: google.maps.places.PlaceResult) => {
                    // Create the markers.
                    // const pin = new PinElement({
                    //     glyph: place.name,
                    // });

                    const lat  = place?.geometry?.location?.lat()
                    const lng = place?.geometry?.location?.lng()

                    if (!lat || !lng) {
                        return
                    }

                    const marker = new AdvancedMarkerElement({
                        position: {lat: lat, lng: lng},
                        map: map,
                        title: city,
                        // content: pin.element,
                    });

                    if (!marker.position) {
                        return
                    }

                    bounds.extend(marker.position)

                    const infoWindow = new InfoWindow();
                    infoWindow.setContent(marker.title);
                    infoWindow.open(marker.map, marker);

                    // Add a click listener for each marker, and set up the info window.
                    // @ts-ignore
                    marker.addListener('click', ({ domEvent , latLng }) => {
                        const { target } = domEvent;
                        infoWindow.open(marker.map, marker);
                    });
                }

                const getPlaceAndAddMarker = ({city}: {
                    city: string,
                }) : Promise<void> => {
                    const request = {
                        query: city,
                        fields: ["name", "geometry"],
                    };

                    const service = new google.maps.places.PlacesService(map);

                    return new Promise<void>((resolve, reject) => {
                        service.findPlaceFromQuery(
                            request,
                            (
                                results: google.maps.places.PlaceResult[] | null,
                                status: google.maps.places.PlacesServiceStatus
                            ) => {
                                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                                    createMarker(city, results[0]); //only pull the first result
                                    resolve()
                                } else {
                                    reject()
                                }
                            }
                        );
                    })
                }

                Promise.all(cities.cities
                    .map(city => getPlaceAndAddMarker(city)))
                    .then(() => {
                        map.fitBounds(bounds, 40);
                    })
            })
    }, [cities]);

    return <Box ref={ref} id="map" />;
}

export const Map = ({cities}: { cities: Cities }) => {
    return (
        <AspectRatio>
            <Wrapper apiKey={"<key>"}  libraries={["places"]}>
                <MapComponent cities={cities}/>
            </Wrapper>
        </AspectRatio>
    )
}

