import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    let blog
    let component
    let mockHandler
    beforeAll(() => {
        blog = {
            title: 'foobar',
            author: 'Foo Bar',
            url: 'www.foo.com',
            likes: 4
        }
        mockHandler = jest.fn()
        component = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
    })
    it('renders title, author and likes', () => {
        const contentDiv = component.find('.content')
        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)

        const likesDiv = component.find('.likes')
        expect(likesDiv.text()).toContain(`${blog.likes} likes`)
    })

    it('clicking the button twice calls event handler twice', () => {
        const button = component.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })

})