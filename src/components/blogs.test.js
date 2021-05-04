import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Component displaying a blog', () => {

  const blog = {
    author : 'test author',
    title : 'test title',
    url : 'test url'
  }

  let component
  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('test title test author')
  })

  test ('at the start toggled content is not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})

describe('Component after view button is clicked', () => {

  test('clicking the button calls the event handler once', () => {

    const blog = {
      author : 'test author',
      title : 'test title',
      url : 'test url'
    }

    const component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('View')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toBeVisible()
  })

  test('clicking the like button twice causes handled to be called twice', () => {

    const blog = {
      author : 'test author',
      title : 'test title',
      url : 'test url'
    }
    const handleLike = jest.fn()

    const component = render(
      <Blog blog={blog} handleLike={handleLike} />
    )

    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})


