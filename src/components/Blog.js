import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog}) => {
  const blogStyle ={
    paddingTop :10,
    paddingLeft:2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

    const hiddenWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

  return (
    <div style ={blogStyle}>
      <div>
        {blog.title} {blog.author} 
        <button onClick={toggleVisibility} style={hiddenWhenVisible}>View</button>
        <button onClick={toggleVisibility} style={showWhenVisible}>Hide</button>
        <br></br>
        <div style={showWhenVisible}>Url : {blog.url}</div>
        <div style={showWhenVisible}>Author : {blog.author}</div>
        <div style={showWhenVisible}>Likes : {blog.likes}  
        <button onClick={() => blogService.addLike(blog)}>like</button>
        </div>


      </div> 
    </div> 
  )}

export default Blog