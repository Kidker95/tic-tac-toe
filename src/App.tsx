import './App.css';
import Game from './Components/GameArea/Game/Game';
import { useTitle } from './Utils/UseTitle';

function App() {
    useTitle("Tic Tac Toe");
    return (
        <div className="App">
            <Game />
        </div>
    );
}

export default App;
