import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { routines } from '../../data/routines';
import NavMenuRoutine from '../../components/navMenuRoutine/NavMenuRoutine';
import './Routine.css';

function Routine() {
	const { id } = useParams();
	const routine = routines.find((rec) => rec.id === parseInt(id));
	const [ejercicios, setEjercicios] = useState(routine.excercises);
	const [ejercicioActual, setEjercicioActual] = useState(0);
	const [tiempo, setTiempo] = useState(0);
	const [activo, setActivo] = useState(false);

	const navigate = useNavigate();
	navigate;

	useEffect(() => {
		let intervalo = null;
		if (activo) {
			intervalo = setInterval(() => {
				setTiempo((t) => t + 1);
			}, 1000);
		}
		return () => clearInterval(intervalo);
	}, [activo]);

	const iniciarTiempo = () => setActivo(true);
	const pausarTiempo = () => setActivo(false);
	const reiniciarTiempo = () => {
		setTiempo(0);
		setActivo(false);
	};

	const restartTime = (segundos) => {
		const minutos = Math.floor(segundos / 60);
		const segundosRestantes = segundos % 60;
		return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
	};

	const finalizarSerie = () => {
		// Sumar una serie al ejercicio actual
		setEjercicios((prevEjercicios) => {
			const nuevosEjercicios = [...prevEjercicios];
			const ejercicioActualizado = { ...nuevosEjercicios[ejercicioActual] };

			// Incrementar series hechas
			ejercicioActualizado.seriesHechas += 1;

			// Verificar si se completaron todas las series
			if (ejercicioActualizado.seriesHechas >= ejercicioActualizado.seriesTotales) {
				ejercicioActualizado.completo = true;

				// Pasar al siguiente ejercicio si no es el último
				if (ejercicioActual < nuevosEjercicios.length - 1) {
					setTimeout(() => {
						setEjercicioActual(ejercicioActual + 1);
					}, 500); // Pequeño delay para mejor experiencia de usuario
				}
			}

			nuevosEjercicios[ejercicioActual] = ejercicioActualizado;
			return nuevosEjercicios;
		});

		// Reiniciar el temporizador
		reiniciarTiempo();
	};

	return (
		<div id='Routine-container'>
			<div className='header'>
				<h1>RUTINA DE {routine.name}</h1>
			</div>
			<div className='cronometer'>
				<p className='medium-text'>Tiempo de serie</p>
				<h1>{restartTime(tiempo)}</h1>
				<p className='regular-text'>
					<b>
						{ejercicios[ejercicioActual]?.number}. {ejercicios[ejercicioActual]?.name}
					</b>
				</p>
			</div>
			<div className='exercises-card-routine'>
				<h2>Rutina</h2>
				{ejercicios.map((ej, index) => (
					<div
						key={ej.number}
						className={`card-ejercicio ${index === ejercicioActual ? 'activo' : 'inactivo'} ${
							ej.completo ? 'completado' : ''
						}`}
					>
						{index === ejercicioActual ? (
							<div id='card-actual-exercise'>
								<div className='only-info-actual-exercise'>
									<div className='title-chevron'>
										<p id='exercise-title'>
											<b>
												{ej.number}. {ej.name}{' '}
											</b>
										</p>
										<svg
											className='w-6 h-6 text-gray-800 dark:text-white'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											width='44'
											height='44'
											fill='none'
											viewBox='0 0 24 24'
										>
											<path
												stroke='currentColor'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='1.5'
												d='m8 10 4 4 4-4'
											/>
										</svg>
									</div>
									<div className='actual-exercise-info-section'>
										<div className='repetitions-section'>
											<p className='regular-text'>Repeticiones</p>
											<p className='regular-text'>
												<b> {ej.repetitions}</b>
											</p>
										</div>
										<div className='series-section'>
											<p className='regular-text'>Series</p>
											<p className='regular-text'>
												<b>
													{ej.seriesHechas}/{ej.seriesTotales}
												</b>
											</p>
										</div>
									</div>
									<p className='regular-text'>
										<b>Tip:</b> {ej.tip}
									</p>
								</div>
								<button className='secondary-button' id='watch-tutorial-btn'>
									Ver Tutorial
									<svg
										id='play-icon'
										xmlns='http://www.w3.org/2000/svg'
										width='34'
										height='34'
										fill='none'
										viewBox='0 0 24 24'
									>
										<path
											stroke='#272d29'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='1.5'
											d='M8 18V6l8 6-8 6Z'
										/>
									</svg>
								</button>
							</div>
						) : (
							<div id='closed-exercise-card'>
								<p
									id='exercise-title'
									style={{
										color: ej.completo ? '#7d9807' : '#272d29',
										opacity: ej.completo ? 100 : 0.5,
									}}
								>
									<b>
										{ej.number}. {ej.name}
									</b>
								</p>
								<svg
									className='w-6 h-6 text-gray-800 dark:text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									width='44'
									height='44'
									fill='none'
									viewBox='0 0 24 24'
									style={{
										color: ej.completo ? '#7d9807' : '#272d29',
										opacity: ej.completo ? 100 : 0.5,
									}}
								>
									<path
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='1.5'
										d='m16 14-4-4-4 4'
									/>
								</svg>
							</div>
						)}
					</div>
				))}
			</div>
			<NavMenuRoutine activo={activo} onStart={iniciarTiempo} onPause={pausarTiempo} finishSeries={finalizarSerie} />
		</div>
	);
}

export default Routine;
