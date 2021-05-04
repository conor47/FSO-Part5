import React from 'react'

const NewBlogForm = ({
    newTitle,
    newAuthor,
    newUrl,
    handleSubmit,
    handleTitleChange,
    handleUrlChange,
    handleAuthorChange
}) => {
    return (
        <div>
            <h2>New Blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                    title:
                    <input type="text" value={newTitle} name="title" onChange={handleTitleChange} />
                    </div>
                    <div>
                    Author:
                    <input type="text" value={newAuthor} name="author" onChange={handleAuthorChange} />
                    </div>
                    <div>
                    Url:
                    <input type="text" value={newUrl} name="url" onChange={handleUrlChange} />
                    </div>
                </div>
                <button type="submit">Create</button>
            </form>  
        </div>
    )
}

export default NewBlogForm