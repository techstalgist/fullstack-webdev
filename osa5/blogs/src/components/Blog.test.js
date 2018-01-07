import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
    let blog, component, mockUpdate, mockDelete, user
    beforeAll(() => {
        user = {
            _id: 123,
            username: 'test',
            name: 'Test Test'
        }
        blog = {
            title: 'foobar',
            author: 'Foo Bar',
            url: 'www.foo.com',
            likes: 4,
            user: user
        }
        mockUpdate = jest.fn()
        mockDelete = jest.fn()
        component = shallow(<Blog blog={blog} updateBlog={mockUpdate} deleteBlog={mockDelete} loggedInUser={user} />)
    })
    it('shows only title and author by default', () => {
        const basicInfo = component.find('.basic-info')
        expect(basicInfo.text()).toContain(blog.title)
        expect(basicInfo.text()).toContain(blog.author)
        const div = component.find('.togglable-content')
        expect(div.getElement().props.style).toEqual({ display: 'none' })
    })

    it('shows additional content after clicking the title', () => {
        const basicInfo = component.find('.basic-info')
        basicInfo.simulate('click')
        const div = component.find('.togglable-content')
        expect(div.getElement().props.style).toEqual({ display: '' })
    })
})