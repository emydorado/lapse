import { useEffect, useState } from 'react';
import './Modal.css';

import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function Modal({ onClose, onContinue, maxRestTime = 120, seriesDuration }) {
  const [step, setStep] = useState(1);
  const [normalBPM, setNormalBPM] = useState(null);
  const [currentBPM, setCurrentBPM] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const db = getFirestore();
    const docRef = doc(db, 'users', user.uid);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const restbpm = docSnap.data().restbpm;
        const calculated = Math.floor(restbpm + restbpm * 0.1);
        setNormalBPM(calculated);
      }
    });
  }, []);

  useEffect(() => {
    if (!normalBPM) return;

    const ws = new WebSocket('ws://localhost:3000'); // Ajusta tu URL si es necesario
    ws.onmessage = (event) => {
      const bpm = parseInt(event.data);
      setCurrentBPM(bpm);
    };

    return () => ws.close();
  }, [normalBPM]);

  useEffect(() => {
    if (!normalBPM) return;

    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [normalBPM]);

  useEffect(() => {
    if (!normalBPM || currentBPM === null) return;

    if (currentBPM <= normalBPM) {
      setStep(3); // listo para continuar
    } else if (elapsed >= maxRestTime) {
      setStep(3); // lo libera igual al pasar el tiempo máximo
    } else {
      setStep(2); // esperando que baje el bpm
    }
  }, [currentBPM, elapsed, normalBPM, maxRestTime	]);

  const formatTime = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes.toString().padStart(2, '0')}`;
  };

  return (
    <>
		{step === 1 && (
	<div className='modal-overlay'>
		<div className='modal-content'>
		<h2>Vuelve a la estación de toma de pulso</h2>
		<p className='regular-text'>
			Así determinaremos tu tiempo correcto de descanso entre series para tu rutina evitando la fatiga.
		</p>
		<p className='regular-text'>
			<b>Coloca tu dedo índice en el sensor y mantenlo presionado.</b>
		</p>

		<div className='sensor-feedback'>
			<div className='heart-bpm-text'>
			<svg className='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
				<path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z' />
			</svg>
			<h2>{currentBPM !== null ? `${currentBPM} BPM detectado` : 'Esperando señal del sensor...'}</h2>
			</div>
			<p className='small-text'>El sensor está en espera. Asegúrate de colocar el dedo correctamente.</p>
		</div>

		<button className='primary-button' onClick={onClose}>
			Cancelar
		</button>
		</div>
	</div>
	)}

      {step === 2 && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h1 id='modal-cronometer'>{formatTime(elapsed)}</h1>
            <div className='heart-bpm-text'>
              <svg className='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z' />
              </svg>
              <h2>{currentBPM ?? '--'} BPM</h2>
            </div>
            <div className='recomendations-info'>
              <p className='regular-text'>
                Hasta que no se regule tu ritmo cardiaco no podrás continuar. <b>¡El descanso es importante!</b>
              </p>
              <p className='regular-text'>
                <b>Coloca tu dedo índice en el sensor y mantenlo presionado.</b>
              </p>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className='modal-overlay'>
          <div className='last-modal-content'>
            <h1 id='modal-cronometer'>{formatTime(elapsed)}</h1>
            <div className='heart-bpm-text'>
              <svg className='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z' />
              </svg>
              <h2>{currentBPM ?? '--'} BPM</h2>
            </div>
            <div className='last-recomendations-info'>
              <h3>¡Tu ritmo cardiaco ya está regulado!</h3>
              <p className='regular-text'>Ya puedes continuar con tu rutina</p>
              {seriesDuration !== undefined && (
                <p className='regular-text'>
                  <b>Duración de la serie anterior:</b> {formatTime(seriesDuration)}
                </p>
              )}
            </div>
            <button onClick={onContinue}>CONTINUAR</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal