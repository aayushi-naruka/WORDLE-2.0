import './App.css';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom'
import  {Game}  from './pages/Game/Game';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        <Route path = '/' element = {<Game/>}/>
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
