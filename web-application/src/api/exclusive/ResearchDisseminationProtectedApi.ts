import { AxiosResponse } from 'axios'
import ModelConstants from '../../constants/ModelConstants'
import { HttpMethods } from '../../types/enums/HttpMethods'
import { Versions } from '../../types/enums/Versions'
import { protectedApiAsync } from '../ProtectedApi'
import { protectedListApiAsync } from '../ProtectedListApi'

class ResearchDisseminationProtectedApi {
    public async addResearchPaperAsync(data: any): Promise<AxiosResponse> {
        return await protectedApiAsync(
            HttpMethods.Post,
            Versions.V1,
            ModelConstants.RESEARCH_PAPERS,
            data
        )
    }
    public async updateResearchPaperAsync(
        data: any,
        id: string
    ): Promise<AxiosResponse> {
        return await protectedApiAsync(
            HttpMethods.Put,
            Versions.V1,
            `${ModelConstants.RESEARCH_PAPERS}/${id}`,
            data
        )
    }

    public async getListAsync(): Promise<AxiosResponse> {
        return await protectedListApiAsync(
            Versions.V1,
            ModelConstants.RESEARCH_PAPERS,
        )
    }
}

export default new ResearchDisseminationProtectedApi()
