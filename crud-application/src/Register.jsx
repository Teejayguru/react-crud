import { useState } from 'react'

function Register({ onRegister, switchToLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showForgot, setShowForgot] = useState(false)
  const [forgotUser, setForgotUser] = useState('')
  const [forgotMsg, setForgotMsg] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Username and password are required')
      return
    }
    // Save user to localStorage
    const user = { username, password }
    localStorage.setItem('crud-user', JSON.stringify(user))
    onRegister(user)
  }

  const handleForgot = (e) => {
    e.preventDefault()
    setForgotMsg('')
    const stored = localStorage.getItem('crud-user')
    if (!stored) {
      setForgotMsg('No user registered.')
      return
    }
    const user = JSON.parse(stored)
    if (user.username === forgotUser) {
      setForgotMsg(`Your password is: ${user.password}`)
    } else {
      setForgotMsg('Username not found.')
    }
  }

  return (
    <div className="auth-container fade-in" style={{ maxWidth: 350, margin: '60px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Register</h2>
      {!showForgot ? (
        <>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{ width: '100%', marginBottom: 12, padding: 8 }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', marginBottom: 12, padding: 8 }}
            />
            <button type="submit" style={{ width: '100%', background: '#43a047', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 0', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Register
            </button>
          </form>
          {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
          <p style={{ marginTop: 16 }}>
            Already have an account?{' '}
            <button onClick={switchToLogin} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
              Login
            </button>
          </p>
          <p style={{ marginTop: 8 }}>
            <button onClick={() => setShowForgot(true)} style={{ background: 'none', border: 'none', color: '#1976d2', cursor: 'pointer', textDecoration: 'underline' }}>
              Forgot Password?
            </button>
          </p>
        </>
      ) : (
        <>
          <form onSubmit={handleForgot}>
            <input
              type="text"
              placeholder="Enter your username"
              value={forgotUser}
              onChange={e => setForgotUser(e.target.value)}
              style={{ width: '100%', marginBottom: 12, padding: 8 }}
            />
            <button type="submit" style={{ width: '100%', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 0', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Recover Password
            </button>
          </form>
          {forgotMsg && <p style={{ color: forgotMsg.startsWith('Your') ? 'green' : 'red', margin: 0 }}>{forgotMsg}</p>}
          <p style={{ marginTop: 16 }}>
            <button onClick={() => setShowForgot(false)} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
              Back to Register
            </button>
          </p>
        </>
      )}
    </div>
  )
}

export default Register
