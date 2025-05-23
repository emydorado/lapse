import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/welcome/welcome';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import OnBoarding from './pages/onBoarding/OnBoarding';
import TrainingGoals from './pages/onBoarding/TrainingGoals';
import Home from './pages/home/Home';
import SetUpRoutine from './pages/setUpRoutine/SetUpRoutine';
import Routine from './pages/routine/Routine';
import Profile from './pages/profile/Profile';
import './App.css';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Welcome />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/onBoarding' element={<OnBoarding />} />
					<Route path='/trainingGoals' element={<TrainingGoals />} />
					<Route path='/routine' element={<Routine />} />
					<Route path='/setUpRoutine' element={<SetUpRoutine />} />
					<Route path='/home' element={<Home />} />
					<Route path='/profile' element={<Profile />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
