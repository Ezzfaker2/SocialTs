import axios from "axios";
import {allUsersType, fetchingUsersType, profileType} from "../../Types/Types.ts";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "d14b2cfd-9daa-4c5f-8a63-ccbf3f51f9e8"
    }
});

export type followType = {
    id: number, email: string, login: string;
}
export type userUpdateStatusType = {
    id: number; email: string; login: string;
}
export type loginType = {
    id: number; email: string; login: string;
}
export type updateProfileInfo = {
    id: number; email: string; login: string;
}
export type SavePhotoType = {
    small: string; large: string;
}
export type captchaType = {
    url: string
}
export type authMeType = {
    id: number, email: string, login: string
}
type responseType<D = {}> = {
    data: D, messages: string[], resultCode: number
}


export const usersAPI = {
    getUsers: (currentPage, pageSize, term, friend ) => {
        return instance.get<fetchingUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term} ` + (friend === null ? "" : `&friend=${friend}`))
            .then(response => response.data)
    },
    userProfile: async(userId: number) => {
        return  await instance.get<profileType>(`profile/${userId}`).then(response => response.data);
    },
    follow: (userId: number) => {
        return instance.post<responseType<followType>>(`follow/${userId}`).then(response => response.data);
    },
    unfollow: (userId: number) => {
        return instance.delete<responseType<followType>>(`follow/${userId}`).then(response => response.data);
    },
    userStatus: (userId: number) => {
        return instance.get<string>(`profile/status/2`)
    },
    userUpdateStatus: (status: string) => {
        return instance.put<responseType<userUpdateStatusType>>(`profile/status/`, {status: status}).then(response => response.data);
    }
}
export const profileAPI = {
    SavePhoto: (photoFile: any) => {
        let formData = new FormData();
        formData.append('image', photoFile);
        return instance.put<responseType<SavePhotoType>>(`profile/photo`, formData, {headers: {'Content-Type': "multipart/form-data"}});
    },
    updateProfileInfo: (profileInfo: profileType) => {
        return instance.put<responseType<updateProfileInfo>>(`profile`, profileInfo);
    }
}
export const authAPI = {
    login: ({email, password, rememberMe}) => {
        return instance.post<loginType>(`auth/login`, {email, password, rememberMe})
    },
    authMe: () => {
        return instance.get<responseType<authMeType>>('auth/me').then(response => response.data);
    },
    logout: () => {
        return instance.delete<responseType<loginType>>(`auth/login`)
    }
}
export const securityAPI = {
    captcha: () => {
        return instance.get<captchaType>(`security/get-captcha-url`);
    }
}