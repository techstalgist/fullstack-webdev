import React from 'react'
const Login = ({login, username, handleChange, password}) => (
    <div>
        <h2>Log in to application</h2>

        <form onSubmit={login}>
          <div className="row">
            <div className="column left">username</div>
            <div className="column right"> 
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="column left">password</div>
            <div className="column right"> 
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button>log in</button>
        </form>
    </div > 
)

export default Login