import { Request, Response } from 'express'
import ResearchPaperService from '../../services/ResearchPaperService'

class ResearchPaperController {
    async saveResearchPaperAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        return await ResearchPaperService.saveResearchPaperAsync(req, res)
    }

    async updateResearchPaperAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        return await ResearchPaperService.updateResearchPaperAsync(req, res)
    }

    async deleteResearchPaperAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        return await ResearchPaperService.deleteResearchPaperAsync(req, res)
    }

    async getResearchPaperListAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        return await ResearchPaperService.getResearchPaperListAsync(req, res)
    }

    async getResearchPapersBySubCategoriesAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        return await ResearchPaperService.getResearchPapersBySubCategoriesAsync(
            req,
            res
        )
    }

    async getResearchPaperAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        return await ResearchPaperService.getResearchPaperAsync(req, res)
    }
}

export default new ResearchPaperController()
