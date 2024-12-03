const { createSlice } = require("@reduxjs/toolkit");

const uesrSlice = createSlice({
    name: 'user',
    initialState:{
        isUserLoggedIn: false,
        user: {}
    },
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = {};
        },
        setIsUserLoggedIn: (state, action) => {
            state.isUserLoggedIn = action.payload;
        }
    }
})

export const {setUser, clearUser, setIsUserLoggedIn } = uesrSlice.actions;

export default uesrSlice.reducer;

export const selectCurrentUser = (state) => localStorage.getItem('accessToken') ? state.user.user : null;

export const selectIsUserLoggedIn = (state) => state.user.isUserLoggedIn;