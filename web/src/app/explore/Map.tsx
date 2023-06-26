import {AspectRatio, Box} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import {Cities} from "@/model/Cities";
import {Wrapper} from "@googlemaps/react-wrapper";
import {CityName} from "@/model/CityName";
import AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement;

const MapComponent = ({cities, selected}: {
    cities: Cities,
    selected: number
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [mm, setMm] = useState<google.maps.Map>()
    const [markers, setMarkers] = useState<AdvancedMarkerElement[]>()

    useEffect(() => {
        if (ref == null || markers != null) { //todo if switch away from multi city view remove the markers check
            return
        }

        const map = new window.google.maps.Map(ref.current as HTMLDivElement, {
            // center: { lat: 45.549630, lng: -122.656130 },
            zoom: 9,
            mapTypeId: 'roadmap',
            mapId: "f6c09cba9af1a1fc"
        });
        setMm(map)
    }, [ref, markers])

    useEffect(() => {
        if (mm == undefined) {
            return
        }

        const bounds = new google.maps.LatLngBounds();

        Promise.all([google.maps.importLibrary("maps"), google.maps.importLibrary("marker")])
            .then(mapAndMarker => {
                const {Map, InfoWindow} = mapAndMarker[0] as google.maps.MapsLibrary;
                const {AdvancedMarkerElement, PinElement} = mapAndMarker[1] as google.maps.MarkerLibrary;

                const createMarker = (city: string, place: google.maps.places.PlaceResult): AdvancedMarkerElement | undefined => {
                    const lat = place?.geometry?.location?.lat()
                    const lng = place?.geometry?.location?.lng()

                    if (!lat || !lng) {
                        return
                    }

                    const marker = new AdvancedMarkerElement({
                        position: {lat: lat, lng: lng},
                        map: mm,
                        title: city
                    });

                    if (!marker.position) {
                        return
                    }

                    // bounds.extend(marker.position)

                    // const infoWindow = new InfoWindow();
                    // infoWindow.setContent(marker.title);
                    // infoWindow.open(marker.map, marker);

                    // Add a click listener for each marker, and set up the info window.
                    // @ts-ignore
                    // marker.addListener('click', ({ domEvent , latLng }) => {
                    //     const { target } = domEvent;
                    //     infoWindow.open(marker.map, marker);
                    // });

                    return marker
                }

                const getPlaceAndAddMarker = ({name}: {
                    name: CityName,
                }): Promise<AdvancedMarkerElement> => {
                    const request = {
                        query: name.city + ", " + name.state,
                        fields: ["name", "geometry"],
                    };

                    const service = new google.maps.places.PlacesService(mm);

                    return new Promise<AdvancedMarkerElement>((resolve, reject) => {
                        service.findPlaceFromQuery(
                            request,
                            (
                                results: google.maps.places.PlaceResult[] | null,
                                status: google.maps.places.PlacesServiceStatus
                            ) => {
                                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                                    const marker = createMarker(name.city + ", " + name.state, results[0]); //only pull the first result
                                    if (!marker) {
                                        reject()
                                    }

                                    resolve(marker!)
                                } else {
                                    reject()
                                }
                            }
                        );
                    })
                }

                Promise.all(cities.cities
                    .map(city => getPlaceAndAddMarker(city)))
                    .then((markers: AdvancedMarkerElement[]) => setMarkers(markers))
                    .then(() => {
                        // map.fitBounds(bounds, {bottom: 0, left: 20, right: 20, top: 180});
                    })
            })
    }, [cities, mm]);

    useEffect(() => {
        const marker = markers?.at(selected)
        if (!mm || !marker) {
            return
        }

        if (marker.position) {
            mm.setCenter(marker.position)
        }

    }, [selected, mm, markers])

    return <Box ref={ref} id="map"/>;
}

export const Map = ({cities, selected}: { cities: Cities, selected: number }) => {
    return (
        <AspectRatio mx={5}>
            <Wrapper apiKey={"<key>"} libraries={["places"]}>
                <MapComponent cities={cities} selected={selected}/>
            </Wrapper>
        </AspectRatio>
    )
}

