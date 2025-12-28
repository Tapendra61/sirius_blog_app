import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Authentication from './pages/auth/Authentication.jsx';

function App() {

	return (
		<div className='app'>
			<Router>
				<Routes>
					<Route path='/authentication' element={ <Authentication />} />
				</Routes>
			</Router>
			
			<Toaster />
		</div>
	)
}

export default App