export interface CaptchaApiRes {
    msg: string,
    img: string,
    code: number,
    captchaEnabled: boolean,
    uuid: string
}