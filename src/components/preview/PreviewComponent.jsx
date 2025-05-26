import { useNavigate, useParams } from 'react-router-dom';
import { routines } from '../../data/routines';
import ExcerciseCard from '../excerciseCard/excerciseCard';
import './PreviewComponent.css';

function PreviewComponent({ name, number_excercises, img }) {
	const { id } = useParams();
	const routine = routines.find((r) => r.id === parseInt(id));
	const navigate = useNavigate();

	return (
		<div id='preview-component-container'>
			<div id='upper-section'>
				<div className='routine-title'>
					<svg
						className='w-6 h-6 text-gray-800 dark:text-white'
						ariaHidden='true'
						xmlns='http://www.w3.org/2000/svg'
						width='50'
						height='50'
						fill='none'
						viewBox='0 0 24 24'
						onClick={() => navigate(-1)}
					>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='1.5'
							d='m14 8-4 4 4 4'
						/>
					</svg>

					<h2>RUTINA DE {name}</h2>
				</div>
				<div className='img-wrapper'>
					<img src={img} alt={name} />
				</div>
			</div>
			<div className='excercises-section'>
				<h3>{number_excercises} EJERCICIOS</h3>

				<div className='exercises-cards'>
					{routine.excercises.map((exercise) => (
						<ExcerciseCard
							key={exercise.number}
							name={exercise.name}
							repetitions={exercise.repetitions}
							series={exercise.series}
							number={exercise.number}
						/>
					))}
				</div>
				<div className='button-wrapper'>
					<button>COMENZAR RUTINA</button>
				</div>
			</div>
		</div>
	);
}

export default PreviewComponent;
