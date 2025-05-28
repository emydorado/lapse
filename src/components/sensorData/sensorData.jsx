import React, { useEffect, useState } from 'react';

export default function SensorData() {
	const [data, setData] = useState('Esperando datos...');

	useEffect(() => {
		const socket = new WebSocket('ws://localhost:3001');

		socket.onopen = () => {
			console.log('✅ Conectado al WebSocket');
		};

		socket.onmessage = (event) => {
			setData(event.data);
		};

		socket.onerror = (error) => {
			console.error('❌ Error en WebSocket:', error);
		};

		socket.onclose = () => {
			console.log('⚠ WebSocket cerrado');
		};

		return () => {
			socket.close();
		};
	}, []);

	return (
		<div style={{ padding: 20 }}>
			<h2>📊 Datos del sensor</h2>
			<pre style={{ background: '#f5f5f5', padding: 10 }}>{data}</pre>
		</div>
	);
}
