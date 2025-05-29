import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../services/firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    weight: '',
    height: ''
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
      // 1. Crear usuario (esto también lo autentica automáticamente)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      const user = userCredential.user;

      // 2. Guardar datos adicionales en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        email: formData.email,
        age: formData.age,
        weight: formData.weight,
        height: formData.height,
        createdAt: new Date()
      });

      // 3. Redirigir al onboarding (el usuario ya está autenticado)
      navigate('/onBoarding');
      
    } catch (error) {
      let errorMessage = 'Error al registrarse';
      switch(error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'El correo ya está en uso';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña debe tener al menos 6 caracteres';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Correo electrónico no válido';
          break;
        default:
          errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id='contenedor-register'>
        <h2>REGISTRATE EN LAPSE</h2>
        <p className='regular-text'>Completa los siguientes datos</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='user-info'>
            <label className='input-label' htmlFor='name'>
              NOMBRE
            </label>
            <input 
              type='text' 
              name="name"
              placeholder='Escribe tu nombre' 
              value={formData.name}
              onChange={handleChange}
              required 
            />

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

          <div className='measurments'>
            <div className='masurement'>
              <label className='input-label' htmlFor='age'>
                EDAD
              </label>
              <input 
                type='number' 
                name="age"
                placeholder='#' 
                value={formData.age}
                onChange={handleChange}
                required 
                min="12"
                max="120"
              />
            </div>

            <div className='masurement'>
              <label className='input-label' htmlFor='weight'>
                PESO (KG)
              </label>
              <input 
                type='number' 
                name="weight"
                placeholder='#' 
                value={formData.weight}
                onChange={handleChange}
                required 
                min="30"
                max="300"
              />
            </div>

            <div className='masurement'>
              <label className='input-label' htmlFor='height'>
                ESTATURA (CM)
              </label>
              <input 
                type='number' 
                name="height"
                placeholder='#' 
                value={formData.height}
                onChange={handleChange}
                required 
                min="100"
                max="250"
              />
            </div>
          </div>
          <p>
            ¿Ya estás registrado? <Link to='/login'>Inicia sesión</Link>
          </p>
          <button type='submit' disabled={loading}>
            {loading ? 'REGISTRANDO...' : 'REGISTRARME'}
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;