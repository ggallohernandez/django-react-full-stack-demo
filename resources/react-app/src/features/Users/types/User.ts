export type UserLoginParams = {
    email: string;
    password: string;
}

export type UserLogoutParams = {
    token: string;
}

export type User = {
    email: string;
    token: string;
}

export type UserLogoutResponse = {
    detail: string;
}