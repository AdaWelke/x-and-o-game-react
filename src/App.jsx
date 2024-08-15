import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

function App() {
	const [player1, setPlayer1] = useState('Player 1');
	const [player2, setPlayer2] = useState('Player 2');
	const [gameTurns, setGameTurns] = useState([]);
	const [winner, setWinner] = useState(null);
	// gameTurns === [{ square: { row: rowIdx, col: colIdx }, player: currentPlayer },{...}...]

	const activePlayer = gameTurns[0]?.player || 'X';

	const handleSelectSquare = (rowIdx, colIdx) => {
		setGameTurns(prevTurns => {
			const currentPlayer = prevTurns[0]?.player === 'X' ? 'O' : 'X';

			return [{ square: { row: rowIdx, col: colIdx }, player: currentPlayer }, ...gameTurns];
		});
	};

	const handleNameChange = (newName, symbol) => {
		if (symbol === 'X') {
			setPlayer1(newName);
			return;
		}
		setPlayer2(newName);
	};

	const isTheWinner = winner => setWinner(winner);

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
				{winner && <p>You won, {winner === 'X' ? player1 : player2}!</p>}
				<GameBoard
					turns={gameTurns}
					handleSelectSquare={handleSelectSquare}
					isTheWinner={isTheWinner}
					winner={winner}
				/>
			</div>
			<Log turns={gameTurns} player1={player1} player2={player2} />
		</main>
	);
}

export default App;
