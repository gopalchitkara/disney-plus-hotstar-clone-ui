import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        type: "",
        message: ""
    },
    reducers: {
        showNotification: (state, { payload: { type, message } }) => {
            state.type = type;
            state.message = message;
        },
        clearNotification: (state) => {
            state.type = "";
            state.message = "";
        }
    },
})

// Action creators are generated for each case reducer function
export const { showNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer