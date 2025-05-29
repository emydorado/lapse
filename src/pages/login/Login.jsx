import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase/firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      
      navigate('/home');
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id='contenedor-login'>
        <h2>INICIA SESIÓN EN LAPSE</h2>
        <p className='regular-text'>Completa los siguientes datos</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='user-info'>
            <label className='input-label' htmlFor='email'>
              CORREO
            </label>
            <input 
              type='email' 
              name="email"
              placeholder='Ejemplo@email.com' 
              value={formData.email}
              onChange={handleChange}
              required 
            />

            <label className='input-label' htmlFor='password'>
              CONTRASEÑA
            </label>
            <input 
              type='password' 
              name="password"
              placeholder='Minimo 6 digitos' 
              value={formData.password}
              onChange={handleChange}
              required 
              minLength="6"
            />
          </div>

          <p>
            ¿No tienes una cuenta? <Link to='/register'>Registrate</Link>
          </p>

          <button type='submit' disabled={loading}>
            {loading ? 'CARGANDO...' : 'INICIAR SESIÓN'}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;