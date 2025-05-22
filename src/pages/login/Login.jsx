import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
	return (
		<>
			<div id='contenedor-login'>
				<h2>INICIA SESIÓN EN LAPSE</h2>
				<p className='regular-text'>Completa los siguientes datos</p>
				<form>
					<div className='user-info'>
						<label className='input-label' htmlFor='email'>
							CORREO
						</label>
						<input type='email' placeholder='Ejemplo@email.com' required />

						<label className='input-label' htmlFor='password'>
							CONTRASEÑA
						</label>
						<input type='password' placeholder='Minimo 6 digitos' required />
					</div>

					<p>
						¿No tienes una cuenta? <Link to='/register'>Registrate</Link>
					</p>

					<button type='submit'>INICIAR SESIÓN</button>
				</form>
			</div>
		</>
	);
}

export default Login;
