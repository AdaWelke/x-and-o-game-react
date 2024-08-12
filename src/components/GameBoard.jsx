import { useState } from 'react';
const initialGameBoard = Array(3).fill(Array(3).fill(null));

export default function GameBoard({ activePlayer, handleSelectSquare }) {
	const [gameBoard, setGameBoard] = useState(initialGameBoard);

	const handleClick = (rowIdx, colIdx) => {
		if (gameBoard[rowIdx][colIdx]) return;

		// const updateBoard = [...gameBoard.map(r => [...r])];
		// updateBoard[rowIdx][colIdx] = 'X';
		const updateBoard = gameBoard.map((r, rIdx) =>
			rIdx === rowIdx ? gameBoard[rowIdx].map((c, cIdx) => (cIdx === colIdx ? activePlayer : c)) : r
		);
		setGameBoard(updateBoard);

		handleSelectSquare(activePlayer, rowIdx, colIdx);
	};

	return (
		<ol id='game-board'>
			{gameBoard.map((row, rowIdx) => {
				return (
					<li key={rowIdx}>
						<ol>
							{row.map((col, colIdx) => {
								return (
									<li key={colIdx}>
										<button onClick={() => handleClick(rowIdx, colIdx)}>{col}</button>
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
