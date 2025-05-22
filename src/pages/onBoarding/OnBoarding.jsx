import { useNavigate } from 'react-router-dom';
import './OnBoarding.css';

function OnBoarding() {
	const navigate = useNavigate();
	return (
		<div id='onBorading-container'>
			<h1>ENTRENA CON PROPÓSITO</h1>
			<p className='regular-text'>
				Lapse se adapta a tu ritmo y te ayuda a encontrar el equilibrio perfecto entre esfuerzo y recuperación.
			</p>

			<div className='mid-section'>
				<img src='src/assets/onBoardingImg.png' alt='ilustración demostrativa' />

				<ul>
					<li>Personaliza tus rutinas</li>
					<li>Logra metas realistas</li>
					<li>Temporizadores de descanso inteligentes </li>
					<li>Recomendaciones de recuperación solo para ti</li>
				</ul>
			</div>

			<p className='regular-text'>Todo lo que necesitas para comenzar tu camino, sin abrumarte. </p>

			<div className='next-step'>
				<p className='regular-text'>Te haremos unas preguntas rápidas para personalizar tu experiencia.</p>
				<button onClick={() => navigate('/trainingGoals')}>SIGUIENTE</button>
			</div>
		</div>
	);
}

export default OnBoarding;
