import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { WebSocketServer } from 'ws'; // ✅ Asegúrate que esto es correcto

const port = new SerialPort({
	path: 'COM6', // Asegúrate de que sea el puerto correcto
	baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', (ws) => {
	console.log('🔌 Cliente conectado');

	parser.on('data', (data) => {
		console.log('📡 Enviando dato:', data);
		if (ws.readyState === ws.OPEN) {
			ws.send(data);
		}
	});
});
