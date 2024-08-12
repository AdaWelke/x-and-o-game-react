import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

function App() {
	const [player1, setPlayer1] = useState('Player 1');
	const [player2, setPlayer2] = useState('Player 2');
	const [activePlayer, setActivePlayer] = useState('X');
	const [gameTurns, setGameTurns] = useState([]);

	const handleSelectSquare = (activePlayer, rowIdx, colIdx) => {
		setActivePlayer(current => (current === 'X' ? 'O' : 'X'));
		setGameTurns([...gameTurns, [activePlayer, rowIdx, colIdx]]);
	};

	const handleNameChange = (newName, symbol) => {
		if (symbol === 'X') {
			setPlayer1(newName);
			return;
		}
		setPlayer2(newName);
	};

	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player
						initialName={player1}
						symbol='X'
						handleNameChange={handleNameChange}
						isActive={activePlayer === 'X'}
					/>
					<Player
						initialName={player2}
						symbol='O'
						handleNameChange={handleNameChange}
						isActive={activePlayer === 'O'}
					/>
				</ol>
				<GameBoard activePlayer={activePlayer} handleSelectSquare={handleSelectSquare} />
			</div>
			<Log />
		</main>
	);
}

export default App;
