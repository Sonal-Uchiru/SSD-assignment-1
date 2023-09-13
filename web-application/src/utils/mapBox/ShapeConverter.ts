export const getRectangularShape = (polygonFeature: any) => {
    if (polygonFeature.geometry.type !== 'Polygon') {
        console.error('Input feature is not a Polygon.')
        return null
    }

    const coordinates = polygonFeature.geometry.coordinates[0]

    if (coordinates.length !== 5) {
        console.error(
            'Input polygon does not have 5 coordinates (4 corners and the last one identical to the first).'
        )
        return null
    }

    // Find the minimum and maximum latitude and longitude values
    let minLng = Infinity
    let maxLng = -Infinity
    let minLat = Infinity
    let maxLat = -Infinity

    for (const coord of coordinates) {
        const [lng, lat] = coord
        minLng = Math.min(minLng, lng)
        maxLng = Math.max(maxLng, lng)
        minLat = Math.min(minLat, lat)
        maxLat = Math.max(maxLat, lat)
    }

    // Create a rectangular polygon
    const rectangularPolygon = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'Polygon',
            coordinates: [
                [
                    [minLng, minLat],
                    [minLng, maxLat],
                    [maxLng, maxLat],
                    [maxLng, minLat],
                    [minLng, minLat],
                ],
            ],
        },
    }

    return rectangularPolygon
}
