import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { routines } from '../../data/routines';
import Modal from '../../components/Modal/Modal';
import NavMenuRoutine from '../../components/navMenuRoutine/NavMenuRoutine';
import './Routine.css';

function Routine() {
  const { id } = useParams();
  const routine = routines.find((rec) => rec.id === parseInt(id));
  
  const [ejercicios, setEjercicios] = useState(
    routine.excercises.map(ex => ({
      ...ex,
      repeticiones: undefined,
      seriesTotales: undefined,
      seriesHechas: 0,
      repeticionesHechas: 0,
      completo: false
    }))
  );
  
  const [ejercicioActual, setEjercicioActual] = useState(0);
  const [tiempo, setTiempo] = useState(60);
  const [activo, setActivo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showClosingModal, setShowClosingModal] = useState(false);
  const [seriesDuration, setSeriesDuration] = useState(null);
  const [inputRepeticiones, setInputRepeticiones] = useState('');
  const [bpm, setBpm] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let intervalo = null;
    if (activo && tiempo > 0) {
      intervalo = setInterval(() => {
        setTiempo((t) => {
          if (t <= 1) { // Cuando quede 1 segundo
            clearInterval(intervalo);
            setActivo(false);
            finalizarSerieAutomatica();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [activo, tiempo]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');

    socket.onmessage = (event) => {
      const parsedBpm = parseFloat(event.data);
      if (!isNaN(parsedBpm)) {
        setBpm(parsedBpm > 0 ? parsedBpm : null);
      }
    };

    return () => socket.close();
  }, []);

  const iniciarTiempo = () => {
    setTiempo(60);
    setActivo(true);
  };
  
  const pausarTiempo = () => {
    setActivo(false);
  };
  
  const reiniciarTiempo = () => {
    setTiempo(60);
    setActivo(false);
  };

  const formatTime = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
  };

  const finalizarSerieAutomatica = () => {
    const dur = 60; // Tiempo completo (60 segundos)
    const repeticiones = parseInt(inputRepeticiones) || 0;
    
    setEjercicios(prev => prev.map((ex, i) => 
      i === ejercicioActual ? {
        ...ex,
        seriesHechas: ex.seriesHechas + 1,
        repeticionesHechas: repeticiones
      } : ex
    ));

    setSeriesDuration(dur);
    reiniciarTiempo();
    setInputRepeticiones('');
    setShowModal(true);
  };

  const finalizarSerie = () => {
    const dur = 60 - tiempo; // Tiempo restante
    const repeticiones = parseInt(inputRepeticiones) || 0;
    
    setEjercicios(prev => prev.map((ex, i) => 
      i === ejercicioActual ? {
        ...ex,
        seriesHechas: ex.seriesHechas + 1,
        repeticionesHechas: repeticiones
      } : ex
    ));

    setSeriesDuration(dur);
    reiniciarTiempo();
    setInputRepeticiones('');
    setShowModal(true);
  };

  const handleContinueFromModal = () => {
    setShowModal(false);
  };

  const handleNextExercise = () => {
    reiniciarTiempo();
    setInputRepeticiones('');
    if (ejercicioActual < ejercicios.length - 1) {
      setEjercicioActual((i) => i + 1);
    }
  };

  const isLastExercise = ejercicioActual === ejercicios.length - 1;

  return (
    <div id='Routine-container'>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onContinue={handleContinueFromModal}
          seriesDuration={seriesDuration}
          maxRestTime={120}
          currentBPM={bpm}
        />
      )}

      <div className='header'>
        <h1>RUTINA DE {routine.name}</h1>
      </div>

      <div className='cronometer'>
        <p className='medium-text'>Tiempo restante</p>
        <h1>{formatTime(tiempo)}</h1>
        <p className='regular-text'>
          <b>
            {ejercicios[ejercicioActual]?.number}. {ejercicios[ejercicioActual]?.name}
          </b>
        </p>
      </div>

      <div className='exercises-card-routine'>
        <h2>Rutina</h2>
        {ejercicios.map((ej, idx) => (
          <div
            key={ej.number}
            className={`card-ejercicio ${idx === ejercicioActual ? 'activo' : 'inactivo'} ${
              ej.completo ? 'completado' : ''
            }`}
          >
            {idx === ejercicioActual ? (
              <div id='card-actual-exercise'>
                <div className='only-info-actual-exercise'>
                  <h3>{ej.name}</h3>
                  <div className='repeticiones-input'>
                    <label>Repeticiones realizadas:</label>
                    <input 
                      type="number" 
                      value={inputRepeticiones}
                      onChange={(e) => setInputRepeticiones(e.target.value)}
                      placeholder="Ingresa el número"
                    />
                  </div>
                  <p>Series completadas: {ej.seriesHechas}</p>
                  <p className='tip'><b>Tip:</b> {ej.tip}</p>
                </div>
                <button className='secondary-button' id='watch-tutorial-btn'>
                  Ver Tutorial
                </button>
              </div>
            ) : (
              <div id='closed-exercise-card'>
                <h3>{ej.name}</h3>
                <p>
                  {ej.seriesHechas} series completadas
                </p>
                {ej.repeticionesHechas > 0 && (
                  <p>Últimas repeticiones: {ej.repeticionesHechas}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showClosingModal && (
        <div className='closing-modal-container'>
          <div className='closing-modal-content'>
            <h2>¿Desea salir de la rutina?</h2>
            <button onClick={() => navigate('/home')}>Salir</button>
            <button className='secondary-button' onClick={() => setShowClosingModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      <NavMenuRoutine
        activo={activo}
        onStart={iniciarTiempo}
        onPause={pausarTiempo}
        finishSeries={finalizarSerie}
        onNextExercise={handleNextExercise}
        isLastExercise={isLastExercise}
        onFinishRoutine={() => setShowClosingModal(true)}
      />
    </div>
  );
}

export default Routine;