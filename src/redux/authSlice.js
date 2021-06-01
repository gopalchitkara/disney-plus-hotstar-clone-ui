import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userDetail: {
            isAuthorized: false,
            email: "",
            given_name: "",
            family_name: "",
            user_image: ""
        },
        showLoginScreen: false,
        checkingAuthState: true,
    },
    reducers: {
        showLoginScreen: (state) => {
            state.showLoginScreen = true;
        },
        hideLoginScreen: (state) => {
            state.showLoginScreen = false;
        },
        loadInitialAuth: (state, { payload }) => {
            if (payload.isAuthorized) {
                state.userDetail = payload;
            }
        },
        loginAsGuest: (state) => {
            console.log("logging in as guest");
            state.userDetail.isAuthorized = true;
            state.userDetail.email = "guest@gmail.com";
            state.userDetail.given_name = "john";
            state.userDetail.family_name = "doe";
            state.userDetail.user_image = "";
            state.showLoginScreen = false;

            window.localStorage.setItem('authState', JSON.stringify(state.userDetail));
        },
        logoutUser: (state) => {
            console.log("logging user out");
            state.userDetail.isAuthorized = false;
            state.userDetail.email = "";
            state.userDetail.given_name = "";
            state.userDetail.family_name = "";
            state.userDetail.user_image = "";

            window.localStorage.removeItem('authState')
        }
    },
})

// Action creators are generated for each case reducer function
export const { showLoginScreen, hideLoginScreen, loginAsGuest, logoutUser, loadInitialAuth } = authSlice.actions

export default authSlice.reducer