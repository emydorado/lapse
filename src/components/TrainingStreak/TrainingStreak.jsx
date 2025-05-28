import React, { useState, useEffect } from 'react';
import './TrainingStreak.css'; // Asegúrate de crear este archivo CSS

const TrainingStreak = () => {
	const [activeDays, setActiveDays] = useState([]);
	const [week, setWeek] = useState([]);

	useEffect(() => {
		const today = new Date();
		const tempWeek = [];

		for (let i = 0; i < 7; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() + i);

			const dayNumber = date.getDate().toString().padStart(2, '0');
			const dayInitial = ['D', 'L', 'M', 'M', 'J', 'V', 'S'][date.getDay()];

			tempWeek.push({ index: i, dateStr: dayNumber, initial: dayInitial });
		}

		setWeek(tempWeek);
	}, []);

	const toggleDay = (index) => {
		setActiveDays((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
	};

	return (
		<div className='streak-container'>
			<div className='streak-header'>
				<h3>RACHA DE ENTRENAMIENTO</h3>
				<p className='regular-text' style={{ opacity: 0.6 }}>
					{activeDays.length}/7 Días
				</p>
			</div>
			<div className='days'>
				{week.map((day) => (
					<div key={day.index} className={`day ${activeDays.includes(day.index) ? 'active' : ''}`}>
						<div className='circle' onClick={() => toggleDay(day.index)}>
							<p className='regular-text' style={{ opacity: 0.6 }}>
								{day.dateStr}
							</p>
						</div>
						<div className='label'>
							<h3>{day.initial}</h3>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TrainingStreak;
