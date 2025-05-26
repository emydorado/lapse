import './ExcerciseCard.css';

function ExcerciseCard({ name, repetitions, series, number }) {
	return (
		<div id='exercise-card-container'>
			<div className='routine-info'>
				<p id='exercise-title'>
					<b>
						{number}. {name}
					</b>
				</p>
				<div className='exercise-info-section'>
					<div className='series-section'>
						<p className='regular-text'>Series</p>
						<p className='medium-text'>
							<b>{series}</b>
						</p>
					</div>
					<div className='repetitions-section'>
						<p className='regular-text'>Repeticiones</p>
						<p className='medium-text'>
							<b>{repetitions}</b>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ExcerciseCard;
