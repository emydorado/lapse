import { useNavigate } from 'react-router-dom';
import './infoUser.css';

function InfoUser({ name, mail, estatura, peso, edad }) {
	const navigate = useNavigate();
	navigate;

	return (
		<div id='info-user-card'>
			<div className='user-name'>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width='20' height='20' fill='#272d29'>
					<path d='M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z' />
				</svg>
				<p className='regular-text'>{name}</p>
			</div>

			<div className='user-mail'>
				<svg
					class='w-6 h-6 text-gray-800 dark:text-white'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					width='20'
					height='20'
					fill='none'
					viewBox='0 0 24 24'
				>
					<path
						stroke='#272d29'
						strokeLinecap='round'
						strokeWidth='2'
						d='m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z'
					/>
				</svg>

				<p className='regular-text'>{mail}</p>
			</div>

			<div className='aditional-info'>
				<div className='user-edad'>
					<p className='regular-text'>
						<b>Edad:</b>
					</p>
					<p className='regular-text'>{edad}</p>
				</div>

				<div className='user-estatura'>
					<p className='regular-text'>
						<b>Estatura:</b>
					</p>
					<p className='regular-text'>{estatura}cm</p>
				</div>

				<div className='user-peso'>
					<p className='regular-text'>
						<b>Peso:</b>
					</p>
					<p className='regular-text'>{peso}kg</p>
				</div>
			</div>
		</div>
	);
}

export default InfoUser;
