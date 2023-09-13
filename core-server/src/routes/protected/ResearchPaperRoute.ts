import { Router } from 'express'
import ResearchPaperController from '../../controllers/protected/ResearchPaperController'

const researchPaperRoute = Router()

researchPaperRoute.post('/', ResearchPaperController.saveResearchPaperAsync)

researchPaperRoute.put('/:id', ResearchPaperController.updateResearchPaperAsync)

researchPaperRoute.delete(
    '/:id',
    ResearchPaperController.deleteResearchPaperAsync
)

researchPaperRoute.get(
    '/list',
    ResearchPaperController.getResearchPaperListAsync
)

researchPaperRoute.get(
    '/subCategories/:id/list',
    ResearchPaperController.getResearchPapersBySubCategoriesAsync
)

researchPaperRoute.get('/:id', ResearchPaperController.getResearchPaperAsync)

export default researchPaperRoute
