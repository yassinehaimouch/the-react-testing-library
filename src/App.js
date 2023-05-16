import { useState } from 'react';
import validator from 'validator'
import './App.css';

function App() {
  const [signInput, setSignInput] = useState({email: "", password: "", confirmPassword: ""});
  const [error, setError] = useState();
 
  const changeHandler = (e) => setSignInput({...signInput, [e.target.name]: e.target.value});

  const clickHandler = (e) => {
    e.preventDefault();
    if(!validator.isEmail(signInput.email)){
      return setError('the email you input is invalid');
    }
  }

  return (
    <div className="container my-5">
      <form>
        <div className='mb-3'>
          <label className='form-label' htmlFor='email'>Email Adress</label>
          <input id='email' name='email' className='form-control' value={signInput.email} onChange={changeHandler}/>
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' className='form-control' value={signInput.password} onChange={changeHandler}/>
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='confirm-password'>Confirm Password</label>
          <input type='password' id='confirm-password' name='confirmPassword' className='form-control' value={signInput.confirmPassword} onChange={changeHandler}/>
        </div>
        {error && <p className='text-danger'>{error}</p>}
        <button type='submit' className='btn btn-primary' onClick={clickHandler}>Submit</button>
      </form>
    </div>
  );
}

export default App;
