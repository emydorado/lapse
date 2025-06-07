import NavMenu from '../../components/navMenu/NavMenu';
import NotDetected from '../../components/states/NotDetected';
import HeartRate from '../../components/states/HeartRate';
import Calculating from '../../components/states/Calculating';
import './setUpRoutine.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {auth, db} from '../../services/firebase/firebaseConfig'
import { doc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setHeartRate } from '../../redux/hrfslice';

function SetUpRoutine() {
	const [step, setStep] = useState(0);
	const [userId, setUserId] = useState(null);
	const [localHeartRate, setLocalHeartRate] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Escuchar al usuario logueado
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserId(user.uid);
			} else {
				console.warn('⚠ No hay usuario logueado');
			}
		});
		return unsubscribe;
	}, []);

	useEffect(() => {
		const socket = new WebSocket('ws://localhost:3001');

		socket.onopen = () => {
			console.log('✅ WebSocket conectado');
			setStep(1);
		};

		socket.onmessage = async (event) => {
			const value = parseInt(event.data, 10);
			console.log('📡 Valor recibido:', value);

			if (!isNaN(value) && value > 40 && value < 200) {
				setLocalHeartRate(value);
				dispatch(setHeartRate(value)); // ✅ Actualiza el estado global de Redux
				setStep(2);

				// Guardar en Firestore
				if (userId) {
					try {
						const userRef = doc(db, 'users', userId);
						await updateDoc(userRef, {
							restbpm: value,
							bpmTimestamp: new Date()
						});
						console.log('✅ BPM guardado en Firestore');
					} catch (error) {
						console.error('❌ Error guardando BPM:', error);
					}
				}

				setTimeout(() => {
					setStep(3);
				}, 2000);
			}
		};

		socket.onerror = (error) => {
			console.error('❌ Error en WebSocket:', error);
		};

		socket.onclose = () => {
			console.warn('⚠ WebSocket cerrado');
		};

		return () => socket.close();
	}, [userId, dispatch]);

	const handleContinue = () => {
		navigate('/selectRoutine', { state: { heartRate: localHeartRate } });
	};

	return (
		<>
			<div className='header'>
				<h1>Configura la rutina</h1>
				<svg
					onClick={() => navigate('/home')}
					className='w-6 h-6 text-gray-800 dark:text-white'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					fill='none'
					viewBox='0 0 24 24'
				>
					<path
						stroke='currentColor'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M6 18 17.94 6M18 18 6.06 6'
					/>
				</svg>
			</div>
			<div id='setUpRoutine-container'>
				<h2>1. Registra tu ritmo cardiaco </h2>
				<p className='regular-text'>
					Ve a la estación de toma de pulso para identificar tu ritmo cardiaco. Esta información la usamos para personalizar los tiempos de descanso de tu rutina.
				</p>

				{step === 1 && (
					<>
						<NotDetected />
						<div className='indication-text'>
							<p className='regular-text'>Coloca tu dedo índice en el sensor y mantenlo presionado.</p>
						</div>
					</>
				)}
				{step === 2 && (
					<>
						<Calculating />
						<div className='indication-text'>
							<p className='regular-text'>Procesando lectura…</p>
						</div>
					</>
				)}
				{step === 3 && (
					<>
						<HeartRate bpm={localHeartRate} />
						<div className='indication-text'>
							<p className='regular-text'>Ya puedes continuar configurando tu rutina.</p>
							<button className='continue-btn' onClick={handleContinue}>
								Continuar
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default SetUpRoutine;