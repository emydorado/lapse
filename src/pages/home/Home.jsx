import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
	const navigate = useNavigate();
	navigate;

	return (
		<div id='home-container'>
			<h1>Home</h1>
		</div>
	);
}

export default Home;
