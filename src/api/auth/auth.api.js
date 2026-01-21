import authApi from "@/utils/auth.api";

export async function userLogin(form) {
    const response = await authApi.post("/login", form);
    return response.data;
}

export async function userLogout(refreshToken) {
    const response = await authApi.post("/logout", {refreshToken});
    return response.data;
}

export async function validateTokenAPI() {
    const response = await authApi.post("/validate");
    return response.data;
}       