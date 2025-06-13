import { useEffect, useState, useRef } from 'react';
import './Modal.css';

import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



function Modal({ onContinue, seriesDuration, currentBPM }) {
  const [step, setStep] = useState(1);
  const [normalizedBPM, setNormalizedBPM] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [decreaseRate, setDecreaseRate] = useState(null);
  const [capturedInitialBPM, setCapturedInitialBPM] = useState(null);
  const [extraTime, setExtraTime] = useState(0);
  const [showExtraTime, setShowExtraTime] = useState(false);
  const currentBPMRef = useRef(currentBPM);
  const [hasValidBPM, setHasValidBPM] = useState(false);
  const [minElapsedForCalculation, setMinElapsedForCalculation] = useState(false);
  const [isCalculatingExtra, setIsCalculatingExtra] = useState(false);

  // Actualiza el ref y verifica BPM válido
  useEffect(() => {
    currentBPMRef.current = currentBPM;
    if (typeof currentBPM === 'number' && currentBPM > 0) {
      setHasValidBPM(true);
    }
  }, [currentBPM]);

  // Cargar FC Normalizada desde Firebase
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const defaultBPM = 90;

    const loadNormalizedBPM = async () => {
      if (!user) {
        console.log('Usuario no autenticado. Usando FC Normalizada por defecto.');
        setNormalizedBPM(defaultBPM);
        return;
      }

      try {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists() && docSnap.data().restbpm) {
          const restbpm = docSnap.data().restbpm;
          const calculatedNormalized = Math.floor(restbpm + restbpm * 0.1);
          setNormalizedBPM(calculatedNormalized);
        } else {
          setNormalizedBPM(defaultBPM);
        }
      } catch (error) {
        console.error('Error al obtener FC en reposo:', error);
        setNormalizedBPM(defaultBPM);
      }
    };

    loadNormalizedBPM();
  }, []);

  // Manejar transición entre pasos
  useEffect(() => {
    let interval;

    // Paso 1 → Paso 2
    if (step === 1 && hasValidBPM && normalizedBPM !== null) {
      setCapturedInitialBPM(currentBPMRef.current);
      setElapsed(0);
      setStep(2);
    }

    // Temporizador para Paso 2
    if (step === 2 && normalizedBPM !== null && capturedInitialBPM !== null) {
      interval = setInterval(() => {
        setElapsed((prevElapsed) => {
          const newElapsed = prevElapsed + 1;

          // Cálculo de velocidad a los 15 segundos
          if (newElapsed === 15) {
            const initial = capturedInitialBPM;
            const current = currentBPMRef.current;

            if (typeof initial === 'number' && initial > 0 &&
                typeof current === 'number' && current >= 0) {
              const rate = (initial - current) / 0.25; // 15s = 0.25min
              setDecreaseRate(rate);
              setMinElapsedForCalculation(true);
            }
          }
          return newElapsed;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [step, normalizedBPM, capturedInitialBPM, hasValidBPM]);

  // Paso 2 → Paso 3 (con tiempo extra si es necesario)
  useEffect(() => {
    if (step === 2 && hasValidBPM && normalizedBPM !== null && minElapsedForCalculation) {
      if (currentBPM <= normalizedBPM && !isCalculatingExtra) {
        const timeToRecover = elapsed;
        
        // Calcular tiempo extra si la velocidad fue < 20 BPM/min
        if (decreaseRate !== null && decreaseRate < 20) {
          const calculatedExtra = Math.max(1, Math.round(timeToRecover * 0.2)); // Asegurar mínimo 1 segundo
          setExtraTime(calculatedExtra);
          setShowExtraTime(true);
          setIsCalculatingExtra(true);
          
          // Extender el tiempo de forma controlada
          setElapsed(prev => {
            const newElapsed = prev + calculatedExtra;
            return newElapsed > 600 ? 600 : newElapsed; // Limitar a 10 minutos máximo
          });
        } else {
          setStep(3);
        }
      }
    }
  }, [step, currentBPM, normalizedBPM, elapsed, decreaseRate, hasValidBPM, minElapsedForCalculation, isCalculatingExtra]);

  // Manejo del tiempo extra
  useEffect(() => {
    let interval;
    
    if (showExtraTime && step === 2 && isCalculatingExtra) {
      interval = setInterval(() => {
        setElapsed(prev => {
          if (prev >= 15 + extraTime) { // Asegurar que pasen los 15s + extra
            setStep(3);
            setIsCalculatingExtra(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [showExtraTime, extraTime, step, isCalculatingExtra]);

  const formatTime = (segundos) => {
    if (isNaN(segundos)) return '00:00';
    
    const minutos = Math.floor(Math.max(0, segundos) / 60);
    const segundosRestantes = Math.max(0, segundos) % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
  };

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
              {!hasValidBPM && currentBPM !== null && (
                <p className='waiting-message'>Esperando datos válidos del sensor...</p>
              )}
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
              {normalizedBPM && <p>FC Objetivo: {normalizedBPM} BPM</p>}
              {decreaseRate !== null && (
                <p>Velocidad recuperación: {decreaseRate.toFixed(1)} BPM/min</p>
              )}
              {showExtraTime && (
                <p className='adjustment-warning'>
                  Aplicando tiempo extra: {formatTime(extraTime)} (20%)
                </p>
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
                <span>{formatTime(Math.min(elapsed, 15))}</span>
              </div>
              {extraTime > 0 && (
                <div className='stat-item extra-time'>
                  <span>Tiempo extra (20%):</span>
                  <span>+{formatTime(extraTime)}</span>
                </div>
              )}
              <div className='stat-item total-time'>
                <span>Tiempo total:</span>
                <span>{formatTime(Math.min(elapsed, 15 + extraTime))}</span>
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