export default function Log({ turns, player1, player2 }) {
	const content = turns.map(({ square: { row, col }, player: playerSymbol }) => {
		const playerName = playerSymbol === 'X' ? player1.toUpperCase() : player2.toUpperCase();

		return <li key={`${row}${col}`}>{`${playerName} selected (${row + 1},${col + 1})`}</li>;
	});

	return <ol id='log'>{content}</ol>;
}
