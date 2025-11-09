export type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type photosType = {
     small: string | null
    large: string | null
}

export type allPostsType = {
    id: number;
    message: string
    likes: string;
}
export type profileType = {
    userid: number;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string
    contacts: contactsType
    photos: photosType
}

export type allUsersType = {
    id: number;
    name: string;
    status: string;
    photos: photosType
    followed: boolean;
    totalCount: number
    error: string | null


}
export type fetchingUsersType = {
    items: Array<usersType>
    totalCount: number
    error: string | null

}

export type usersType = {
    id: number;
    name: string;
    status: string;
    photos: photosType
    followed: boolean;
}


export enum EnumsType {
    success = 10,
    followSuccess = 0
}