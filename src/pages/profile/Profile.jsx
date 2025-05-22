import { useNavigate } from 'react-router-dom';
import NavMenu from '../../components/navMenu/NavMenu';
import './profile.css';

function Profile() {
	const navigate = useNavigate();
	navigate;

	return (
		<>
			<div id='profile-container'>
				<h1>profile</h1>
			</div>
			<NavMenu />
		</>
	);
}

export default Profile;
