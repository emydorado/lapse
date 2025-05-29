import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { WebSocketServer } from 'ws'; // ✅ Asegúrate que esto es correcto

const port = new SerialPort({
	path: 'COM7', // Asegúrate de que sea el puerto correcto
	baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', () => {
  console.log('🔌 Cliente conectado');

  parser.on('data', (data) => {
    const cleanData = data.trim();

    // Extraemos el número BPM del mensaje
    const match = cleanData.match(/BPM promedio:\s*([\d.]+)/);

    if (match) {
      const bpm = match[1]; // Ejemplo: "80.57"
      console.log('📡 Enviando BPM extraído:', bpm);

      // Enviamos solo el número a todos los clientes conectados
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(bpm);
        }
      });
    } else {
      console.log('No se encontró BPM en:', cleanData);
    }
  });
});