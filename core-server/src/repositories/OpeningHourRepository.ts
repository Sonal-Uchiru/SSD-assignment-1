import Cache from '../cache/Config'
import OpeningHours from '../models/OpeningHours'
import { QueryParams } from '../types/QueryParams'
import { IOpeningHours } from '../types/interfaces/models/IOpeningHours'
import { CreateOpeningHourCommand } from '../types/opening_hours/v1/command/create/CreateOpeningHourCommand'

class OpeningHourRepository {
    async SaveAsync(
        newOpeningHours: CreateOpeningHourCommand[]
    ): Promise<IOpeningHours[]> {
        const options = { ordered: true }

        const openingHours = await OpeningHours.insertMany(
            newOpeningHours,
            options
        )

        await this.forceUpdateOpeningHourListAsync(
            new QueryParams(100, 0, 'asc')
        )

        return openingHours
    }

    async GetListAsync(queries: QueryParams): Promise<IOpeningHours[]> {
        let openingHourList: IOpeningHours[] =
            Cache.nodeCache.get('openingHourList')

        if (openingHourList) {
            return openingHourList
        }

        openingHourList = await this.forceUpdateOpeningHourListAsync(
            queries
        )

        return openingHourList
    }

    async GetListTotalCountAsync(): Promise<number> {
        return (await OpeningHours.find({ isDeleted: null }, {_id : 1})).length
    }

    private async forceUpdateOpeningHourListAsync(
        queries: QueryParams
    ): Promise<IOpeningHours[]> {
        const openingHourList = await OpeningHours.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .limit(queries.limit)
            .skip(queries.offset)

        Cache.nodeCache.set('openingHourList', openingHourList)

        return openingHourList
    }
}

export default new OpeningHourRepository()
