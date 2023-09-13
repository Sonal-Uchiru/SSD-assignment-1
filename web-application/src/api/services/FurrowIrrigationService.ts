import { AxiosResponse } from 'axios'
import ApiConstants from '../../constants/ApiConstants'
import { BaseService } from './BaseService'

class FurrowIrrigationService extends BaseService {
    public async generateFurrowIrrigationPathsAsync(
        data: JSON
    ): Promise<AxiosResponse> {
        const url = `${ApiConstants.FURROW_IRRIGATION_CLOUD_URL}/v3/irrigations/generatePaths`
        return await this.getResultFromService(url, data)
    }
}

export default new FurrowIrrigationService()
