import { useState } from 'react'

function Update({ item, onUpdate, onCancel }) {
  const [value, setValue] = useState(item || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim() !== '') {
      onUpdate(value.trim())
    }
  }

  return (
    <div className="update-container">
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: '8px' }}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default Update
