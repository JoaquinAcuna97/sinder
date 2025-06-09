import { useEffect, useState } from 'react'
import Login from './components/Login';
import Register from './components/Register';

import './App.css'
function App() {
  const [message, setMessage] = useState('Loading...')
  const [title, setTitle] = useState('Loading title...')
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    fetch('http://0.0.0.0:8000/')
      .then((res) => res.json())
      .then((data) => setMessage(data.message) & setTitle(data.title) )
      .catch((err) => setMessage('Failed to load message'))
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Hello from React</h1>
      <p>Backend says: {message}</p>
      <p>Title: {title}</p>
        <>
          {isLogin ? (
            <Login onSwitch={() => setIsLogin(false)} />
          ) : (
            <Register onSwitch={() => setIsLogin(true)} />
          )}
        </>
    </div>
  )
}

export default App