import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import { useField } from './hooks/useField'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const username = useField('text')
    const password = useField('text')
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')


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
    }, [])

    const handleLogin = async event => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username.value, password: password.value
            })
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            username.reset()
            password.reset()
        } catch(e) {
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
            title: title.value,
            author: author.value,
            url: url.value,
            likes: 2,
        }
        const createdBlog = await blogService.createNew(blog)
        setBlogs(blogs.concat(createdBlog))
    }

    const loginForm = () => (
        <div>
            <h2>Kirjaudu sisään</h2>

            <form onSubmit={ handleLogin }>
                <p value={errorMessage}></p>
                <div>
                  Käyttäjätunnus
                    <input
                        name="username"
                        type={username.type}
                        value={username.value}
                        onChange={username.onChange}/>
                </div>

                <div>
                    Salasana
                    <input
                        name="password"
                        type={password.type}
                        value={password.value}
                        onChange={password.onChange}/>
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
                    <Togglable buttonLabel='Luo blogi'>
                        <CreateBlogForm handleCreate={handleCreate} title={title} author={author} url={url}/>
                    </Togglable>
                    { blogForm() }
                </div>
            }
        </div>
    )
}

export default App