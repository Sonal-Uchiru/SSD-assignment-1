import CultivationMethod from '../models/CultivationMethod'
import Cache from '../cache/Config'
import { QueryParams } from '../types/QueryParams'
import { CreateCultivationMethodCommand } from '../types/cultivation_method/v1/command/create/CreateCultivationMethodCommand'
import { ICultivationMethod } from '../types/interfaces/models/ICultivationMethodModel'

class CultivationMethodRepository {
    async SaveAsync(
        newCultivationMethods: CreateCultivationMethodCommand[]
    ): Promise<ICultivationMethod[]> {
        const options = { ordered: true }

        const cultivationMethods = await CultivationMethod.insertMany(
            newCultivationMethods,
            options
        )

        await this.forceUpdateCultivationMethodListAsync(
            new QueryParams(100, 0, 'asc')
        )

        return cultivationMethods
    }

    async GetListAsync(queries: QueryParams): Promise<ICultivationMethod[]> {
        let cultivationMethodList: ICultivationMethod[] = Cache.nodeCache.get(
            'cultivationMethodList'
        )

        if (cultivationMethodList) {
            return cultivationMethodList
        }

        cultivationMethodList =
            await this.forceUpdateCultivationMethodListAsync(queries)

        return cultivationMethodList
    }

    async GetListTotalCountAsync(): Promise<number> {
        return (await CultivationMethod.find({ isDeleted: null }, { _id: 1 }))
            .length
    }

    private async forceUpdateCultivationMethodListAsync(
        queries: QueryParams
    ): Promise<ICultivationMethod[]> {
        const cultivationMethodList = await CultivationMethod.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ name: queries.sort })

        Cache.nodeCache.set('cultivationMethodList', cultivationMethodList)

        return cultivationMethodList
    }
}

export default new CultivationMethodRepository()
