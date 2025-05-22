import { useNavigate } from 'react-router-dom';
import './trainingGoals.css';

function TrainingGoals() {
	const navigate = useNavigate();

	return (
		<div id='trainingGoals-container'>
			<h1>METAS DE ENTRENAMIENTO</h1>
			<p className='regular-text'>Responde las siguientes preguntas para personalizar tu experiencia </p>

			<form>
				<p>
					<b>¿Cuál es el objetivo principal por el cual estás haciendo ejercicio?</b>
				</p>
				<label>
					<input type='radio' name='objetivo' value='fuerza' /> Fuerza
				</label>
				<label>
					<input type='radio' name='objetivo' value='resistencia' /> Resistencia
				</label>
				<label>
					<input type='radio' name='objetivo' value='hipertrofia' /> Hipertrofia (Ganar masa muscular)
				</label>
				<label>
					<input type='radio' name='objetivo' value='perder_peso' /> Perder peso
				</label>

				<p>
					<b>¿Cuántos días a la semana quieres entrenar?</b>
				</p>
				<label>
					<input type='radio' name='frecuencia' value='1' /> 1 día
				</label>
				<label>
					<input type='radio' name='frecuencia' value='2' /> 2 días
				</label>
				<label>
					<input type='radio' name='frecuencia' value='3' /> 3 días
				</label>
				<label>
					<input type='radio' name='frecuencia' value='4' /> 4 días
				</label>
				<label>
					<input type='radio' name='frecuencia' value='5' /> 5 días
				</label>

				<p>
					<b>¿Con qué equipos sueles entrenar?</b>
				</p>
				<label>
					<input type='radio' name='equipamiento' value='peso_corporal' /> Peso corporal
				</label>
				<label>
					<input type='radio' name='equipamiento' value='pesas' /> Pesas
				</label>
				<label>
					<input type='radio' name='equipamiento' value='maquinas' /> Máquinas de gym
				</label>

				<button type='submit' onClick={() => navigate('/home')}>
					COMENZAR
				</button>
			</form>
		</div>
	);
}

export default TrainingGoals;
