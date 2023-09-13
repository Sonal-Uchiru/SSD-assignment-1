import bcrypt from 'bcrypt'

export const passwordVerificationAsync = async (
    reqPassword: string,
    password: string
): Promise<boolean> => {
    return await bcrypt.compare(reqPassword, password)
}
