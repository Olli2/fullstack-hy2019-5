import React from 'react'

const CreateBlogForm = ({
    handleCreate,
    title, handleTitleChange,
    author, handleAuthorChange,
    url, handleUrlChange
    }) => (
            <div>
                <h2>Uusi blogi</h2>
                <form onSubmit={ handleCreate }>
                    <div>
                        otsikko:
                        <input type="text" value={title} name="title" onChange={handleTitleChange}/>
                    </div>
                    <div>
                        kirjoittaja:
                        <input type="text" value={author} name="author" onChange={handleAuthorChange}/>
                    </div>
                    <div>
                        url:
                        <input type="text" value={url} name="url" onChange={handleUrlChange}/>
                    </div>
                    <button type="submit"> Luo </button>
                </form>
            </div>   
        )

  export default CreateBlogForm
