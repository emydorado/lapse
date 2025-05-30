import { useNavigate } from 'react-router-dom';
import NavMenu from '../../components/navMenu/NavMenu.jsx';
import { routines } from '../../data/routines.js';
import RoutineCard from '../../components/routineCard/RoutineCard';
import './SelectRoutine.css';

function SelectRoutine() {
	const navigate = useNavigate();

	return (
		<>
			<div className='header'>
				<h1>Configura la rutina</h1>
				<svg
					onClick={() => navigate('/home')}
					className='w-6 h-6 text-gray-800 dark:text-white'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					fill='none'
					viewBox='0 0 24 24'
				>
					<path
						stroke='currentColor'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M6 18 17.94 6M18 18 6.06 6'
					/>
				</svg>
			</div>
			<div id='selectRoutine-container'>
				<h2>2. Selecciona tu rutina</h2>

				<div className='created-routines'>
					<div className='routines-container'>
						<h3>rutinas creadas por ti</h3>
						<svg
							className='w-6 h-6 text-gray-800 dark:text-white'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M5 12h14m-7 7V5'
							/>
						</svg>
					</div>
					<div className='your-routine-card'>
						<p className='regulars-text'>Aún no hay rutinas creadas por ti</p>
					</div>

					<p className='regular-text'>
						<b>
							<u>Ver más</u>
						</b>
					</p>
				</div>

				<div className='sugestions-container'>
					<h3>rutinas sugeridas</h3>
					<div className='routine-card'>
						{routines.map((routine) => (
							<RoutineCard
								key={routine.id}
								name={routine.name}
								img={routine.img}
								number_excercises={routine.number_excercises}
								id={routine.id}
							/>
						))}
					</div>
					<p className='regular-text'>
						<b>
							<u>Ver más</u>
						</b>
					</p>
				</div>
			</div>
		</>
	);
}

export default SelectRoutine;
