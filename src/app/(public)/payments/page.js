"use client";

import { useState, useEffect } from "react";
import { createOrder, verifyPayment, paymentKey } from "../../../api/razorpay/razorpay.api";
import toast from "react-hot-toast";

export default function PayNowPage() {
    const [amount, setAmount] = useState("");
    const [razorpayKey, setRazorpayKey] = useState("");

    // Fetch Razorpay key from backend on mount
    useEffect(() => {
        const fetchKey = async () => {
            try {
                const data = await paymentKey();
                setRazorpayKey(data.keyId); // use keyId from backend
            } catch (err) {
                console.error("Failed to fetch Razorpay key", err);
            }
        };
        fetchKey();
    }, []);

    const handlePayment = async () => {
        
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        try {
            // 1. Create order with dynamic amount (paise)
            const order = await createOrder(Number(amount) * 100);

            if (!order?.razorpayOrderId) {
                toast.error("Failed to create order");
                return;
            }

            // 2. Razorpay options
            const options = {
                key: razorpayKey, // dynamic key from backend
                amount: order.amount,
                currency: order.currency,
                order_id: order.razorpayOrderId,
                name: "Your Company Name",
                description: "Secure Payment",
                handler: async function (response) {
                    await verifyPayment({
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                    });

                    toast.success("Payment successful");
                },
                modal: {
                    ondismiss: () => console.log("Payment popup closed"),
                },
                theme: { 
                    color: "#000000" 
                },
            };

            // 3. Open Razorpay checkout
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            toast.error("Payment failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-xl font-semibold text-white mb-4">
                    Complete Your Payment
                </h1>

                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mb-4 w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
                />

                <button
                    onClick={handlePayment}
                    className="px-6 py-3 bg-white text-black rounded font-medium hover:opacity-90"
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
}