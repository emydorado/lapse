import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import WebSocket from 'ws';

const port = new SerialPort({
	path: 'COM6',
	baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

const wss = new WebSocket.Server({ port: 3001 });

parser.on('data', (data) => {
	console.log('Dato recibido:', data);
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
});
