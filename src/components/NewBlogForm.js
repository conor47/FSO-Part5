import React,{ useState } from 'react'



const NewBlogForm = ({
  createBlog
}) => {

  const [newTitle, setTitle] = useState ('')
  const [newAuthor, setAuthor] = useState ('')
  const [newUrl, setUrl] = useState ('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title:newTitle,
      author:newAuthor,
      url:newUrl
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleAuthorChange = (event)  => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event)  => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event)  => {
    setUrl(event.target.value)
  }

  return (
    <div className='formDiv'>
      <h2>New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <div>
                    title:
            <input type="text" value={newTitle} name="title" id="title" onChange={handleTitleChange} />
          </div>
          <div>
                    Author:
            <input type="text" value={newAuthor} name="author" id="author" onChange={handleAuthorChange} />
          </div>
          <div>
                    Url:
            <input type="text" value={newUrl} name="url" id="url" onChange={handleUrlChange} />
          </div>
        </div>
        <button type="submit" id="newBlog-button">Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm