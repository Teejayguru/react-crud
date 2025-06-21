import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Register'
import Login from './Login'

const API_URL = 'http://localhost:4000/api/employees';

function App() {
  const [employees, setEmployees] = useState([])
  const [form, setForm] = useState({ name: '', job_role: '', native: '', salary: '' })
  const [editId, setEditId] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', job_role: '', native: '', salary: '' })
  const [page, setPage] = useState('home') // 'home', 'crud', 'register', 'login'
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  // Fetch employees from backend
  useEffect(() => {
    if (page === 'crud') {
      fetch(API_URL)
        .then(res => res.json())
        .then(setEmployees)
        .catch(() => setEmployees([]))
    }
  }, [page])

  // Add employee
  const handleAdd = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.job_role || !form.native || !form.salary) {
      setError('All fields are required')
      return
    }
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to add employee')
      const newEmp = await res.json()
      setEmployees([...employees, newEmp])
      setForm({ name: '', job_role: '', native: '', salary: '' })
    } catch (err) {
      setError('Error adding employee')
    }
  }

  // Delete employee
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    setEmployees(employees.filter(emp => emp.id !== id))
  }

  // Start edit
  const handleEdit = (emp) => {
    setEditId(emp.id)
    setEditForm({ name: emp.name, job_role: emp.job_role, native: emp.native, salary: emp.salary })
  }

  // Update employee
  const handleUpdate = async (e) => {
    e.preventDefault()
    setError('')
    if (!editForm.name || !editForm.job_role || !editForm.native || !editForm.salary) {
      setError('All fields are required')
      return
    }
    try {
      const res = await fetch(`${API_URL}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      })
      if (!res.ok) throw new Error('Failed to update employee')
      const updated = await res.json()
      setEmployees(employees.map(emp => emp.id === editId ? updated : emp))
      setEditId(null)
      setEditForm({ name: '', job_role: '', native: '', salary: '' })
    } catch (err) {
      setError('Error updating employee')
    }
  }

  // Home page UI
  if (page === 'home') {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(120deg, #f0f4f8 0%, #e0e7ef 100%)',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        overflow: 'hidden'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          padding: '56px 36px',
          textAlign: 'center',
          maxWidth: '420px',
          width: '100%'
        }}>
          <img src={reactLogo} alt="React Logo" style={{ width: 72, marginBottom: 20 }} />
          <h1 style={{ margin: '0 0 10px', fontWeight: 800, fontSize: '2.5rem', color: '#1a237e', letterSpacing: 1 }}>
            ProCRUD
          </h1>
          <p style={{ color: '#444', marginBottom: 28, fontSize: 17, fontWeight: 500 }}>
            The professional solution for managing employee records.<br />
            Fast, secure, and easy to use.
          </p>
          <button
            style={{
              background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 18, marginBottom: 14, cursor: 'pointer', width: '100%', fontWeight: 600, boxShadow: '0 2px 8px #1976d222'
            }}
            onClick={() => setPage('crud')}
          >
            Go to App
          </button>
          <button
            style={{
              background: '#43a047', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 18, marginBottom: 14, cursor: 'pointer', width: '100%', fontWeight: 600, boxShadow: '0 2px 8px #43a04722'
            }}
            onClick={() => setPage('register')}
          >
            Register
          </button>
          <button
            style={{
              background: '#6d4c41', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 18, cursor: 'pointer', width: '100%', fontWeight: 600, boxShadow: '0 2px 8px #6d4c4122'
            }}
            onClick={() => setPage('login')}
          >
            Login
          </button>
        </div>
        <p style={{ marginTop: 36, color: '#888', fontSize: 15 }}>
          &copy; {new Date().getFullYear()} ProCRUD. All rights reserved.
        </p>
      </div>
    )
  }

  // Register page
  if (page === 'register') {
    return (
      <Register
        onRegister={() => setPage('crud')}
        switchToLogin={() => setPage('login')}
      />
    )
  }

  // Login page
  if (page === 'login') {
    return (
      <Login
        onLogin={user => { setUser(user); setPage('crud'); }}
        switchToRegister={() => setPage('register')}
      />
    )
  }

  // Main CRUD app
  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fb', padding: 32 }}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Employee Management</h1>
      <button onClick={() => setPage('home')} style={{ marginBottom: '16px' }}>
        Home
      </button>
      <form onSubmit={editId ? handleUpdate : handleAdd} style={{ background: '#fff', padding: 24, borderRadius: 10, boxShadow: '0 2px 8px #0001', marginBottom: 32, maxWidth: 500 }}>
        <h2 style={{ marginTop: 0 }}>{editId ? 'Edit Employee' : 'Add Employee'}</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Employee Name"
            value={editId ? editForm.name : form.name}
            onChange={e => editId ? setEditForm({ ...editForm, name: e.target.value }) : setForm({ ...form, name: e.target.value })}
            style={{ flex: 1 }}
          />
          <input
            type="text"
            placeholder="Job Role"
            value={editId ? editForm.job_role : form.job_role}
            onChange={e => editId ? setEditForm({ ...editForm, job_role: e.target.value }) : setForm({ ...form, job_role: e.target.value })}
            style={{ flex: 1 }}
          />
          <input
            type="text"
            placeholder="Native"
            value={editId ? editForm.native : form.native}
            onChange={e => editId ? setEditForm({ ...editForm, native: e.target.value }) : setForm({ ...form, native: e.target.value })}
            style={{ flex: 1 }}
          />
          <input
            type="number"
            placeholder="Salary"
            value={editId ? editForm.salary : form.salary}
            onChange={e => editId ? setEditForm({ ...editForm, salary: e.target.value }) : setForm({ ...form, salary: e.target.value })}
            style={{ flex: 1 }}
          />
        </div>
        {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
        <button type="submit" style={{ marginTop: 16, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 16, fontWeight: 600 }}>
          {editId ? 'Update' : 'Add'} Employee
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setEditForm({ name: '', job_role: '', native: '', salary: '' }) }} style={{ marginLeft: 12 }}>
            Cancel
          </button>
        )}
      </form>
      <table style={{ width: '100%', maxWidth: 900, background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #0001', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#e3eafc' }}>
            <th style={{ padding: 10 }}>ID</th>
            <th style={{ padding: 10 }}>Name</th>
            <th style={{ padding: 10 }}>Job Role</th>
            <th style={{ padding: 10 }}>Native</th>
            <th style={{ padding: 10 }}>Salary</th>
            <th style={{ padding: 10 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td style={{ padding: 10 }}>{emp.id}</td>
              <td style={{ padding: 10 }}>{emp.name}</td>
              <td style={{ padding: 10 }}>{emp.job_role}</td>
              <td style={{ padding: 10 }}>{emp.native}</td>
              <td style={{ padding: 10 }}>{emp.salary}</td>
              <td style={{ padding: 10 }}>
                <button onClick={() => handleEdit(emp)} style={{ marginRight: 8 }}>Edit</button>
                <button onClick={() => handleDelete(emp.id)} style={{ color: 'white', background: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
