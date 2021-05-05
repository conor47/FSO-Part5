import React, { useState } from 'react'


const Blog = ({ blog,handleLike, handleDelete }) => {
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

  return (
    <div style ={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} style={hiddenWhenVisible} id='viewButton'>View</button>
        <button onClick={toggleVisibility} style={showWhenVisible}>Hide</button>
        <br></br>
        <div className="togglableContent" style={showWhenVisible}>
          <div>Url : {blog.url}</div>
          <div>Author : {blog.author}</div>
          <div>Likes : {blog.likes}
            <button onClick={() => handleLike(blog)} id='likeButton'>like</button>
          </div>
        </div>
        <button style={showWhenVisible} id='deleteButton' onClick={() => handleDelete(blog)}>Remove</button>


      </div>
    </div>
  )}

export default Blog