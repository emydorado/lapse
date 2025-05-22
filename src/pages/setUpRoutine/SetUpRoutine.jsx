import NavMenu from '../../components/navMenu/NavMenu';
import NotDetected from '../../components/states/NotDetected';
import HeartRate from '../../components/states/HeartRate';
import Calculating from '../../components/states/Calculating';
import './setUpRoutine.css';

function SetUpRoutine() {
	return (
		<>
			<div id='setUpRoutine-container'>
				<div className='header'>
					<h1>Configura la rutina</h1>
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
							d='M6 18 17.94 6M18 18 6.06 6'
						/>
					</svg>
					<h3>1. Registra tu ritmo cardiaco </h3>
					<p className='regular-text'>
						Ve a la estación de toma de pulso para identificar tu ritmo cardiaco, esta información es la que tomamos de
						base para personalizar tus tiempos de descanso en tu rutina.
					</p>

					<NotDetected />
					<Calculating />
					<HeartRate />

					<p className='regular-text'>Coloca tu dedo indice en el sensor y mantenlo presionado.</p>
				</div>
			</div>

			<NavMenu />
		</>
	);
}

export default SetUpRoutine;
