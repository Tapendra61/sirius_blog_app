import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from './pages/Authentication.jsx';

function App() {

	return (
		<div className='app'>
			<Router>
				<Routes>
					<Route path='/authentication' element={ <Authentication />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
