import React from 'react'
import { mount } from 'enzyme'
import App from './App'
jest.mock('./services/blogs')
import Login from './components/Login'
import blogService from './services/blogs'
import Blog from './components/Blog'

describe.only('<App />', () => {
    let app
  
    describe('when user is not logged in', () => {
      beforeEach(() => {
        app = mount(<App />)
      })
  
      it('renders only login form', () => {
        app.update()
        const loginForm = app.find(Login)
        expect(loginForm.length).toEqual(1)
        const contents = app.find('.contents')
        expect(contents.length).toEqual(0)
      })
    })
  
    describe('when user is logged in', ()=>{
      beforeEach(() => {
        const user = {
            token: 123,
            username: 'test',
            name: 'Test Test'
        }
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        app = mount(<App />)
      })
  
      it('renders all blogs', () => {
        app.update()
        const blogs = app.find(Blog)
        expect(blogs.length).toEqual(blogService.blogs.length)
        const loginForm = app.find(Login)
        expect(loginForm.length).toEqual(0)
      })
    })
})