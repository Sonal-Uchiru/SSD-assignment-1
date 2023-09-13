import Cache from '../cache/Config'
import AggrerianDivision from '../models/AggrerianDivision'
import { QueryParams } from '../types/QueryParams'
import { CreateAggrerianDivisionCommand } from '../types/aggrerian_division/v1/command/create/CreateAggrerianDivisionCommand'
import { IAggrerianDivision } from '../types/interfaces/models/IAggrerianDivisionModel'

class AggrerianDivisionRepository {
    async SaveAsync(
        newAggrerianDivisions: CreateAggrerianDivisionCommand[]
    ): Promise<IAggrerianDivision[]> {
        const options = { ordered: true }

        const aggrerianDivisions = await AggrerianDivision.insertMany(
            newAggrerianDivisions,
            options
        )

        await this.forceUpdateAggererianDivisionListAsync(
            new QueryParams(100, 0, 'asc')
        )

        return aggrerianDivisions
    }

    async GetListAsync(queries: QueryParams): Promise<IAggrerianDivision[]> {
        let aggrerianDivisionList: IAggrerianDivision[] = Cache.nodeCache.get(
            'aggrerianDivisionList'
        )

        if (aggrerianDivisionList) {
            return aggrerianDivisionList
        }

        aggrerianDivisionList =
            await this.forceUpdateAggererianDivisionListAsync(queries)

        return aggrerianDivisionList
    }

    async GetListTotalCountAsync(): Promise<number> {
        return (await AggrerianDivision.find({ isDeleted: null }, { _id: 1 }))
            .length
    }

    private async forceUpdateAggererianDivisionListAsync(
        queries: QueryParams
    ): Promise<IAggrerianDivision[]> {
        const aggrerianDivisionList = await AggrerianDivision.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ name: queries.sort })

        Cache.nodeCache.set('aggrerianDivisionList', aggrerianDivisionList)

        return aggrerianDivisionList
    }
}

export default new AggrerianDivisionRepository()
