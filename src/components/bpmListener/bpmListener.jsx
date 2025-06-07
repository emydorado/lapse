// BPMListener.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeartRate } from '../../redux/hrfslice'; // ajusta ruta según tu estructura

function BPMListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');

    socket.onopen = () => {
      console.log('✅ WebSocket conectado a serial-reader');
    };

    socket.onmessage = (event) => {
      const bpm = parseFloat(event.data);
      if (!isNaN(bpm)) {
        dispatch(setHeartRate(bpm));
      }
    };

    socket.onerror = (error) => {
      console.error('❌ Error WebSocket:', error);
    };

    socket.onclose = () => {
      console.warn('📴 WebSocket cerrado');
    };

    return () => {
      socket.close();
    };
  }, [dispatch]);

  return null; // Este componente no renderiza nada visible
}

export default BPMListener;
