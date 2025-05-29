import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { routines } from '../../data/routines';
import Modal from '../../components/Modal/Modal';
import NavMenuRoutine from '../../components/navMenuRoutine/NavMenuRoutine';
import './Routine.css';

function Routine() {
  const { id } = useParams();
  const routine = routines.find((rec) => rec.id === parseInt(id));
  const [ejercicios, setEjercicios] = useState(routine.excercises);
  const [ejercicioActual, setEjercicioActual] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [activo, setActivo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showClosingModal, setShowClosingModal] = useState(false);
  const [seriesDuration, setSeriesDuration] = useState(null);
  const [bpm, setBpm] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    let intervalo = null;
    if (activo) {
      intervalo = setInterval(() => {
        setTiempo((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [activo]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001'); // ← Ajusta si tu servidor es otro

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.bpm) {
        setBpm(data.bpm);
      }
    };

    return () => socket.close();
  }, []);

  const iniciarTiempo = () => setActivo(true);
  const pausarTiempo = () => setActivo(false);
  const reiniciarTiempo = () => {
    setTiempo(0);
    setActivo(false);
  };

  const formatTime = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes
      .toString()
      .padStart(2, '0')}`;
  };

  const finalizarSerie = () => {
    const dur = tiempo;
    setEjercicios((prev) => {
      const copy = [...prev];
      const ex = { ...copy[ejercicioActual] };
      ex.seriesHechas += 1;
      if (ex.seriesHechas >= ex.seriesTotales) ex.completo = true;
      copy[ejercicioActual] = ex;
      return copy;
    });
    reiniciarTiempo();
    setSeriesDuration(dur);
    setShowModal(true);
  };

  const handleContinue = () => {
    setShowModal(false);
    const ex = ejercicios[ejercicioActual];
    if (ex.seriesHechas >= ex.seriesTotales && ejercicioActual < ejercicios.length - 1) {
      setEjercicioActual((i) => i + 1);
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
      {showModal && seriesDuration !== null && (
        <Modal
          onClose={closeModal}
          onContinue={handleContinue}
          seriesDuration={seriesDuration}
          maxRestTime={120}
		  bpm={bpm}
        />
      )}

      <div className='header'>
        <h1>RUTINA DE {routine.name}</h1>
      </div>

      <div className='cronometer'>
        <p className='medium-text'>Tiempo de serie</p>
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
                  <p>Repeticiones: {ej.repeticiones}</p>
                  <p>Series: {ej.seriesHechas}/{ej.seriesTotales}</p>
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
                  {ej.seriesHechas}/{ej.seriesTotales} series completadas
                </p>
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