import React from 'react'
import PropTypes from 'prop-types'


const CreateBlogForm = ({ handleCreate, title, author, url }) => {
    delete title['reset']
    delete author['reset']
    delete url['reset']
    return (
        <div>
            <h2>Uusi blogi</h2>
            <form onSubmit={ handleCreate }>
                <div>
                    otsikko:
                    <input name="title" {...title} />
                </div>
                <div>
                    kirjoittaja:
                    <input name="author" {...author}/>
                </div>
                <div>
                    url:
                    <input name="url" {...url}/>
                </div>
                <button type="submit"> Luo </button>
            </form>
        </div>
    )
}

CreateBlogForm.propTypes = {
    title: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    url: PropTypes.object.isRequired,
    handleCreate: PropTypes.func.isRequired,
}

export default CreateBlogForm
