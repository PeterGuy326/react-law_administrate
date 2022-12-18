export interface LoginByPasswordReq {
    uid: string,
    password: string
}

export interface LoginByPasswordRes {
    token: string
}