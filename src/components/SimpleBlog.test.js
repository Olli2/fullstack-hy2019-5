import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'



test('renders title, author and likes', () => {
    const blog = {
        title: 'titleTest',
        author: 'authorTest',
        likes: 10,
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    component.debug()

    expect(component.container).toHaveTextContent('titleTest')
    expect(component.container).toHaveTextContent('authorTest')
    expect(component.container).toHaveTextContent('blog has 10 likes')
})

test('clicking button twice calls handler twice', () => {

    const blog = {
        title: 'titleTest',
        author: 'authorTest',
        likes: 10,
    }
    const mockHandler = jest.fn()

    const component = render(
        <SimpleBlog blog={blog} onClick={mockHandler}/>
    )

    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})