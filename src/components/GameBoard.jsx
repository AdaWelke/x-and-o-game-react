import { useEffect } from 'react';
import { WINNING_COMBINATIONS } from '../winning-combinations';

export default function GameBoard({ turns, onSelect, onWin, winner }) {
	const gameBoard = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];

	turns.forEach(({ square: { row, col }, player: playerSymbol }) => {
		gameBoard[row][col] = playerSymbol;
	});

	useEffect(() => {
		if (!winner) {
			for (const combination of WINNING_COMBINATIONS) {
				const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
				const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
				const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

				if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
					onWin(firstSquareSymbol);
					break;
				}
			}
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
