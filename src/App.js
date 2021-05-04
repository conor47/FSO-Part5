import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const blogFormRef = useRef()



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username,password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`${user.username} was succesfully logged in`)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (exception){
      console.log('There was an error', exception)
      setMessage('incorrect username or password')
      setTimeout(() => {
        setMessage('')
      }, 2000)
    }
  }

  const handLogout = () => {
    window.localStorage.clear()
    document.location.reload(true)
  }

  const addBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()
    blogService.createBlog(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${returnedBlog.title} has been added`)
        setTimeout(() => {
          setMessage('')
        },3000)
      }).catch(error => console.log(error))
  }

  const loginForm = () => (

    <Togglable buttonLabel="Log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <NewBlogForm createBlog={addBlog}/>
    </Togglable>
  )
  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} classType={'error'} />

      {user === null ?
        loginForm() :
        <div>
          <p>{`${user.username} logged in`}</p>
          <input type="button" value="Logout" onClick={handLogout}></input>
          <h2>Create New</h2>
          {blogForm()}
          {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs}/>
          )}
        </div>}
    </div>
  )




}

export default App