import { useState } from 'react';
import Player from './components/Player';

function App() {
	const [player1, setPlayer1] = useState('Player 1');
	const [player2, setPlayer2] = useState('Player 2');

	const onNameChange = (newName, symbol) => {
		if (symbol === 'X') {
			setPlayer1(newName);
			return;
		}
		setPlayer2(newName);
	};

	return (
		<main>
			<div id='game-container'>
				<ol id='players'>
					<Player initialName={player1} symbol='X' onNameChange={onNameChange} />
					<Player initialName={player2} symbol='O' onNameChange={onNameChange} />
				</ol>
				GAME BOARD
			</div>
			LOG
		</main>
	);
}

export default App;
