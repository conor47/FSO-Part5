import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs }) => {
  const blogStyle ={
    paddingTop :10,
    paddingLeft:2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hiddenWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = (blog) => {

    const newBlog = { ...blog, likes:blog.likes+1 }
    blogService.updateBlog(blog.id, newBlog)
  }

  const handleDelete = (blog) => {
    if(window.confirm(`Confirm deletion of blog titled : ${blog.title}`)){
      blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(p => p.id !== blog.id))
    }
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
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <button style={showWhenVisible} onClick={() => handleDelete(blog)}>Remove</button>


      </div>
    </div>
  )}

export default Blog