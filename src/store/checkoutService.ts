import api from "../api/axiosInstance";

export const CheckoutService = {
  createSession: (data: {
    shippingAddress: string;
    successUrl: string;
    cancelUrl: string;
  }) => api.post("/checkout/create", data),
};
