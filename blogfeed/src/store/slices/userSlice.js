const { createSlice } = require("@reduxjs/toolkit");

const uesrSlice = createSlice({
    name: 'user',
    initialState:{
        user: null
    },
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    }
})

export const {setUser, clearUser } = uesrSlice.actions;

export default uesrSlice.reducer;

export const selectCurrentUser = (state) => localStorage.getItem('accessToken') ? state.user.user : null;