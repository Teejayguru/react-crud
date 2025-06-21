function Delete({ item, onDelete, onCancel }) {
  return (
    <div className="delete-container">
      <h2>Delete Item</h2>
      <p>Are you sure you want to delete this item?</p>
      <div style={{ margin: '16px 0' }}>
        <strong>{item}</strong>
      </div>
      <button onClick={onDelete} style={{ color: 'white', background: 'red', marginRight: '8px' }}>
        Delete
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}

export default Delete
