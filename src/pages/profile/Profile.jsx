import { useNavigate } from 'react-router-dom';
import NavMenu from '../../components/navMenu/NavMenu.jsx';
import './profile.css';
import { routines } from '../../data/routines.js';
import RoutineCard from '../../components/routineCard/RoutineCard';
import InfoUser from '../../components/infoUser/infoUser.jsx';
import { useState, useEffect } from 'react';
import { auth, db } from '../../services/firebase/firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';


function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate('/login');
          return;
        }

        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          setError('No se encontraron datos del usuario');
        }
      } catch (err) {
        console.error('Error al cargar datos del usuario:', err);
        setError('Error al cargar los datos del perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div className="loading">Cargando perfil...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <div className='home-header'>
        <img src='../../src/assets/logo.png' alt='logo lapse' />
      </div>
      <div id='profile-container'>
        <div id='info-user-container'>
          <div className='tittle-container1'>
            <h3>Tus datos</h3>
            <svg
              className='w-6 h-6 text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              fill='none'
              viewBox='0 0 24 24'
              onClick={() => navigate('/edit-profile')} // Agrega navegación a edición
              style={{ cursor: 'pointer' }}
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z'
              />
            </svg>
          </div>
          {userData && (
            <InfoUser 
              name={userData.name || 'No especificado'}
              mail={userData.email || 'No especificado'}
              edad={userData.age || 'No especificado'}
              estatura={userData.height || 'No especificado'}
              peso={userData.weight || 'No especificado'}
            />
          )}
        </div>

        <div className='sugestions-container'>
          <div className='tittle-container2'>
            <h3>tus rutinas</h3>
            <svg
              className='w-6 h-6 text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
              onClick={() => navigate('/add-routine')} // Agrega navegación a añadir rutina
              style={{ cursor: 'pointer' }}
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 12h14m-7 7V5'
              />
            </svg>
          </div>
          <div className='routine-card'>
            {routines.map((routine) => (
              <RoutineCard
                key={routine.id}
                name={routine.name}
                img={routine.img}
                number_excercises={routine.number_excercises}
                id={routine.id}
              />
            ))}
          </div>
          <p className='regular-text'>
            <b>
              <u>Ver más</u>
            </b>
          </p>
        </div>
      </div>
      <NavMenu />
    </>
  );
}

export default Profile;