import PaddyField from '../models/PaddyField'
import { QueryParams } from '../types/QueryParams'
import { IPaddyField } from '../types/interfaces/models/IPaddyFieldModel'
import { CreatePaddyFieldCommand } from '../types/paddy_field/v1/command/create/CreatePaddyFieldCommand'
import { GetObjectID } from '../utils/extension/MongooseExtenstion'

class PaddyFieldRepository {
    async SaveAsync(
        newPaddyField: CreatePaddyFieldCommand
    ): Promise<IPaddyField> {
        return await new PaddyField({
            ...newPaddyField,
        }).save()
    }

    async DeleteAsync(id: string): Promise<IPaddyField> {
        return await PaddyField.findByIdAndUpdate(id, {
            $set: {
                isDeleted: new Date(),
            },
        })
    }

    async AnyAsync(id: string): Promise<IPaddyField> {
        return await PaddyField.findOne(
            { _id: id, isDeleted: null },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
    }

    async GetListByAsync(queries: QueryParams): Promise<IPaddyField[]> {
        return await PaddyField.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .populate('location', {
                name: 1,
            })
            .populate('paddyType', {
                name: 1,
            })
            .populate('slopeLevel', {
                name: 1,
            })
            .populate('waterIn', {
                name: 1,
            })
            .populate('waterOut', {
                name: 1,
            })
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ name: queries.sort })
    }

    async GetListTotalCountAsync(): Promise<number> {
        return (await PaddyField.find({ isDeleted: null }, { _id: 1 })).length
    }

    async GetListByUserAsync(
        userId: string,
        queries: QueryParams
    ): Promise<IPaddyField[]> {
        return await PaddyField.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .where({ user: GetObjectID(userId) })
            .populate('location', {
                name: 1,
            })
            .populate('paddyType', {
                name: 1,
            })
            .populate('slopeLevel', {
                name: 1,
            })
            .populate('waterIn', {
                name: 1,
            })
            .populate('waterOut', {
                name: 1,
            })
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ name: queries.sort })
    }

    async GetListTotalCountByUserAsync(userId: string): Promise<number> {
        return (
            await PaddyField.find({ isDeleted: null }, { _id: 1 }).where({
                user: GetObjectID(userId),
            })
        ).length
    }

    async GetPaddyFieldById(id: string): Promise<IPaddyField> {
        return await PaddyField.findOne(
            {
                _id: id,
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .populate('location', {
                name: 1,
            })
            .populate('paddyType', {
                name: 1,
            })
            .populate('slopeLevel', {
                name: 1,
            })
            .populate('waterIn', {
                name: 1,
            })
            .populate('waterOut', {
                name: 1,
            })
    }
}

export default new PaddyFieldRepository()
