import PaddyType from '../models/PaddyType'
import Cache from '../cache/Config'
import { QueryParams } from '../types/QueryParams'
import { IPaddyType } from '../types/interfaces/models/IPaddyTypeModel'
import { CreatePaddyTypeCommand } from '../types/paddy_type/v1/command/create/CreatePaddyTypeCommand'

class PaddyTypeRepository {
    async SaveAsync(
        newPaddyType: CreatePaddyTypeCommand[]
    ): Promise<IPaddyType[]> {
        const options = { ordered: true }

        const paddyTypes = await PaddyType.insertMany(
            newPaddyType,
            options
        )

        await this.forceUpdatePaddyTypeListAsync(
            new QueryParams(100, 0, 'asc')
        )

        return paddyTypes
    }

    async GetListAsync(queries: QueryParams): Promise<IPaddyType[]> {
        let paddyTypeList: IPaddyType[] = Cache.nodeCache.get(
            'paddyTypeList'
        )

        if (paddyTypeList) {
            return paddyTypeList
        }

        paddyTypeList =
            await this.forceUpdatePaddyTypeListAsync(queries)

        return paddyTypeList
    }

    async GetListTotalCountAsync(): Promise<number> {
        return (await PaddyType.find({ isDeleted: null }, { _id: 1 }))
            .length
    }

    private async forceUpdatePaddyTypeListAsync(
        queries: QueryParams
    ): Promise<IPaddyType[]> {
        const paddyTypeList = await PaddyType.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ name: queries.sort })

        Cache.nodeCache.set('paddyTypeList', paddyTypeList)

        return paddyTypeList
    }
}

export default new PaddyTypeRepository()
