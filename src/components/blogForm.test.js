import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './NewBlogForm'

describe('testing form submission', () => {
  test('Form submission updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
      target: { value : 'testing author' }
    })
    fireEvent.change(title, {
      target: { value : 'testing title' }
    })
    fireEvent.change(url, {
      target: { value : 'testing url' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('testing author')
    expect(createBlog.mock.calls[0][0].title).toBe('testing title' )
    expect(createBlog.mock.calls[0][0].url).toBe('testing url' )
  })

})
