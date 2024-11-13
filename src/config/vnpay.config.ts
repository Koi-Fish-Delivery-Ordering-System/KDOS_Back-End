export const vnpayConfig = () => (
    {
        terminalCode: process.env.VNP_TMNCODE,
        hashSecret: process.env.VNP_HASHSECRET,
        url: process.env.VNP_URL,
        returnUrl: process.env.VNP_RETURNURL
    }
)