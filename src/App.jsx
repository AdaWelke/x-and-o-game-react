import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';

function App() {
	const [player1, setPlayer1] = useState('Player 1');
	const [player2, setPlayer2] = useState('Player 2');
	const [game, setGame] = useState({ gameTurns: [], winnerSymbol: null });
	// gameTurns === [{ square: { row: rowIdx, col: colIdx }, player: currentPlayer },{...}...]

	const activePlayer = game.gameTurns[0]?.player === 'X' ? 'O' : 'X';

	const handleNameChange = (newName, symbol) => {
		if (symbol === 'X') {
			setPlayer1(newName);
			return;
		}
		setPlayer2(newName);
	};

	const handleSelectSquare = (rowIdx, colIdx) => {
		setGame({
			...game,
			gameTurns: [{ square: { row: rowIdx, col: colIdx }, player: activePlayer }, ...game.gameTurns],
		});
	};

	const handleWin = winner => setGame({ ...game, winnerSymbol: winner });

	const handleRestart = () => {
		setGame({ gameTurns: [], winnerSymbol: null });
	};

	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player initialName={player1} symbol='X' onChange={handleNameChange} isActive={activePlayer === 'X'} />
					<Player initialName={player2} symbol='O' onChange={handleNameChange} isActive={activePlayer === 'O'} />
				</ol>

				{(game.winnerSymbol || game.gameTurns.length === 9) && (
					<GameOver
						winner={game.winnerSymbol ? (game.winnerSymbol === 'X' ? player1 : player2) : null}
						onRestart={handleRestart}
					/>
				)}

				<GameBoard turns={game.gameTurns} onSelect={handleSelectSquare} onWin={handleWin} winner={game.winnerSymbol} />
			</div>

			<Log turns={game.gameTurns} player1={player1} player2={player2} />
		</main>
	);
}

export default App;
