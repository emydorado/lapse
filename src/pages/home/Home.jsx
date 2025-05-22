import { useNavigate } from 'react-router-dom';
import NavMenu from '../../components/navMenu/NavMenu';
import './Home.css';

function Home() {
	const navigate = useNavigate();
	navigate;

	return (
		<>
			<div id='home-container'>
				<h2>Resumen de entrenamientos</h2>
				<h2>Tus rutinas</h2>
			</div>
			<NavMenu />
		</>
	);
}

export default Home;
