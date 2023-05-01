import axios from 'axios'

let headerConfig = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}
const url = "http://localhost:4000/api/v1/";



export const signedup = async (obj) => {
    let response = await axios.post(url + "users", obj)
    return response
}

export const signedin = async (obj) => {
    let response = await axios.post(url + "users/login", obj)
    console.log(response)
    return response
}



export async function getAllBlogsService() {
    let response = await axios.get(url + "post")
    return response
}

export async function deleteBlogsService(id) {
    let response = await axios.delete(url + "post/deletePost/" + id, headerConfig)
    return response
}

export async function createPostService(id) {
    let response = await axios.post(url + "post", id, headerConfig)
    return response
}
///:id/viewPost/:Email
export async function viewPostService(id,email,obj) {
    let response = await axios.post(`${url}post/${id}/viewPost/${email}`,obj, headerConfig)
    console.log(`${url}post/${id}/viewPost/${email}`);
    return response
}


export async function getPostByIdService(id) {
    let response = await axios.get(`${url}post/getPostById/${id}`, headerConfig)
    return response
}

export async function getEmailOfUser() {
    let response = await axios.get(url + "users/getUserEmail", headerConfig)
    return response
}



export async function findMyPost(email) {
    let response = await axios.get(url + "post/findMyPost/" + email, headerConfig)
    return response
}

export async function findLikedPost(email) {
    let response = await axios.get(url + "post/findMyLikedPost/" + email, headerConfig)
    return response
}



export async function likeButtonService(id, email, obj) {
    let response = await axios.put(url + "post/" + id + "/like/" + email, obj, headerConfig)
    return response
}



export async function findPostBySearchText(text){
    let response = await axios.get(url+"post/getAllPost/" + text, headerConfig)
    return response
}



export async function arrangeByLikesSortHighToLowService(){
    let response = await axios.get(url+"post/arrangeByLikesSortHighToLow", headerConfig)
    return response
}


export async function arrangeByLikesSortLowToHigh(){
    let response = await axios.get(url+"post/arrangeByLikesSortLowToHigh", headerConfig)
    return response
}



export async function postComments(parentId,authorName,obj){
    let response = await axios.post(url+"post/comment/"+parentId+"/"+authorName,obj, headerConfig)
    return response
}

export async function findAllComments(parentId){
    let response = await axios.get(url+"post/comment/"+parentId, headerConfig)
    return response
}



export async function deleteComment(parentId){
    let response = await axios.delete(url+"post/comment/"+parentId, headerConfig)
    return response
}

export async function updatePostService(id,obj){
    let response = await axios.put(url+"post/editpost/"+id, obj, headerConfig)
    return response
}



export async function sendEmailForComment(authorName,obj,commentAuthor){
    let response = await axios.put(url+"post/sendEmail/"+authorName+"/"+commentAuthor, obj, headerConfig)
    return response
}