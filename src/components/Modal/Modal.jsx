import { useEffect, useState, useRef } from 'react';
import './Modal.css';

import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



function Modal({ onContinue, seriesDuration, currentBPM }) {
  const [step, setStep] = useState(1);
  const [normalizedBPM, setNormalizedBPM] = useState(null);

  const [elapsed, setElapsed] = useState(0); // El contador de tiempo
  const [decreaseRate, setDecreaseRate] = useState(null);
  const [restAdjustment, setRestAdjustment] = useState(0);

  const [capturedInitialBPM, setCapturedInitialBPM] = useState(null); // La FC post-esfuerzo

  const currentBPMRef = useRef(currentBPM); // Ref para el BPM actual del sensor

  // Actualiza el ref cada vez que currentBPM cambia
  useEffect(() => {
    currentBPMRef.current = currentBPM;
  }, [currentBPM]);

  // PRIMER useEffect: Cargar FC Normalizada (se ejecuta solo una vez al montar)
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.log('Usuario no autenticado. Usando FC Normalizada por defecto (90 BPM).');
      setNormalizedBPM(90); // Fallback si no hay usuario
      return;
    }

    const db = getFirestore();
    const docRef = doc(db, 'users', user.uid);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists() && docSnap.data().restbpm) {
          const restbpm = docSnap.data().restbpm;
          const calculatedNormalized = Math.floor(restbpm + restbpm * 0.1);
          setNormalizedBPM(calculatedNormalized);
          console.log('FC en reposo:', restbpm, 'FC Normalizada (calculada):', calculatedNormalized);
        } else {
          console.log('No se encontró FC en reposo para el usuario o documento no existe. Usando FC Normalizada por defecto (90 BPM).');
          setNormalizedBPM(90); // Fallback si no hay restbpm en Firestore
        }
      })
      .catch((error) => {
        console.error('Error al obtener FC en reposo desde Firebase:', error);
        setNormalizedBPM(90); // Fallback en caso de error de Firebase
      });
  }, []); // Dependencia vacía para que se ejecute solo al montar

  // SEGUNDO useEffect: Manejar la lógica de los pasos y el temporizador
  useEffect(() => {
    let interval;

    // --- Lógica de transición de Step 1 a Step 2 ---
    // Esta sección se ejecuta cada vez que 'step', 'normalizedBPM' o 'capturedInitialBPM' cambian.
    // También se activará si currentBPMRef.current cambia mientras step es 1.
    if (step === 1) {
      console.log(`DEBUG (Step 1 Eval): currentBPM=${currentBPMRef.current}, normalizedBPM=${normalizedBPM}`);
      if (currentBPMRef.current === null || currentBPMRef.current === undefined) {
        console.log('DEBUG (Step 1): currentBPMRef.current es null/undefined.');
      }
      if (typeof currentBPMRef.current === 'number' && currentBPMRef.current <= 0) {
        console.log('DEBUG (Step 1): currentBPMRef.current es <= 0.');
      }
      if (normalizedBPM === null) {
        console.log('DEBUG (Step 1): normalizedBPM es null.');
      }
    }

    // CONDICIÓN PRINCIPAL PARA PASAR A STEP 2:
    // Captura el primer BPM válido (mayor a 0) como FC post-esfuerzo,
    // y solo si normalizedBPM ya está disponible.
    if (step === 1 && typeof currentBPMRef.current === 'number' && currentBPMRef.current > 0 && normalizedBPM !== null) {
        setCapturedInitialBPM(currentBPMRef.current);
        setElapsed(0); // <--- REINICIA EL CONTADOR DE TIEMPO AQUÍ
        setStep(2);
        console.log('TRANSICIÓN A STEP 2: Primer BPM capturado (initialBpm):', currentBPMRef.current, 'Contador de tiempo reiniciado.');
    }

    // --- Lógica del temporizador y cálculo de recuperación (Step 2) ---
    // Solo inicia el temporizador si estamos en Step 2 y ya tenemos todos los datos necesarios.
    if (step === 2 && normalizedBPM !== null && capturedInitialBPM !== null) {
      console.log('DEBUG (Step 2 Active): Iniciando temporizador.');
      interval = setInterval(() => {
        setElapsed((prevElapsed) => {
          const newElapsed = prevElapsed + 1;
          // console.log('Tiempo transcurrido:', newElapsed, 'segundos. Current BPM (ref):', currentBPMRef.current); // Descomentar para debugging intenso

          // Calcular la velocidad de disminución a los 15 segundos exactos
          if (newElapsed === 15) {
            const initial = capturedInitialBPM;
            const current = currentBPMRef.current;

            if (typeof initial === 'number' && initial > 0 &&
                typeof current === 'number' && current >= 0) {
                const difference = initial - current;
                const minutes = 15 / 60;
                const rate = difference / minutes;

                setDecreaseRate(rate);
                console.log('CALCULO DE VELOCIDAD A 15s: Initial BPM (FCpost_inmediata):', initial, 'Current BPM (FCpost_ajustada):', current);
                console.log('Velocidad de disminución calculada:', rate.toFixed(1), 'BPM/min.');

                if (rate < 20) {
                  setRestAdjustment(0.2);
                  console.log('Ajuste de descanso: Velocidad < 20. Aumentado en 20%.');
                }
            } else {
                console.warn('ADVERTENCIA: Valores de BPM inválidos para calcular la velocidad (en t=15s): initial=', initial, 'current=', current);
            }
          }
          return newElapsed;
        });
      }, 1000);
    }

    // Función de limpieza para detener el temporizador cuando el componente se desmonte
    // o cuando 'step', 'normalizedBPM' o 'capturedInitialBPM' cambien.
    return () => {
      console.log('DEBUG: Limpiando intervalo.');
      clearInterval(interval);
    };
  }, [step, normalizedBPM, capturedInitialBPM]); // Dependencias que reinician este useEffect (y el setInterval)

  // TERCER useEffect: Verificar si se alcanzó la FC normalizada para pasar al Step 3
  // Solo se activa cuando 'step', 'currentBPM', 'normalizedBPM' o 'elapsed' cambian.
  useEffect(() => {
    // Solo si estamos en Step 2 y tenemos todos los datos necesarios
    if (step === 2 && currentBPM !== null && currentBPM !== undefined && typeof currentBPM === 'number' && normalizedBPM !== null) {
      // Condición para pasar a Step 3:
      // 1. Han transcurrido AL MENOS 15 segundos.
      // 2. La FC actual es menor o igual a la FC normalizada.
      if (elapsed >= 15 && currentBPM <= normalizedBPM) {
        setStep(3);
        console.log('TRANSICIÓN A STEP 3: FC Normalizada alcanzada Y Mínimo de 15s cumplido. Recuperación completa.');
      }
    }
  }, [step, currentBPM, normalizedBPM, elapsed]); // Dependencias: step, currentBPM, normalizedBPM, elapsed

  // Función para formatear el tiempo
  const formatTime = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
  };

  // Renderizado del componente (la interfaz de usuario)
  return (
    <>
      {step === 1 && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Iniciando monitoreo</h2>
            <p>Esperando la lectura del sensor...</p>
            <div className='sensor-feedback'>
              <div className='heart-bpm-text'>
                <svg className='heart-icon' viewBox='0 0 24 24'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z' />
                </svg>
                <h2>{currentBPM || '--'} BPM</h2>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className='modal-overlay'>
          <div className='modal-content recovery-monitoring'>
            <h1 className='recovery-timer'>{formatTime(elapsed)}</h1>
            <div className='bpm-display'>
              <svg className='heart-icon' viewBox='0 0 24 24'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z' />
              </svg>
              <h2>{currentBPM} BPM</h2>
            </div>
            <div className='recovery-info'>
              {capturedInitialBPM && <p>FC Inicial: {capturedInitialBPM} BPM</p>}
              {decreaseRate !== null && (
                <p>Velocidad recuperación: {decreaseRate.toFixed(1)} BPM/min</p>
              )}
              {restAdjustment > 0 && (
                <p className='adjustment-warning'>Tiempo de descanso aumentado en 20%</p>
              )}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className='modal-overlay'>
          <div className='modal-content recovery-complete'>
            <h3>¡Recuperación completa!</h3>
            <div className='stats-grid'>
              <div className='stat-item'>
                <span>Duración serie:</span>
                <span>{formatTime(seriesDuration)}</span>
              </div>
              <div className='stat-item'>
                <span>Tiempo descanso:</span>
                <span>{formatTime(elapsed)}</span>
              </div>
            </div>
            <button className='primary-button' onClick={onContinue}>
              CONTINUAR
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;