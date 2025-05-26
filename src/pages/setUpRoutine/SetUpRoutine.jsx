import NavMenu from '../../components/navMenu/NavMenu';
import NotDetected from '../../components/states/NotDetected';
import HeartRate from '../../components/states/HeartRate';
import Calculating from '../../components/states/Calculating';
import './setUpRoutine.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SetUpRoutine() {
	const [step, setStep] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		const timers = [
			setTimeout(() => setStep(1), 2000),
			setTimeout(() => setStep(2), 4000),
			setTimeout(() => setStep(3), 6000),
		];

		return () => timers.forEach(clearTimeout);
	}, []);

	const handleContinue = () => {
		navigate('/selectRoutine');
	};

	return (
		<>
			<div className='header'>
				<h1>Configura la rutina</h1>
				<svg
					onClick={() => navigate('/home')}
					class='w-6 h-6 text-gray-800 dark:text-white'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					fill='none'
					viewBox='0 0 24 24'
				>
					<path
						stroke='currentColor'
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='2'
						d='M6 18 17.94 6M18 18 6.06 6'
					/>
				</svg>
			</div>
			<div id='setUpRoutine-container'>
				<h2>1. Registra tu ritmo cardiaco </h2>
				<p className='regular-text'>
					Ve a la estación de toma de pulso para identificar tu ritmo cardiaco, esta información es la que tomamos de
					base para personalizar tus tiempos de descanso en tu rutina.
				</p>

				{step === 1 && (
					<>
						<NotDetected />
						<div className='indication-text'>
							<p className='regular-text'>Coloca tu dedo indice en el sensor y mantenlo presionado.</p>
						</div>
					</>
				)}
				{step === 2 && (
					<>
						<Calculating />
						<div className='indication-text'>
							<p className='regular-text'>Coloca tu dedo indice en el sensor y mantenlo presionado.</p>
						</div>
					</>
				)}
				{step === 3 && (
					<>
						<HeartRate />
						<div className='indication-text'>
							<p className='regular-text'>Ya puedes continuar configurando tu rutina.</p>

							<button className='continue-btn' onClick={handleContinue}>
								Continuar
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default SetUpRoutine;
