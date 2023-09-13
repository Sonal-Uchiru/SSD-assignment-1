import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'

dotenv.config({ path: '../../config/.env' })

class HashPassword {
    async getHashAsync(passowrd: string): Promise<string> {
        try {
            const salt = bcrypt.genSaltSync(Number(process.env.SALT))
            return bcrypt.hashSync(passowrd, salt)
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default new HashPassword()
