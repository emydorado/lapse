import { useNavigate } from 'react-router-dom';

import './RoutineCard.css';

function RoutineCard({ id, img, name, number_excercises }) {
	const navigate = useNavigate();
	const handleNavigate = () => navigate(`/preview/${id}`);

	return (
		<div id='routine-card-container' onClick={handleNavigate}>
			<img src={img} alt={name} />
			<div className='routine-info'>
				<h3>{name}</h3>
				<p className='regular-text'>{number_excercises} ejercicios</p>
			</div>
		</div>
	);
}

export default RoutineCard;
