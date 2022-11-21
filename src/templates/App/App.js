// React imports
import { 
  BrowserRouter as Router,
  Route,
  Routes
 } from 'react-router-dom'



import './App.css';


// Templates
import HomeTemp from '../Home/Home'



function App() {
  return (
    <div className="App">

      <Router>

        <Routes>

          <Route path='/' element={ <HomeTemp /> } />

        </Routes>

      </Router>

    </div>
  );
}

export default App;
