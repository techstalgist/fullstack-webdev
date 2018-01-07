let token = null

const user = {
    _id: "5a437a9e514ab7f168ddf138",
    username: "mluukkai",
    name: "Matti Luukkainen"
}

const blogs = [
  {
    _id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    author: 'Foo Bar',
    url: 'www.html.com',
    likes: 3,
    user: user
  },
  {
    _id: "5a451e21e0b8b04a45638211",
    title: "JS on vaikeaa",
    author: 'Bar Baz',
    url: 'www.js.com',
    likes: 2,
    user: user
  }
]

const setToken = (newToken) => {
    if (newToken === null) {
      token = null
    } else {
      token = `bearer ${newToken}`
    }
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs, setToken }