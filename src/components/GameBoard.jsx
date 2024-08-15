import { WINNING_COMBINATIONS } from '../winning-combinations';

const gameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

export default function GameBoard({ turns, handleSelectSquare, isTheWinner, winner }) {
	// const [gameBoard, setGameBoard] = useState(initialGameBoard);

	// const handleClick = (rowIdx, colIdx) => {
	// 	// const updateBoard = [...gameBoard.map(r => [...r])]; <--!!!!!!!!!!!!
	// 	// updateBoard[rowIdx][colIdx] = 'X';
	// 	const updateBoard = gameBoard.map((r, rIdx) =>
	// 		rIdx === rowIdx ? gameBoard[rowIdx].map((c, cIdx) => (cIdx === colIdx ? activePlayer : c)) : r
	// 	);
	// 	setGameBoard(updateBoard);
	// };

	turns.forEach(({ square: { row, col }, player: playerSymbol }) => {
		gameBoard[row][col] = playerSymbol;
	});

	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
		if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
			isTheWinner(firstSquareSymbol);
		}
	}

	return (
		<ol id='game-board'>
			{gameBoard.map((row, rowIdx) => {
				return (
					<li key={rowIdx}>
						<ol>
							{row.map((playerSymbol, colIdx) => {
								return (
									<li key={colIdx}>
										<button onClick={() => handleSelectSquare(rowIdx, colIdx)} disabled={winner || playerSymbol}>
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
