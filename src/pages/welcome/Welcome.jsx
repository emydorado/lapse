import { useNavigate } from 'react-router-dom';
import './welcome.css';

function Welcome() {
	const navigate = useNavigate();

	return (
		<>
			<div id='welcome-container'>
				<div className='top-section-welcome'>
					<p className='medium-text'>Bienvenido a</p>
					<img src='./src/assets/logo.png' alt='lapse logo' />
					<p className='regular-text'>Tu asistente inteligente de entrenamiento: empieza fuerte, descansa mejor.</p>
				</div>

				<div className='buttons'>
					<button onClick={() => navigate('/register')}>REGISTRARME</button>
					<button className='secondary-button'>INICIAR SESIÓN</button>
				</div>
			</div>
		</>
	);
}

export default Welcome;
