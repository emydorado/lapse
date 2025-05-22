import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/welcome/welcome';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import OnBoarding from './pages/onBoarding/OnBoarding';
import TrainingGoals from './pages/onBoarding/TrainingGoals';
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
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
