import paymentApi from "@/utils/paymentApi";
import { store } from "@/redux/store"; 

const state = store.getState();             
const username = state.auth.username || "devaaliwal";  

export async function createOrder(amount) {
    const response = await paymentApi.post("/create-order", {
        userId: username,
        amount: amount,
        currency: "INR",
        description: "Product purchase",
    });

    return response.data;
}

export async function verifyPayment(payload) {
    const response = await paymentApi.post("/verify", payload);
    return response.data;
}

export async function paymentKey() {
    const response = await paymentApi.get("/key");
    return response.data;
}