import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    posts: [],
    token: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        /**
         * @description Set the mode in the state
         * @param {Object} state
         * */
        setMode(state) {
            state.mode = state.mode === "light" ? "dark" : "light";
        },

        /**
         * @description Set the user and token in the state when the user logs in
         * @param {Object} state
         * @param {Object} action
         * @returns {void}
         * */
        setLogin(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        /**
         * @description Set the user and token to null when the user logs out
         * @param {Object} state
         * */
        setLogout(state) {
            state.user = null;
            state.token = null;
        },

        /**
         * @description Set the posts in the state
         * @param {Object} state
         * @param {Object} action
         */
        setPosts(state, action) {
            state.posts = action.payload;
        },

        /**
         * @description Add a post to the state
         * @param state
         * @param action
         */
        setPost(state, action) {
            state.posts = state.posts.map(post => {
                  if (post._id === action.payload.post_id) {
                      return action.payload.post;
                  }
                  return post;
              });
        },

        /**
         * @description Set the user friends in the state
         * @param state
         * @param action
         */
        setFriends(state, action) {
            if (state.user) {
                state.user.friends = action.payload;
            }else {
                console.log("No user found");
            }
        }


    }
});

export const { setMode, setLogin, setLogout,setPost ,setPosts, setFriends } = authSlice.actions;
export default authSlice.reducer;
