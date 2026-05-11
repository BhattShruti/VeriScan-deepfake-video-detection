// Temporary test file to verify React is working
// This is a simple test component

import React from 'react'

function TestApp() {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center',
      color: 'white',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh'
    }}>
      <h1>React is Working! ✅</h1>
      <p>If you see this, React is rendering correctly.</p>
      <p>Now check the original App.jsx</p>
    </div>
  )
}

export default TestApp

