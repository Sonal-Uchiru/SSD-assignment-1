import WaterInoutLocation from '../models/WaterInoutLocation'
import Cache from '../cache/Config'
import { QueryParams } from '../types/QueryParams'
import { IWaterInoutLocation } from '../types/interfaces/models/IWaterInoutLocation'
import { CreateWaterInoutLocationCommand } from '../types/water_inout_location/v1/command/create/CreateWaterInoutLocationCommand'

class WaterInoutLocationRepository {
    async SaveAsync(
        newWaterInoutLocation: CreateWaterInoutLocationCommand[]
    ): Promise<IWaterInoutLocation[]> {
        const options = { ordered: true }

        const waterInoutLocations = await WaterInoutLocation.insertMany(
            newWaterInoutLocation,
            options
        )

        await this.forceUpdateWaterInoutLocationListAsync(
            new QueryParams(100, 0, 'asc')
        )

        return waterInoutLocations
    }

    async GetListAsync(queries: QueryParams): Promise<IWaterInoutLocation[]> {
        let waterInoutLocationList: IWaterInoutLocation[] = Cache.nodeCache.get(
            'waterInoutLocationList'
        )

        if (waterInoutLocationList) {
            return waterInoutLocationList
        }

        waterInoutLocationList =
            await this.forceUpdateWaterInoutLocationListAsync(queries)

        return waterInoutLocationList
    }

    async GetListTotalCountAsync(): Promise<number> {
        return (await WaterInoutLocation.find({ isDeleted: null }, { _id: 1 }))
            .length
    }

    private async forceUpdateWaterInoutLocationListAsync(
        queries: QueryParams
    ): Promise<IWaterInoutLocation[]> {
        const waterInoutLocationList = await WaterInoutLocation.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ name: queries.sort })

        Cache.nodeCache.set('waterInoutLocationList', waterInoutLocationList)

        return waterInoutLocationList
    }
}

export default new WaterInoutLocationRepository()
