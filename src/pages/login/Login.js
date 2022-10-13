import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { Link } from 'react-router-dom'

// styles
import './Login.css'

export default function Login() {
  const { login, error, isPending } = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    login(email, password)
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h3>Login</h3>
      <Link to='/signup' className='navigate-to-registration'>or <span>Signup here</span></Link>
      <label>
        <span>email:</span>
        <input 
          required
          type="email"
          onChange={(e) => setEmail(e.target.value) }
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
          <input 
            required
            type="password"
            onChange={(e) => setPassword(e.target.value) }
            value={password}
          />
      </label>
      {!isPending && <button>LOGIN</button>}
      {isPending && <button disabled >Loading...</button>}
      {error && <p className='error'>{error}</p>}
    </form>
  )
}
