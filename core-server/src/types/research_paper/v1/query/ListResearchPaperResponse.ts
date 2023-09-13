import { IResearchPaper } from '../../../../types/interfaces/models/IResearchPaperModel'
import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse'

export class ListResearchPaperResponse implements IBaseQueryResponse {
    time: Date
    items: IResearchPaper[]
    count: number
    totalCount: number

    constructor(items: IResearchPaper[], count: number, totalCount: number) {
        ;(this.time = new Date()),
            (this.items = items),
            (this.count = count),
            (this.totalCount = totalCount)
    }
}
