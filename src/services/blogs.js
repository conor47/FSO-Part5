import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}` 
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async blogObject => {
  const config = {
    headers: { Authorization: token},
  }

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const addLike = async blogObject => {
  const newUrl = `${baseUrl}/${blogObject.id}`

  const updatedBlogObject = {
   ...blogObject, likes:blogObject.likes+1
  }
  const config = {
    headers: { Authorization: token},
  }

  try{
    const response = await axios.put(newUrl, updatedBlogObject, config)
    return response.data
  }catch(exception){
    console.log(exception);
  }
}

export default { getAll,setToken, createBlog, addLike }