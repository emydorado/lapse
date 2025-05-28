import { useNavigate } from 'react-router-dom';

import './infoUser.css';

function InfoUser({ name, mail, estatura, peso, edad }) {
	const navigate = useNavigate();
	navigate;

	return (
		<div id='info-user-card'>
			<div className='user-name'>
				<h3>Nombre</h3>
				<p>{name}</p>
			</div>

			<div className='user-mail'>
				<h3>Correo</h3>
				<p>{mail}</p>
			</div>

      <div className='aditional-info'>

			<div className='user-edad'>
				<h3>Edad</h3>
				<p>{edad}</p>
			</div>

			<div className='user-estatura'>
				<h3>Estatura</h3>
				<p>{estatura}</p>
			</div>

			<div className='user-peso'>
				<h3>Peso</h3>
				<p>{peso}</p>
			</div>
		</div>
    </div>
	);
}

export default InfoUser;
