import { configureStore } from "@reduxjs/toolkit";
import allBlogs from "../Slice/HomeDashBoardSlice";

const store = configureStore({
    reducer:{
        allBlogReducer : allBlogs,
    }
})

export default store