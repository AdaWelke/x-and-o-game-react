import { useEffect } from 'react';
import { WINNING_COMBINATIONS } from '../winning-combinations';

const INITIAL_GAME_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

const deriveGameBoard = turns => {
	const gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])];

	turns.forEach(({ square: { row, col }, player: playerSymbol }) => {
		gameBoard[row][col] = playerSymbol;
	});

	return gameBoard;
};

const deriveWinner = (gameBoard, action) => {
	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

		if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
			action(firstSquareSymbol);
			break;
		}
	}
};

export default function GameBoard({ turns, onSelect, onWin, winner }) {
	const gameBoard = deriveGameBoard(turns);

	useEffect(() => {
		if (!winner) {
			deriveWinner(gameBoard, onWin);
		}
	}, [gameBoard]);

	return (
		<ol id='game-board'>
			{gameBoard.map((row, rowIdx) => {
				return (
					<li key={rowIdx}>
						<ol>
							{row.map((playerSymbol, colIdx) => {
								return (
									<li key={colIdx}>
										<button onClick={() => onSelect(rowIdx, colIdx)} disabled={playerSymbol}>
											{playerSymbol}
										</button>
									</li>
								);
							})}
						</ol>
					</li>
				);
			})}
		</ol>
	);
}
