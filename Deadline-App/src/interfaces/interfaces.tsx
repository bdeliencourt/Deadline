export interface UserActionProps{
    handleChangeUserAction(value:string) : void
};

export interface UserTokenContextProps{
    setUserToken ?: (value:string) => void,
    userToken?: string
}

export interface UserProfile{
    username?: string,
    firstname?: string,
    lastname?: string,
    email?: string,
    phone?: string,
    address?: string
}

export interface LoadingProps{
    text?: string
}