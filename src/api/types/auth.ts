export interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: "CUSTOMER" | "ADMIN" | "MANAGER";
}

export interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}