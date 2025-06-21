import { useState } from 'react'

function Login({ onLogin, switchToRegister }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    const stored = localStorage.getItem('crud-user')
    if (!stored) {
      setError('No user registered. Please register first.')
      return
    }
    const user = JSON.parse(stored)
    if (user.username === username && user.password === password) {
      onLogin(user)
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Don't have an account?{' '}
        <button onClick={switchToRegister} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
          Register
        </button>
      </p>
    </div>
  )
}

export default Login
