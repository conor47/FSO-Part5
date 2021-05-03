import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

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
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`${user.username} was succesfully logged in`)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (exception){
      console.log("There was an error", exception)
    }
  }

  const handLogout = (event) => {
    window.localStorage.clear()
    document.location.reload(true)
    setMessage('Logged out')
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={''}>
      <input
        value={'temp'}
        onChange={''}
      />
      <button type="submit">save</button>
    </form>  
  )

    if(user===null){
      return(
        <div>
        <Notification message={message} classType={'error'} />
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type = "text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
            />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
            />
        </div>
        <button type="submit">Login</button>
      </form>
      </div>
      )
    }
    return (
      <div>
        <Notification message={message} classType={'success'} />
        <h2>Blogs</h2>
        <span>{`${user.username} logged in`}</span>
        <input type="button" value="Logout" onClick={handLogout}></input>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} 
      </div>
    )
      

     
  
}

export default App