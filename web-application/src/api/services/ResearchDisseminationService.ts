import { AxiosResponse } from 'axios'
import { BaseService } from './BaseService'

class ResearchDisseminationService extends BaseService {
    public async generateSummaryAsync(data: any): Promise<AxiosResponse> {
        const url = 'http://127.0.0.1:5000/summaries'
        return await this.getResultFromService(url, data)
    }
}

export default new ResearchDisseminationService()
