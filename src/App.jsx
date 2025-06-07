import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/welcome/welcome';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import OnBoarding from './pages/onBoarding/OnBoarding';
import TrainingGoals from './pages/onBoarding/TrainingGoals';
import Home from './pages/home/Home';
import SetUpRoutine from './pages/setUpRoutine/SetUpRoutine';
import SelectRoutine from './pages/setUpRoutine/selectRoutine';
import Routine from './pages/routine/Routine';
import Profile from './pages/profile/Profile';
import Preview from './pages/setUpRoutine/Preview';
import SensorMonitor from './pages/sensor/sensor';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import BPMListener from './components/bpmListener/bpmListener';

function App() {
	return (
		<>
			<Provider store={store}>
				<BPMListener/>
				<BrowserRouter>
					<Routes>
						<Route path='/sensor' element={<SensorMonitor />} />
						<Route path='/' element={<Welcome />} />
						<Route path='/register' element={<Register />} />
						<Route path='/login' element={<Login />} />
						<Route path='/onBoarding' element={<OnBoarding />} />
						<Route path='/trainingGoals' element={<TrainingGoals />} />
						<Route path='/routine/:id' element={<Routine />} />
						<Route path='/setUpRoutine' element={<SetUpRoutine />} />
						<Route path='/selectRoutine' element={<SelectRoutine />} />
						<Route path='/home' element={<Home />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/preview/:id' element={<Preview />} />
					</Routes>
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
