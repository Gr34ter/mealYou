import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// styles
import './Signup.css'

export default function Signup() {
  const {signup, error, isPending} = useSignup()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    signup(email, password, displayName)
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h3>Signup</h3>
      <label>
        <span>email:</span>
        <input 
          required  
          type="email"
          onChange={(e) => {setEmail(e.target.value)}}
          value={email} 
          />
      </label>
      <label>
        <span>password:</span>
        <input 
          required  
          type="password"
          onChange={(e) => {setPassword(e.target.value)}}
          value={password} 
          />
      </label>
      <label>
        <span>display name:</span>
        <input 
          required  
          type="text"
          onChange={(e) => {setDisplayName(e.target.value)}}
          value={displayName} 
          />
      </label>
      {!isPending && <button>SIGN UP</button>}
      {isPending && <button disabled >Loading...</button>}
      {error && <p className='error'>{error}</p>}
    </form>
  )
}
