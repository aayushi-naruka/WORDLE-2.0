import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import  {Game}  from './pages/Game/Game';
import { Dashboard } from './pages/Dashboard/Dashboard';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        <Route path = '/' element = {<Dashboard/>}/>
        <Route path = '/game' element = {<Game/>}/>
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
