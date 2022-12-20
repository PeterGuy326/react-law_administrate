export interface LoginByPasswordReq {
    uid: string,
    password: string
}

export interface LoginByPasswordRes {
    token: string
}

export interface RegisterReq {
    username: string,
    password: string
}

export interface RegisterRes {
    uid: string
}