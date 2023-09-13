import { AxiosResponse } from 'axios'
import { BaseService } from '../../api/services/BaseService'

class NotifyService extends BaseService {
    public async sendSMSAsync(data: any): Promise<AxiosResponse> {
        const message = this.getMessage(data)
        const url = this.getUrl(message, data?.mobile)

        return await this.getResultFromService(url)
    }

    private getUrl(message: string, mobile: string) {
        return `https://app.notify.lk/api/v1/send?user_id=25352&api_key=hKi5w7SQInin1yNjxani&sender_id=NotifyDEMO&to=94${mobile}&message=${message}`
    }

    private getMessage(data: any) {
        return `${data?.name} (${data?.nic}) - The time slot allocated for you to collect your fertilizer subsidy is on ${data?.allocatedDate} at ${data?.allocatedTimeSlot}. Please come and collect your fertilizer subsidy on time!`
    }
}

export default new NotifyService()
