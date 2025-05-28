import { useNavigate } from 'react-router-dom';
import './NavMenuRoutine.css';

function NavMenuRoutine({ activo, onStart, onPause, finishSeries }) {
	const navigate = useNavigate();

	return (
		<div id='navMenuRoutine-container'>
			<div className='black-icon' onClick={onPause}>
				<div className='only-svg-black-icon'>
					<svg xmlns='http://www.w3.org/2000/svg' width='34' height='34' fill='none' viewBox='0 0 24 24'>
						<path
							stroke='#ffffff'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='1.5'
							d='M9 6H8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm7 0h-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Z'
						/>
					</svg>
				</div>
				<p className='small-text'>Pausar</p>
			</div>

			<div className='big-black-icon' onClick={!activo ? onStart : finishSeries}>
				<div className='only-svg-big-black-icon'>
					{!activo ? (
						// Ícono de play
						<svg
							id='play-icon'
							xmlns='http://www.w3.org/2000/svg'
							width='70'
							height='70'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='#ffffff'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='1'
								d='M8 18V6l8 6-8 6Z'
							/>
						</svg>
					) : (
						// Ícono de octágono
						<svg
							id='octagon-icon'
							xmlns='http://www.w3.org/2000/svg'
							width='40'
							height='40'
							viewBox='0 0 100 100'
							fill='none'
							stroke='#ffffff'
							strokeWidth='10'
						>
							<polygon points='30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30' />
						</svg>
					)}
				</div>
				<p className='small-text'>{!activo ? 'Empezar serie' : 'Terminar serie'}</p>
			</div>

			<div className='black-icon' onClick={() => navigate('/home')}>
				<div className='only-svg-black-icon'>
					<svg xmlns='http://www.w3.org/2000/svg' width='34' height='34' fill='none' viewBox='0 0 24 24'>
						<path
							stroke='#ffffff'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='1.5'
							d='M5 14v7M5 4.971v9.541c5.6-5.538 8.4 2.64 14-.086v-9.54C13.4 7.61 10.6-.568 5 4.97Z'
						/>
					</svg>
				</div>
				<p className='small-text'>Finalizar rutina</p>
			</div>
		</div>
	);
}

export default NavMenuRoutine;
