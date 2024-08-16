import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';

function App() {
	const [players, setPlayers] = useState({
		X: 'Player 1',
		O: 'Player 2',
	});
	const [game, setGame] = useState({ gameTurns: [], winner: null });
	// gameTurns === [{ square: { row: rowIdx, col: colIdx }, player: currentPlayer },{...}...]

	const activePlayer = game.gameTurns[0]?.player === 'X' ? 'O' : 'X';

	const handleNameChange = (newName, symbol) => {
		setPlayers({ ...players, [symbol]: newName });
	};

	const handleSelectSquare = (rowIdx, colIdx) => {
		setGame({
			...game,
			gameTurns: [{ square: { row: rowIdx, col: colIdx }, player: activePlayer }, ...game.gameTurns],
		});
	};

	const handleWin = winnerSymbol => setGame({ ...game, winner: players[winnerSymbol] });

	const handleRestart = () => {
		setGame({ gameTurns: [], winner: null });
	};

	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player initialName={players.X} symbol='X' onChange={handleNameChange} isActive={activePlayer === 'X'} />
					<Player initialName={players.O} symbol='O' onChange={handleNameChange} isActive={activePlayer === 'O'} />
				</ol>

				{(game.winner || game.gameTurns.length === 9) && <GameOver winner={game.winner} onRestart={handleRestart} />}

				<GameBoard turns={game.gameTurns} onSelect={handleSelectSquare} onWin={handleWin} winner={game.winner} />
			</div>

			<Log turns={game.gameTurns} player1={players.X} player2={players.O} />
		</main>
	);
}

export default App;
