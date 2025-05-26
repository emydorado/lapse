import { useNavigate } from 'react-router-dom';
import './RoutineComponent.css';

function RoutineComponent({ name }) {
	const navigate = useNavigate();
	return (
		<>
			<div className='header'>
				<h1>RUTINA DE {name}</h1>
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
		</>
	);
}

export default RoutineComponent;
