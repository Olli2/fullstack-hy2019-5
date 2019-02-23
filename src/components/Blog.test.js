import React from 'react'
import { render } from 'react-testing-library'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'titleTest',
        author: 'authorTest',
        url: 'urlTest',
        likes: 10,
    }

    const component = render(
        <Blog blog={blog} />
    )

    //component olion container -kenttä sisältää komponentin koko html koodin
    expect(component.container).toHaveTextContent(
        'titleTest'
    )


})