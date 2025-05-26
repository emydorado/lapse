import { useNavigate } from 'react-router-dom';

import './RoutineCard.css';

function RoutineCard({ img, name, number_excercises }) {
	const navigate = useNavigate();
	navigate;

	return (
		<div id='routine-card-container'>
			<img src={img} alt={name} />
			<div className='routine-info'>
				<h4>{name}</h4>
				<p className='small-text'>{number_excercises} ejercicios</p>
			</div>
		</div>
	);
}

export default RoutineCard;
