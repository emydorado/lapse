import NavMenu from '../../components/navMenu/NavMenu';
import TrainingStreak from '../../components/TrainingStreak/TrainingStreak';
import './Home.css';

function Home() {
	return (
		<>
			<div id='home-container'>
				<div className='home-header'>
					<img src='../../src/assets/logo.png' alt='logo lapse' />
				</div>
				<div className='home-content'>
					<TrainingStreak />
					<div className='recomendations-container'>
						<h2>recomendaciones</h2>
						<div className='recomendations-cards'>
							<div className='recomendation'>
								<svg
									className='w-6 h-6 text-gray-800 dark:text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									width='44'
									height='44'
									fill='none'
									viewBox='0 0 24 24'
								>
									<path
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='1.5'
										d='M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9h4Z'
									/>
								</svg>
								<p className='small-text'>
									Dormir bien es parte del entrenamiento. Intenta irte a dormir 30 minutos antes hoy.
								</p>
							</div>
							<div className='recomendation'>
								<svg
									className='w-6 h-6 text-gray-800 dark:text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									width='44'
									height='44'
									fill='none'
									viewBox='0 0 24 24'
								>
									<path
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='1.5'
										d='M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9h4Z'
									/>
								</svg>

								<p className='small-text'>
									El día después de una rutina intensa, incluye proteína en tus comidas para ayudar a tus músculos a
									recuperarse.
								</p>
							</div>
							<div className='recomendation'>
								<svg
									className='w-6 h-6 text-gray-800 dark:text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									width='44'
									height='44'
									fill='none'
									viewBox='0 0 24 24'
								>
									<path
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='1.5'
										d='M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9h4Z'
									/>
								</svg>
								<p className='small-text'>
									¿Dolor en cuádriceps? Puedes alternar compresas frías y tibias para recuperar mejor.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<NavMenu />
		</>
	);
}

export default Home;
