import { authAPI, securityAPI } from "../Api/Api.ts";
import { baseThunkType, inferActionsTypes } from "./stateRedux.ts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type thunkType = baseThunkType<actionsType>;
export type actionsType = inferActionsTypes<typeof authSlice.actions>;
export type initialStateType = typeof initialState;

export const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null,
    loading: false as boolean,
    error: null as string | null,
};

export const loginThunk = createAsyncThunk(
    "auth/loginThunk",
    async (data: any, thunkAPI) => {
        try {
            const response = await authAPI.login(data);
            await thunkAPI.dispatch(authThunk());
            await thunkAPI.dispatch(captchaThunk());
            return response;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const authThunk = createAsyncThunk(
    "auth/authThunk",
    async (_, thunkAPI) => {
        try {
            const data = await authAPI.authMe();
            if (data.resultCode === 0) {
                const { id, login, email } = data.data;
                return { id, login, email, isAuth: true };
            } else {
                return thunkAPI.rejectWithValue("Not authenticated");
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const captchaThunk = createAsyncThunk(
    "auth/captchaThunk",
    async (_, thunkAPI) => {
        try {
            const response = await securityAPI.captcha();
            return response.data.url;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const logoutThunk = createAsyncThunk(
    "auth/logoutThunk",
    async (_, thunkAPI) => {
        try {
            await authAPI.logout();
            return;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        getCaptchaUrl(state: initialStateType, action: PayloadAction<string>) {
            state.captchaUrl = action.payload;
        },
        setUserAuthData(
            state: initialStateType,
            action: PayloadAction<{
                id: number | null;
                email: string | null;
                login: string | null;
                isAuth: boolean;
            }>
        ) {
            const { id, email, login, isAuth } = action.payload;
            state.id = id;
            state.email = email;
            state.login = login;
            state.isAuth = isAuth;
        },
    },
    extraReducers: (builder) => {
        builder
            // loginThunk
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // authThunk
            .addCase(authThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authThunk.fulfilled, (state, action) => {
                state.loading = false;
                const { id, login, email, isAuth } = action.payload;
                state.id = id;
                state.login = login;
                state.email = email;
                state.isAuth = isAuth;
            })
            .addCase(authThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // captchaThunk
            .addCase(captchaThunk.fulfilled, (state, action) => {
                state.captchaUrl = action.payload;
            })
            .addCase(captchaThunk.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            // logoutThunk
            .addCase(logoutThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.loading = false;
                state.id = null;
                state.email = null;
                state.login = null;
                state.isAuth = false;
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const authReducer = authSlice.reducer;
export const {setUserAuthData,
    getCaptchaUrl} = authSlice.actions