import axios from "axios";

const paymentApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payment`,
    headers: {
        "Content-Type": "application/json",
    },
});

export default paymentApi;