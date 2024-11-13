import * as moment from "moment"
import * as querystring from "querystring"
import * as crypto from "crypto"
import { Injectable } from "@nestjs/common"
import { vnpayConfig } from "@config"

@Injectable()
export class VnpayService {
    // Hàm tạo URL thanh toán
    createPaymentUrl(transactionId: string, amount : number): string {
        const createDate = moment(new Date()).format("YYYYMMDDHHmmss")
        const vnpParams = {
            vnp_Version: "2.1.0",
            vnp_Command: "pay",
            vnp_TmnCode: vnpayConfig().terminalCode,
            vnp_Amount: amount * 100,
            vnp_CurrCode: "VND",
            vnp_TxnRef: transactionId,
            vnp_OrderInfo: "thanhtoanhoadon",
            vnp_ReturnUrl: vnpayConfig().returnUrl,
            vnp_IpAddr: process.env.IP_ADDRESS,
            vnp_Locale: "vn",
            vnp_OrderType: "other",
            vnp_CreateDate: createDate,
        }

        // Sắp xếp tham số và mã hóa chữ ký
        const sortedParams = this.sortObject(vnpParams)
        const signData = querystring.stringify(sortedParams)
        const secureHash = this.createHmacSHA512(vnpayConfig().hashSecret, signData)

        return `${vnpayConfig().url}?${signData}&vnp_SecureHash=${secureHash}`
    }

    // Hàm xác minh chữ ký
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    verifyResponse(vnpParams: any): boolean {
        const secureHash = vnpParams["vnp_SecureHash"]
        delete vnpParams["vnp_SecureHash"]
        delete vnpParams["vnp_SecureHashType"]

        const sortedParams = this.sortObject(vnpParams)
        const signData = querystring.stringify(sortedParams)
        const hash = this.createHmacSHA512(vnpayConfig().hashSecret, signData)

        return hash === secureHash
    }

    // Hàm hỗ trợ tạo chữ ký SHA-512
    public createHmacSHA512(key: string, data: string): string {
        return crypto.createHmac("sha512", key).update(data).digest("hex")
    }

    // Hàm hỗ trợ sắp xếp các tham số theo thứ tự alphabet
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public sortObject(obj: any): any {
        const sorted = {}
        Object.keys(obj).sort().forEach(key => {
            sorted[key] = obj[key]
        })
        return sorted
    }
}
