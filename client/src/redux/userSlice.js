import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userCurrent: null,
  token: "",
  loading: false,
  error: false
}

export const userSlice = createSlice({
  name: 'userCurrent',
  initialState,
  reducers: {
    loginStart: (state) => { 
       state.loading = true
    },
    loginSuccess: (state, action) => {
        state.loading = false
        state.userCurrent = action.payload.user;
        state.token = action.payload.authToken;
    },
    loginFailure: (state) => {
        state.error = true;
        state.loading = false;
    },
    logout: (state) => {
        state.userCurrent = null;
        state.error = false;
        state.loading = false;
        state.token = "";
    },
    subscription: (state, action) => {
      if(state.userCurrent.subscribedusers.includes(action.payload)){
        state.userCurrent.subscribedusers.splice(
          state.userCurrent.subscribedusers.findIndex(userId => 
              userId === action.payload
            ),
            1
        );
      }
      else{
        state.userCurrent.subscribedusers.push(action.payload);
      }
    }
  },
})
 
export const { loginStart, loginSuccess, loginFailure, logout, subscription } = userSlice.actions

export default userSlice.reducer