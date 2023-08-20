import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  videoCurrent: {},
  loading: false,
  error: false,
  download: "",
}

export const videoSlice = createSlice({
  name: 'videoCurrent',
  initialState,
  reducers: {
    singleVideoFetchStart: (state) => {
      state.loading = true;  
      state.error = false;  
    },
    singleVideoFetchSuccess: (state, action) => {
      state.loading = false;
      state.videoCurrent = action.payload;
    },
    singleVideoFetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    likes : (state, action ) => {
        if(!state.videoCurrent.likes.includes(action.payload)){
          state.videoCurrent.likes.push(action.payload);
          state.videoCurrent.dislikes.splice( 
              state.videoCurrent.dislikes.findIndex(userId => 
                userId === action.payload
              ),
            1
          );
        }
    },
    dislikes : (state, action ) => {
      if(!state.videoCurrent.dislikes.includes(action.payload)){
        state.videoCurrent.dislikes.push(action.payload);
        state.videoCurrent.likes.splice( 
            state.videoCurrent.likes.findIndex(userId => 
              userId === action.payload
            ),
          1
        );
      }
  },
  downloadVideo: (state, action) => {
    state.download = action.payload
  },
  },
})
 
export const { singleVideoFetchStart, singleVideoFetchSuccess , singleVideoFetchFailure, likes, dislikes, downloadVideo } = videoSlice.actions

export default videoSlice.reducer