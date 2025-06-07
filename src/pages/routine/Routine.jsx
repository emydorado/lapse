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
  const [bpm, setBpm] = useState(null); // bpm inicial es null

  const navigate = useNavigate();

  useEffect(() => {
    let intervalo = null;
    if (activo && tiempo > 0) {
      intervalo = setInterval(() => {
        setTiempo((t) => t - 1);
      }, 1000);
    } else if (tiempo === 0 && activo) {
      setActivo(false);
      finalizarSerie();
    }
    return () => clearInterval(intervalo);
  }, [activo, tiempo]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');

    socket.onmessage = (event) => {
      const parsedBpm = parseFloat(event.data);
      if (!isNaN(parsedBpm) && parsedBpm > 0) { // Asegúrate de que sea un número válido y > 0
        setBpm(parsedBpm);
      } else {
        // Opcional: si el sensor envía 0 o NaN, puedes decidir qué hacer.
        // Podrías setear bpm a 0 si 0 es un valor significativo para ti,
        // o a null si no es un valor real.
        // Por ahora, solo actualizamos si es > 0.
        // setBpm(null); // O setBpm(0) si 0 es una lectura válida pero de reposo
      }
    };

    return () => socket.close();
  }, []);

  const iniciarTiempo = () => {
    setTiempo(60);
    setActivo(true);
  };
  
  const pausarTiempo = () => setActivo(false);
  
  const reiniciarTiempo = () => {
    setTiempo(60);
    setActivo(false);
  };

  const formatTime = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
  };

  const finalizarSerie = () => {
    const dur = 60 - tiempo;
    const repeticiones = parseInt(inputRepeticiones) || 0;
    
    setEjercicios((prev) => {
      const copy = [...prev];
      const ex = { 
        ...copy[ejercicioActual],
        seriesHechas: copy[ejercicioActual].seriesHechas + 1,
        repeticionesHechas: repeticiones
      };
      copy[ejercicioActual] = ex;
      return copy;
    });
    
    reiniciarTiempo();
    setInputRepeticiones('');
    setSeriesDuration(dur);
    // ** SOLO MOSTRAR EL MODAL SI TENEMOS UN BPM VÁLIDO **
    if (typeof bpm === 'number' && bpm > 0) {
        setShowModal(true);
    } else {
        // Manejar el caso donde no hay BPM válido al finalizar la serie.
        // Podrías mostrar una alerta al usuario, o forzar el avance, o esperar un momento.
        // Por ahora, lo dejaré para que lo decidas. Una opción es simplemente avanzar
        // si no hay BPM y el usuario puede continuar.
        console.warn("No se pudo obtener un BPM válido al finalizar la serie. Avanzando sin monitoreo de recuperación.");
        handleContinue(); // O alguna otra acción por defecto
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    if (ejercicioActual < ejercicios.length - 1) {
      setEjercicioActual((i) => i + 1);
    } else {
      navigate('/home');
    }
  };

  const closeModal = () => setShowModal(false);
  const handleClosingModal = () => {
    setShowClosingModal(false);
    navigate('/home');
  };
  const handleGoBackClosingModal = () => setShowClosingModal(false);

  return (
    <div id='Routine-container'>
      {/* ** SOLO RENDERIZAR EL MODAL SI showModal ES TRUE Y BPM ES VÁLIDO ** */}
      {showModal && seriesDuration !== null && typeof bpm === 'number' && bpm > 0 && (
        <Modal
          onClose={closeModal}
          onContinue={handleContinue}
          seriesDuration={seriesDuration}
          maxRestTime={120}
          currentBPM={bpm} // currentBPM ya es un número válido aquí
        />
      )}
      {/* Si showModal es true pero bpm no es válido, el modal no se mostrará con el error */}

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
            <button onClick={handleClosingModal}>Salir</button>
            <button className='secondary-button' onClick={handleGoBackClosingModal}>
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
        onOpenModal={() => setShowClosingModal(true)}
      />
    </div>
  );
}

export default Routine;