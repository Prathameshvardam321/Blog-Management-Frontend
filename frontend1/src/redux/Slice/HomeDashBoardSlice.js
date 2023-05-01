import { createSlice } from "@reduxjs/toolkit";
// import getAllBlogs from "../../Services/blogs.service";
const initialState = { allPosts: [], typeOfBlog: '', numberOfLikes: 0}
const allBlogs = createSlice({
    name: 'all-post-blogs',
    initialState,
    reducers:
    {
        getAllBlogs: (state, actions) => {
            state.allPosts = actions.payload
        },
        selectTypeOfBlog: (state, actions) => {
            state.typeOfBlog = actions.payload
        },
        getNumberOfLikes: (state, actions) => {
            state.numberOfLikes = actions.payload
        },
        
    }
})

export const { getAllBlogs, selectTypeOfBlog, getNumberOfLikes} = allBlogs.actions
export default allBlogs.reducer