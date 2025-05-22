import './states.css';

function HeartRate({ bpm }) {
	return (
		<>
			<img src='src/assets/Heart.png' alt='Heart' />

			<h1>{bpm} BPM</h1>
		</>
	);
}

export default HeartRate;
