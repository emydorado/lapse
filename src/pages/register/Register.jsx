import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
	return (
		<>
			<div id='contenedor-register'>
				<h2>REGISTRATE EN LAPSE</h2>
				<p className='regular-text'>Completa los siguientes datos</p>
				<form>
					<div className='user-info'>
						<label className='input-label' htmlFor='name'>
							NOMBRE
						</label>
						<input type='text' placeholder='Escribe tu nombre' required />

						<label className='input-label' htmlFor='email'>
							CORREO
						</label>
						<input type='email' placeholder='Ejemplo@email.com' required />

						<label className='input-label' htmlFor='password'>
							CONTRASEÑA
						</label>
						<input type='password' placeholder='Minimo 6 digitos' required />
					</div>

					<div className='measurments'>
						<div className='masurement'>
							<label className='input-label' htmlFor='age'>
								EDAD
							</label>
							<input type='number' placeholder='#' required />
						</div>

						<div className='masurement'>
							<label className='input-label' htmlFor='weigth'>
								PESO (KG)
							</label>
							<input type='number' placeholder='#' required />
						</div>

						<div className='masurement'>
							<label className='input-label' htmlFor='password'>
								ESTATURA (CM)
							</label>
							<input type='number' placeholder='#' required />
						</div>
					</div>
					<p>
						¿Ya estás registrado? <Link to='/login'>Inicia sesión</Link>
					</p>
					<button type='submit'>REGISTRARME</button>
				</form>
			</div>
		</>
	);
}

export default Register;
