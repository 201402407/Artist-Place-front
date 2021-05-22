import CryptoJS from 'crypto-js'

export class EnvUtils {
    static hashing(str: string) {
        return CryptoJS.SHA256(str).toString()
    }
}
