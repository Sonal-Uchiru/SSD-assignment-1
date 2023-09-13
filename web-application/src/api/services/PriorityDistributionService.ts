import { AxiosResponse } from 'axios'
import ApiConstants from '../../constants/ApiConstants'
import { BaseService } from './BaseService'

class PriorityDistributionService extends BaseService {
    public async generatePriorityDistributionAsync(
        data: any
    ): Promise<AxiosResponse> {
        const url = `${ApiConstants.PRIORITY_DISTRIBUTION_CLOUD_URL}/predict`
        return await this.getResultFromService(url, data)
    }
}

export default new PriorityDistributionService()
