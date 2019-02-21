import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginForm = () => (
    <div>
      <h2>Kirjaudu sisään</h2>

      <form onSubmit={ handleLogin }>
        <p value={errorMessage}></p>
        <div>
          Käyttäjätunnus
          <input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)}/>
        </div>

        <div>
          Salasana
          <input type="text" value={password} name="password" onChange={({target}) => setPassword(target.value)}/>
        </div>

        <button type="submit"> Kirjaudu </button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog._id} blog={blog} />
      )}
    </div>
  )

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('virhe salasanassa tai käyttäjätunnuksessa')
    }
    
  }

  return (
    <div>

      { user === null ? 
        loginForm() : 
        <div>
          <p>Kirjautuneena {user.name}</p>
          { blogForm() }
        </div>
      }

    </div>
  )
}

export default App