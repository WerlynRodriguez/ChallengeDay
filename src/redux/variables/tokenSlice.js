import { createSlice } from "@reduxjs/toolkit";

/** The token slice is used to store the token */
export const tokenSlice = createSlice({
    name: "token",
    initialState: {
        /** @type {String | null} The token */
        value: null,
    },
    reducers: {
        /** Set the token
         * @param {Object} state - The state
         * @param {Object} action - The action */
        setToken: (state, action) => {
            state.value = action.payload;
        },
        deleteToken: (state) => {
            state.value = null;
        },
    },
});

/** The set token actions */
export const { setToken, deleteToken } = tokenSlice.actions;

/** set the token async is used to set the token async
 * Is helpful when you want to set the token after a fetch
 * @param {String} token - The token */
export const setAsyncToken = (token) => (dispatch) => {
    dispatch(setToken(token));
};

/** The token selector is used to get the token
 * @param {Object} state - The state */
export const selectToken = (state) => state.token.value;

export default tokenSlice.reducer;