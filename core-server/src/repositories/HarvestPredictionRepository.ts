import HarvestPrediction from '../models/HarvestPrediction'
import PredictionFeedback from '../models/PredictionFeedback'
import ResearchPaper from '../models/ResearchPaper'
import { QueryParams } from '../types/QueryParams'
import { CreateHarvestPredictionCommand } from '../types/harvest_prediction/v1/command/create/CreateHarvestPredictionCommand'
import { CreatePredictionFeedbackCommand } from '../types/harvest_prediction/v1/command/create/CreatePredictionFeedbackCommand'
import { IHarvestPrediction } from '../types/interfaces/models/IHarvestPredictionModel'
import { IPredictionFeedback } from '../types/interfaces/models/IPredictionFeedbackModel'
import { IResearchPaper } from '../types/interfaces/models/IResearchPaperModel'
import { UpdateResearchPaperCommand } from '../types/research_paper/v1/command/update/UpdateResearchPaperCommand'
import { GetObjectID } from '../utils/extension/MongooseExtenstion'

class HarvestPredictionRepository {
    async SaveAsync(
        newHarvestPrediction: CreateHarvestPredictionCommand
    ): Promise<IHarvestPrediction> {
        return await new HarvestPrediction({
            ...newHarvestPrediction,
        }).save()
    }

    async SubmitFeedbackAsync(
        newPredictionFeedback: CreatePredictionFeedbackCommand
    ): Promise<IPredictionFeedback> {
        return await new PredictionFeedback({
            ...newPredictionFeedback,
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

    async DeleteAsync(id: string): Promise<IHarvestPrediction> {
        return await HarvestPrediction.findByIdAndUpdate(id, {
            $set: {
                isDeleted: new Date(),
            },
        })
    }

    async AnyAsync(id: string): Promise<IHarvestPrediction> {
        return await HarvestPrediction.findOne(
            { _id: id, isDeleted: null },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
    }

    async GetListByUserAsync(
        userId: string,
        queries: QueryParams
    ): Promise<IHarvestPrediction[]> {
        return await HarvestPrediction.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .where({ user: GetObjectID(userId) })
            .populate('cultivationMethod', {
                isDeleted: 0,
                modifiedUser: 0,
                __v: 0,
            })
            .populate('cultivationMonth', {
                isDeleted: 0,
                modifiedUser: 0,
                __v: 0,
            })
            .populate('soilType', {
                isDeleted: 0,
                modifiedUser: 0,
                __v: 0,
            })
            .populate('paddyType', {
                isDeleted: 0,
                modifiedUser: 0,
                __v: 0,
            })
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ searchDate: queries.sort })
    }

    async GetListTotalCountByUserAsync(userId: string): Promise<number> {
        return (
            await HarvestPrediction.find({ isDeleted: null }, { _id: 1 }).where(
                { user: GetObjectID(userId) }
            )
        ).length
    }

    async GetHarvestPredictionById(id: string): Promise<IHarvestPrediction> {
        return await HarvestPrediction.findOne(
            {
                _id: id,
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .populate('cultivationMethod', {
                _id: 1,
                name: 1,
                iconUrl: 1,
            })
            .populate('cultivationMonth', {
                isDeleted: 0,
                modifiedUser: 0,
                __v: 0,
            })
            .populate('soilType', {
                isDeleted: 0,
                modifiedUser: 0,
                __v: 0,
            })
            .populate('paddyType', {
                isDeleted: 0,
                modifiedUser: 0,
                __v: 0,
            })
    }
}

export default new HarvestPredictionRepository()
