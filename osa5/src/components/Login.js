import React from 'react'
const Login = ({login, username, handleChange, password}) => (
    <div>
        <h2>Log in to application</h2>

        <form onSubmit={login}>
          <div>
            username 
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div>
            password 
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button>kirjaudu</button>
        </form>
    </div > 
)

export default Login