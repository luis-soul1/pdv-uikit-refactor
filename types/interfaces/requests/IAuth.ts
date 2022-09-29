export interface ILogin {
  username: string
  password: string
}

export interface IRecovery {
  username: string
}

export interface IRecoveryResponse {
  email?: string
  info: string
  statusCode?: number
  message?: string[] | string
}

export interface IChangePassword {
  new_password: string
  reset_token: string
}

export interface IAuth {
  token: string
  token_expire: string
}

export interface INewToken {
  new_token: string
  token_expire: string
}

export interface IRefreshToken {
  refresh_token: string
  token_expire: string
}

export interface ICustomJWT {
  accessToken: string
  accessTokenExpires: number
}
