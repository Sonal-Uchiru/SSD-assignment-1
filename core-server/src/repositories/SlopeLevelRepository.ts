import SlopeLevel from '../models/SlopeLevel'
import Cache from '../cache/Config'
import { QueryParams } from '../types/QueryParams'
import { ISlopeLevel } from '../types/interfaces/models/ISlopeLevel'
import { CreateSlopeLevelCommand } from '../types/slope_level/v1/command/create/CreateSlopeLevelCommand'

class SoilLevelRepository {
    async SaveAsync(
        newSlopeLevel: CreateSlopeLevelCommand[]
    ): Promise<ISlopeLevel[]> {
        const options = { ordered: true }

        const slopeLevels = await SlopeLevel.insertMany(
            newSlopeLevel,
            options
        )

        await this.forceUpdateSlopeLevelListAsync(
            new QueryParams(100, 0, 'asc')
        )

        return slopeLevels
    }

    async GetListAsync(queries: QueryParams): Promise<ISlopeLevel[]> {
        let slopeLevelList: ISlopeLevel[] = Cache.nodeCache.get(
            'slopeLevelList'
        )

        if (slopeLevelList) {
            return slopeLevelList
        }

        slopeLevelList =
            await this.forceUpdateSlopeLevelListAsync(queries)

        return slopeLevelList
    }

    async GetListTotalCountAsync(): Promise<number> {
        return (await SlopeLevel.find({ isDeleted: null }, { _id: 1 }))
            .length
    }

    private async forceUpdateSlopeLevelListAsync(
        queries: QueryParams
    ): Promise<ISlopeLevel[]> {
        const slopeLevelList = await SlopeLevel.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ name: queries.sort })

        Cache.nodeCache.set('slopeLevelList', slopeLevelList)

        return slopeLevelList
    }
}

export default new SoilLevelRepository()
