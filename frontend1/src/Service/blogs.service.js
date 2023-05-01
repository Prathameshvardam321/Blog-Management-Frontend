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