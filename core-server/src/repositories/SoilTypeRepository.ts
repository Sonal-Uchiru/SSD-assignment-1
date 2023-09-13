import SoilType from '../models/SoilType'
import Cache from '../cache/Config'
import { QueryParams } from '../types/QueryParams'
import { ISoilType } from '../types/interfaces/models/ISoilTypeModel'
import { CreateSoilTypeCommand } from '../types/soil_type/v1/command/create/CreateSoilTypeCommand'

class SoilTypeRepository {
    async SaveAsync(
        newSoilTypes: CreateSoilTypeCommand[]
    ): Promise<ISoilType[]> {
        const options = { ordered: true }

        const soilTypes = await SoilType.insertMany(
            newSoilTypes,
            options
        )

        await this.forceUpdateSoilTypeListAsync(
            new QueryParams(100, 0, 'asc')
        )

        return soilTypes
    }

    async GetListAsync(queries: QueryParams): Promise<ISoilType[]> {
        let soilTypeList: ISoilType[] = Cache.nodeCache.get(
            'soilTypeList'
        )

        if (soilTypeList) {
            return soilTypeList
        }

        soilTypeList =
            await this.forceUpdateSoilTypeListAsync(queries)

        return soilTypeList
    }

    async GetListTotalCountAsync(): Promise<number> {
        return (await SoilType.find({ isDeleted: null }, { _id: 1 }))
            .length
    }

    private async forceUpdateSoilTypeListAsync(
        queries: QueryParams
    ): Promise<ISoilType[]> {
        const soilTypeList = await SoilType.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ name: queries.sort })

        Cache.nodeCache.set('soilTypeList', soilTypeList)

        return soilTypeList
    }
}

export default new SoilTypeRepository()
