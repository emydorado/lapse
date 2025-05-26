import { useNavigate, useParams } from 'react-router-dom';
import { routines } from '../../data/routines';
import RoutineComponent from '../../components/routine/RoutineComponent';
import './Routine.css';

function Routine() {
	const { id } = useParams();
	const routine = routines.find((rec) => rec.id === parseInt(id));
	const navigate = useNavigate();
	navigate;

	return (
		<div id='Routine-container'>
			<RoutineComponent key={routine.id} name={routine.name} />
		</div>
	);
}

export default Routine;
