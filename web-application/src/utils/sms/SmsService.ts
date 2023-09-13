import SendNotification from '../notify/NotifyService'

class SmsService {
    public async sendSMSAsync(farmers: any) {
        const promises = farmers.map(async (farmer: any) => {
            await SendNotification.sendSMSAsync(farmer)
        })

        return Promise.all(promises)
    }
}

export default new SmsService()
