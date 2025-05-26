import { useNavigate } from 'react-router-dom';
import PreviewComponent from '../../components/preview/PreviewComponent';
import { useParams } from 'react-router-dom';
import { routines } from '../../data/routines';
import './Preview.css';

function Preview() {
	const { id } = useParams();
	const routine = routines.find((rec) => rec.id === parseInt(id));

	const navigate = useNavigate();

	return (
		<>
			<div className='header'>
				<h1>PREVIEW</h1>
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

			<PreviewComponent
				key={routine.id}
				img={routine.img}
				name={routine.name}
				number_excercises={routine.number_excercises}
			/>
		</>
	);
}

export default Preview;
