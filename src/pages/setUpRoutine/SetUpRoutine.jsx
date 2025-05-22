import { useNavigate } from 'react-router-dom';
import NavMenu from '../../components/navMenu/NavMenu';
import './setUpRoutine.css';

function SetUpRoutine() {
	const navigate = useNavigate();
	navigate;

	return (
		<>
			<div id='setUpRoutine-container'>
				<h1>Configura la rutina</h1>
			</div>
			<NavMenu />
		</>
	);
}

export default SetUpRoutine;
