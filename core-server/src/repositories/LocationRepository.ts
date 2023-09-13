import Location from '../models/Location'
import Cache from '../cache/Config'
import { QueryParams } from '../types/QueryParams'
import { CreateLocationCommand } from '../types/location/v1/command/create/CreateLocationCommand'
import { ILocation } from '../types/interfaces/models/ILocationModel'

class LocationRepository {
    async SaveAsync(
        newLocations: CreateLocationCommand[]
    ): Promise<ILocation[]> {
        const options = { ordered: true }

        const locations = await Location.insertMany(
            newLocations,
            options
        )

        await this.forceUpdateLocationListAsync(
            new QueryParams(100, 0, 'asc')
        )

        return locations
    }

    async GetListAsync(queries: QueryParams): Promise<ILocation[]> {
        let locationList: ILocation[] = Cache.nodeCache.get(
            'locationList'
        )

        if (locationList) {
            return locationList
        }

        locationList =
            await this.forceUpdateLocationListAsync(queries)

        return locationList
    }

    async GetListTotalCountAsync(): Promise<number> {
        return (await Location.find({ isDeleted: null }, { _id: 1 }))
            .length
    }

    private async forceUpdateLocationListAsync(
        queries: QueryParams
    ): Promise<ILocation[]> {
        const locationList = await Location.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ name: queries.sort })

        Cache.nodeCache.set('locationList', locationList)

        return locationList
    }
}

export default new LocationRepository()
