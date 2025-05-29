import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth, db } from '../../services/firebase/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import './trainingGoals.css';

function TrainingGoals() {
  const navigate = useNavigate();
  const [objetivo, setObjetivo] = useState('');
  const [frecuencia, setFrecuencia] = useState('');
  const [equipamiento, setEquipamiento] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!objetivo || !frecuencia || !equipamiento) {
      setError('Por favor responde todas las preguntas.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Obtener el usuario actual
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('No hay usuario autenticado');
      }

      // Actualizar el documento del usuario en Firestore
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        trainingGoals: {
          objetivo,
          frecuencia: parseInt(frecuencia), // Convertir a número
          equipamiento
        },
        onboardingCompleted: true // Marcar que completó el onboarding
      });

      // Redirigir a la página principal
      navigate('/home');
    } catch (error) {
      console.error('Error al guardar metas de entrenamiento:', error);
      setError('Ocurrió un error al guardar tus preferencias. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='trainingGoals-container'>
      <h1>METAS DE ENTRENAMIENTO</h1>
      <p className='regular-text'>Responde las siguientes preguntas para personalizar tu experiencia</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="question-group">
          <p>
            <b>¿Cuál es el objetivo principal por el cual estás haciendo ejercicio?</b>
          </p>
          <div className="radio-option">
            <input type='radio' id='fuerza' name='objetivo' value='fuerza' onChange={(e) => setObjetivo(e.target.value)} />
            <label htmlFor='fuerza'>Fuerza</label>
          </div>

          <div className="radio-option">
            <input type='radio' id='resistencia' name='objetivo' value='resistencia' onChange={(e) => setObjetivo(e.target.value)} />
            <label htmlFor='resistencia'>Resistencia</label>
          </div>

          <div className="radio-option">
            <input type='radio' id='hipertrofia' name='objetivo' value='hipertrofia' onChange={(e) => setObjetivo(e.target.value)} />
            <label htmlFor='hipertrofia'>Hipertrofia (Ganar masa muscular)</label>
          </div>

          <div className="radio-option">
            <input type='radio' id='perder_peso' name='objetivo' value='perder_peso' onChange={(e) => setObjetivo(e.target.value)} />
            <label htmlFor='perder_peso'>Perder peso</label>
          </div>
        </div>

        <div className="question-group">
          <p>
            <b>¿Cuántos días a la semana quieres entrenar?</b>
          </p>
          <div className="radio-option">
            <input type='radio' id='1dia' name='frecuencia' value='1' onChange={(e) => setFrecuencia(e.target.value)} />
            <label htmlFor='1dia'>1 día</label>
          </div>

          <div className="radio-option">
            <input type='radio' id='2dias' name='frecuencia' value='2' onChange={(e) => setFrecuencia(e.target.value)} />
            <label htmlFor='2dias'>2 días</label>
          </div>

          <div className="radio-option">
            <input type='radio' id='3dias' name='frecuencia' value='3' onChange={(e) => setFrecuencia(e.target.value)} />
            <label htmlFor='3dias'>3 días</label>
          </div>

          <div className="radio-option">
            <input type='radio' id='4dias' name='frecuencia' value='4' onChange={(e) => setFrecuencia(e.target.value)} />
            <label htmlFor='4dias'>4 días</label>
          </div>

          <div className="radio-option">
            <input type='radio' id='5dias' name='frecuencia' value='5' onChange={(e) => setFrecuencia(e.target.value)} />
            <label htmlFor='5dias'>5 días</label>
          </div>
        </div>

        <div className="question-group">
          <p>
            <b>¿Con qué equipos sueles entrenar?</b>
          </p>
          <div className="radio-option">
            <input type='radio' id='peso_corporal' name='equipamiento' value='peso_corporal' onChange={(e) => setEquipamiento(e.target.value)} />
            <label htmlFor='peso_corporal'>Peso corporal</label>
          </div>

          <div className="radio-option">
            <input type='radio' id='pesas' name='equipamiento' value='pesas' onChange={(e) => setEquipamiento(e.target.value)} />
            <label htmlFor='pesas'>Pesas</label>
          </div>

          <div className="radio-option">
            <input type='radio' id='maquinas' name='equipamiento' value='maquinas' onChange={(e) => setEquipamiento(e.target.value)} />
            <label htmlFor='maquinas'>Máquinas de gym</label>
          </div>
        </div>

        <button type='submit' disabled={loading}>
          {loading ? 'GUARDANDO...' : 'COMENZAR'}
        </button>
      </form>
    </div>
  );
}

export default TrainingGoals;