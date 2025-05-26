import { useNavigate } from 'react-router-dom';
import './SelectRoutine.css';

function SelectRoutine() {
	const navigate = useNavigate();
	navigate;

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
			<div id='selectRoutine-container'>
				<h2>2. Selecciona tu rutina</h2>

				<div className='routines-container'>
					<h3>rutinas creadas por ti</h3>
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
							d='M5 12h14m-7 7V5'
						/>
					</svg>
				</div>
				<p className='regular-text'>
					<b>
						<u>Ver más</u>
					</b>
				</p>

				<div className='routines-container'>
					<h3>rutinas sugeridas</h3>
				</div>
				<p className='regular-text'>
					<b>
						<u>Ver más</u>
					</b>
				</p>
			</div>
		</>
	);
}

export default SelectRoutine;
