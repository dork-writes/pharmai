import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Swal from 'sweetalert2';
import supabase from './config/supabase';

function App() {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const changePassword = async (e) =>
  {
    e.preventDefault();
    
    if (password !== confirmPassword)
    {
      Swal.fire({title: 'Passwords must match', icon: "error",  background: "#242424", color: "#fff"})
    }

    else if (password.length < 8)
    {
      Swal.fire({title: 'Passwords must be at least 8 characters long', icon: "error",  background: "#242424", color: "#fff"})
    }

    else
    {
      setLoading(true);

      const { data, error } = await supabase.auth.updateUser({ password });
      if (error)
      {
        Swal.fire({title: error.message, icon: "error",  background: "#242424", color: "#fff"})
      }

      else
      {
        Swal.fire({title: "Password updated successfully. Try logging in again to the mobile application", icon: "success",  background: "#242424", color: "#fff"});
      }

      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={changePassword}>
        <div>
          <label htmlFor="password" style={{width: '100%', textAlign: 'left'}}>New Password</label><br/>
          <input name="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
        </div>
        <br />
        <div>
          <label htmlFor="confirmPassword" style={{width: '100%', textAlign: 'left'}}>Confirm Password</label><br/>
          <input name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.currentTarget.value)} />
        </div>
        <br />
        <button type='submit' disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
      </form>
    </>
  )
}

export default App
