import CultivationMonth from '../models/CultivationMonth'
import Cache from '../cache/Config'
import { QueryParams } from '../types/QueryParams'
import { CreateCultivationMonthCommand } from '../types/cultivation_month/v1/command/create/CreateCultivationMonthCommand'
import { ICultivationMonth } from '../types/interfaces/models/ICultivationMonthModel'

class CultivationMethodRepository {
    async SaveAsync(
        newCultivationMonths: CreateCultivationMonthCommand[]
    ): Promise<ICultivationMonth[]> {
        const options = { ordered: true }

        const cultivationMonth = await CultivationMonth.insertMany(
            newCultivationMonths,
            options
        )

        await this.forceUpdateCultivationMonthListAsync(
            new QueryParams(100, 0, 'asc')
        )

        return cultivationMonth
    }

    async GetListAsync(queries: QueryParams): Promise<ICultivationMonth[]> {
        let cultivationMonthList: ICultivationMonth[] = Cache.nodeCache.get(
            'cultivationMonthList'
        )

        if (cultivationMonthList) {
            return cultivationMonthList
        }

        cultivationMonthList =
            await this.forceUpdateCultivationMonthListAsync(queries)

        return cultivationMonthList
    }

    async GetListTotalCountAsync(): Promise<number> {
        return (await CultivationMonth.find({ isDeleted: null }, { _id: 1 }))
            .length
    }

    private async forceUpdateCultivationMonthListAsync(
        queries: QueryParams
    ): Promise<ICultivationMonth[]> {
        const cultivationMonthList = await CultivationMonth.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ name: queries.sort })

        Cache.nodeCache.set('cultivationMonthList', cultivationMonthList)

        return cultivationMonthList
    }
}

export default new CultivationMethodRepository()
