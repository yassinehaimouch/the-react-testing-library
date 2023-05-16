import './App.css';

function App() {
  return (
    <div className="container my-5">
      <form>
        <div className='mb-3'>
          <label className='form-label' htmlFor='email'>Email Adress</label>
          <input type='email' id='email' name='email' className='form-control'/>
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' className='form-control'/>
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='confirm-password'>Confirm Password</label>
          <input type='password' id='confirm-password' name='confirm-password' className='form-control'/>
        </div>
      </form>
    </div>
  );
}

export default App;
