import { useEffect, useState } from 'react';
import './Modal.css';

function Modal({ onClose, onContinue }) {
	const [step, setStep] = useState(0);
	const [tiempo, setTiempo] = useState(60);

	useEffect(() => {
		const timers = [setTimeout(() => setStep(1), 0), setTimeout(() => setStep(2), 2000)];
		return () => timers.forEach(clearTimeout);
	}, []);

	useEffect(() => {
		if (step !== 2) return;
		if (tiempo <= 0) {
			setStep(3);
			return;
		}
		const intervalo = setInterval(() => {
			setTiempo((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(intervalo);
	}, [tiempo, step]);

	const formatTime = (segundos) => {
		const minutos = Math.floor(segundos / 60);
		const segundosRestantes = segundos % 60;
		return `${minutos.toString().padStart(1, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
	};

	return (
		<>
			{step === 1 && (
				<>
					<div className='modal-overlay'>
						<div className='modal-content'>
							<h2>Vuelve a la estación de toma de pulso</h2>
							<p className='regular-text'>
								Así determinaremos tu tiempo correcto de descanso entre series para tu rutina evitando la fatiga.
							</p>
							<p className='regular-text'>
								<b>Coloca tu dedo indice en el sensor y mantenlo presionado.</b>
							</p>
							<button className='primary-button' onClick={onClose}>
								Cancelar
							</button>
						</div>
					</div>
				</>
			)}
			{step === 2 && (
				<>
					<div className='modal-overlay'>
						<div className='modal-content'>
							<h1 id='modal-cronometer'>{formatTime(tiempo)}</h1>
							<div className='heart-bpm-text'>
								<svg
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
										d='M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z'
									/>
								</svg>

								<h2> 100 BPM</h2>
							</div>
							<div className='recomendations-info'>
								<p className='regular-text'>
									Hasta que no se regule tu ritmo cardiaco no podrás continuar <b>¡el descanso es importante!</b>
								</p>
								<p className='regular-text'>
									<b>Coloca tu dedo indice en el sensor y mantenlo presionado.</b>
								</p>
							</div>
						</div>
					</div>
				</>
			)}
			{step === 3 && (
				<>
					<div className='modal-overlay'>
						<div className='last-modal-content'>
							<h1 id='modal-cronometer'>0:00</h1>
							<div className='heart-bpm-text'>
								<svg
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
										d='M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z'
									/>
								</svg>

								<h2> 70 BPM</h2>
							</div>
							<div className='last-recomendations-info'>
								<h3>¡Tu ritmo cardiaco ya esta regulado!</h3>
								<p className='regular-text'>ya puedes continuar con tu rutina</p>
							</div>
							<button onClick={onContinue}>CONTINUAR</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default Modal;
