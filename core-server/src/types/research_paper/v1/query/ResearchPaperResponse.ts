import { IBaseResponse } from '../../../../types/interfaces/IBaseResponse'
import { IResearchPaper } from '../../../../types/interfaces/models/IResearchPaperModel'

export class ResearchPaperResponse implements IBaseResponse {
    time: Date
    researchPaper: IResearchPaper

    constructor(researchPaper: IResearchPaper) {
        ;(this.time = new Date()), (this.researchPaper = researchPaper)
    }
}
