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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  })

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('virhe salasanassa tai käyttäjätunnuksessa')
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    blogService.setToken(user.token)
    const blog = {
        title: title,
        author: author,
        url: url,
        likes: 2,
    }
    const createdBlog = await blogService.createNew(blog)
    setBlogs(blogs.concat(createdBlog))
  }

  const createBlogForm = () => (
    <div>
        <h2>Uusi blogi</h2>
        <form onSubmit={ handleCreate }>
            <div>
                otsikko:
                <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)}/>
            </div>
            <div>
                kirjoittaja:
                <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)}/>
            </div>
            <div>
                url:
                <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)}/>
            </div>
            <button type="submit"> Luo </button>
        </form>
    </div>   
  )

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
          <input type="text" value={password} name="password" onChange={({ target }) => setPassword(target.value)}/>
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

  return (
    <div>
      { user === null ? 
        loginForm() : 
        <div>
          <p>Kirjautuneena {user.name}</p>
          <button onClick={ handleLogout }> Kirjaudu ulos </button>
          { createBlogForm() }
          { blogForm() }
        </div>
      }
    </div>
  )
}

export default App