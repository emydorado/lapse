import './states.css';

function HeartRate({ bpm }) {
	return (
		<div className='state-container'>
			<img src='src/assets/Heart.png' alt='Heart' />

			<h1>{bpm} BPM</h1>
		</div>
	);
}

export default HeartRate;
