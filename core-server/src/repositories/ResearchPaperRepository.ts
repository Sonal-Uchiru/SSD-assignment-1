import ResearchPaper from '../models/ResearchPaper'
import { QueryParams } from '../types/QueryParams'
import { IResearchPaper } from '../types/interfaces/models/IResearchPaperModel'
import { CreateResearchPaperCommand } from '../types/research_paper/v1/command/create/CreateResearchPaperCommand'
import { UpdateResearchPaperCommand } from '../types/research_paper/v1/command/update/UpdateResearchPaperCommand'
import { GetObjectID } from '../utils/extension/MongooseExtenstion'

class ResearchPaperRepository {
    async SaveAsync(
        newResearchPaper: CreateResearchPaperCommand
    ): Promise<IResearchPaper> {
        return await new ResearchPaper({
            ...newResearchPaper,
        }).save()
    }

    async UpdateAsync(
        id: string,
        researchPaper: UpdateResearchPaperCommand
    ): Promise<IResearchPaper> {
        return await ResearchPaper.findByIdAndUpdate(id, {
            $set: {
                ...researchPaper,
            },
        })
    }

    async DeleteAsync(id: string): Promise<IResearchPaper> {
        return await ResearchPaper.findByIdAndUpdate(id, {
            $set: {
                isDeleted: new Date(),
            },
        })
    }

    async AnyAsync(id: string): Promise<IResearchPaper> {
        return await ResearchPaper.findOne(
            { _id: id, isDeleted: null },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
    }

    async GetListAsync(
        queries: QueryParams,
        subCategory: string = null
    ): Promise<IResearchPaper[]> {
        if (subCategory) {
            return await ResearchPaper.find(
                {
                    isDeleted: null,
                },
                { isDeleted: 0, modifiedUser: 0, __v: 0 }
            )
                .where({ subCategory: GetObjectID(subCategory) })
                .populate('subCategory', {
                    _id: 1,
                    name: 1,
                    iconUrl: 1,
                })
                .limit(queries.limit)
                .skip(queries.offset)
                .sort({ name: queries.sort })
        }

        return await ResearchPaper.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .populate('subCategory', {
                _id: 1,
                name: 1,
                iconUrl: 1,
            })
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ name: queries.sort })
    }

    async GetListTotalCountAsync(): Promise<number> {
        return (await ResearchPaper.find({ isDeleted: null }, { _id: 1 }))
            .length
    }

    async GetListTotalCountBySubCategoryAsync(
        subCategoryId: string
    ): Promise<number> {
        return (
            await ResearchPaper.find({ isDeleted: null }, { _id: 1 }).where({
                subCategory: GetObjectID(subCategoryId),
            })
        ).length
    }

    async GetResearchPaperById(id: string): Promise<IResearchPaper> {
        return await ResearchPaper.findOne(
            {
                _id: id,
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        ).populate('subCategory', {
            _id: 1,
            name: 1,
            iconUrl: 1,
        })
    }

    async GetResearchPaperListBySubCategory(
        subCategoryId: string,
        queries: QueryParams
    ): Promise<IResearchPaper[]> {
        return await ResearchPaper.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .where({ subCategory: GetObjectID(subCategoryId) })
            .populate('subCategory', {
                _id: 1,
                name: 1,
                iconUrl: 1,
            })
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ name: queries.sort })
    }
}

export default new ResearchPaperRepository()
