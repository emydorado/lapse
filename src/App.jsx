import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/welcome/Welcome';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import OnBoarding from './pages/onBoarding/OnBoarding';
import Intro from './pages/intro/Intro';
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
					<Route path='/intro' element={<Intro />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
