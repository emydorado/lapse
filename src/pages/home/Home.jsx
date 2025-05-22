import { useState } from 'react';
import NavMenu from '../../components/navMenu/NavMenu';

import './Home.css';

function Home() {
	const [weekDays /*setWeekDays*/] = useState(2);
	const percentage = (weekDays / 6) * 100;

	return (
		<>
			<div id='home-container'>
				<h2>goals</h2>
				<h2>insigths</h2>

				<div className='chart-goal'>
					<div className='donut-container'>
						<div
							className='donut'
							style={{
								background: `conic-gradient(#bbe40a ${percentage}%, #ddd ${percentage}%)`,
							}}
						>
							<div className='donut-inner'>
								<p className='small-text'>{weekDays}/6</p>
							</div>
						</div>
					</div>
					<p className='regular-text'>Veces a la semana que has entrenado</p>
				</div>

				<div className='chart-goal'>
					<div className='donut-container'>
						<div
							className='donut'
							style={{
								background: `conic-gradient(#bbe40a ${percentage}%, #ddd ${percentage}%)`,
							}}
						>
							<div className='donut-inner'>
								<p className='small-text'>{weekDays}/6</p>
							</div>
						</div>
					</div>
					<p className='regular-text'>objetivo 2</p>
				</div>
			</div>

			<NavMenu />
		</>
	);
}

export default Home;
